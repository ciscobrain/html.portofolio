/*
 * Serveur intermédiaire pour l'IA — Cloudflare Worker (offre gratuite)
 *
 * Rôle : recevoir les messages du chatbot et interroger l'API Claude
 * d'Anthropic SANS jamais exposer la clé API dans l'application publique.
 *
 * Déploiement (une seule fois, ~10 minutes, 0 CHF) :
 *   1. Créer un compte gratuit sur dash.cloudflare.com
 *   2. Workers & Pages → Create Worker → coller ce fichier tel quel
 *   3. Settings → Variables → ajouter le secret ANTHROPIC_API_KEY
 *      (clé créée sur console.anthropic.com)
 *   4. (Conseillé) ajouter la variable ORIGINE_AUTORISEE, p. ex.
 *      https://ciscobrain.github.io
 *   5. Copier l'URL du worker dans aide-vaud/config.js (IA_URL)
 *
 * Ce fichier est volontairement autonome (aucune dépendance npm) pour
 * pouvoir être collé directement dans l'éditeur du tableau de bord
 * Cloudflare, sans étape de build.
 */

const MODELE = "claude-opus-4-8";
const MAX_TOKENS = 1024;
const MAX_MESSAGES = 24; // limite l'historique envoyé (coût + contexte)

const SYSTEME = `Tu es « Aide Sociale Vaud », un assistant social bienveillant qui aide les personnes en situation de précarité dans le canton de Vaud (Suisse) à accéder aux aides sociales auxquelles elles ont droit.

TON RÔLE :
- Identifier la situation de la personne avec des questions simples et respectueuses.
- Proposer les aides pertinentes et guider ÉTAPE PAR ÉTAPE : conditions, documents à préparer, où s'adresser, délais.
- Encourager sans juger. Beaucoup de personnes n'osent pas demander de l'aide : rappelle-leur que ces aides sont un droit.

AIDES DU CANTON DE VAUD QUE TU CONNAIS :
- Revenu d'insertion (RI) : aide sociale de base, demande au Centre social régional (CSR) de la région. www.vd.ch
- Subside à l'assurance-maladie : réduction des primes LAMal, demande à l'OVAM (021 557 47 47), simulateur sur vd.ch.
- PC Familles : familles qui travaillent avec enfants de moins de 16 ans, via l'agence d'assurances sociales (AAS) de la commune.
- Prestations complémentaires AVS/AI : rentiers dont la rente ne suffit pas, via l'AAS ; Pro Senectute Vaud aide gratuitement (021 646 17 21).
- Allocations familiales : via l'employeur, ou la Caisse cantonale vaudoise de compensation ; réclamables 5 ans en arrière.
- Bourses d'études et d'apprentissage : Office cantonal des bourses d'études (OCBE, 021 316 33 70), demande en ligne sur vd.ch.
- Avances sur pensions alimentaires : BRAPA, Lausanne (021 316 52 21).
- Logement : logements subventionnés via la commune ; ASLOCA (021 617 50 36) en cas de menace d'expulsion ; hébergement d'urgence à Lausanne (Sleep-In 021 626 22 46, La Marmotte).
- Aide alimentaire d'urgence : Cartons du Cœur, épiceries Caritas (Lausanne, Vevey, Yverdon), Soupe populaire Mère Sofia à Lausanne.
- Dettes : ligne gratuite « Parlons Cash » 0840 43 21 00 ; consultations gratuites CSP Vaud (021 560 60 60) et Caritas Vaud (021 317 59 80).
- Chômage : inscription immédiate à l'ORP via www.travail.swiss, choisir une caisse de chômage.

RÈGLES :
- Réponds en français simple et clair, phrases courtes, adaptées à des personnes parfois peu à l'aise avec l'administration. Tes réponses peuvent être lues à voix haute : évite les tableaux et les longues listes.
- Une ou deux questions à la fois, jamais un interrogatoire.
- Reste bref : 120 mots maximum par réponse, sauf quand tu détailles une étape.
- Précise quand une information doit être vérifiée auprès de l'organisme officiel : tu donnes des repères, pas des décisions.
- Ne demande jamais de documents d'identité, de numéros AVS ou d'informations bancaires dans la conversation.
- Détresse aiguë : La Main Tendue 143 (24h/24). Urgence médicale : 144. Danger immédiat : 117.
- Si la question sort de ton domaine (aides sociales vaudoises et démarches associées), dis-le gentiment et ramène la conversation vers ce que tu sais faire.`;

export default {
  async fetch(request, env) {
    const origine = env.ORIGINE_AUTORISEE || "*";
    const enTetesCors = {
      "Access-Control-Allow-Origin": origine,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: enTetesCors });
    }
    if (request.method !== "POST") {
      return reponseJson({ erreur: "Méthode non autorisée" }, 405, enTetesCors);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return reponseJson({ erreur: "Clé API non configurée" }, 500, enTetesCors);
    }

    let corps;
    try {
      corps = await request.json();
    } catch {
      return reponseJson({ erreur: "JSON invalide" }, 400, enTetesCors);
    }

    // Historique attendu : [{role: "user"|"assistant", content: "..."}]
    const messages = (Array.isArray(corps.messages) ? corps.messages : [])
      .filter(function (m) {
        return (
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.length > 0 &&
          m.content.length <= 4000
        );
      })
      .slice(-MAX_MESSAGES)
      .map(function (m) {
        return { role: m.role, content: m.content };
      });

    if (messages.length === 0 || messages[0].role !== "user") {
      return reponseJson({ erreur: "Aucun message valide" }, 400, enTetesCors);
    }

    const reponseApi = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: MAX_TOKENS,
        system: [
          {
            type: "text",
            text: SYSTEME,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: messages,
      }),
    });

    if (!reponseApi.ok) {
      const detail = await reponseApi.text();
      console.error("Erreur API Anthropic:", reponseApi.status, detail);
      return reponseJson(
        { erreur: "Le service IA est momentanément indisponible" },
        502,
        enTetesCors
      );
    }

    const donnees = await reponseApi.json();

    if (donnees.stop_reason === "refusal") {
      return reponseJson(
        { texte: "Je ne peux pas répondre à cette demande, mais je reste là pour vos questions sur les aides sociales vaudoises." },
        200,
        enTetesCors
      );
    }

    let texte = "";
    for (const bloc of donnees.content || []) {
      if (bloc.type === "text") texte += bloc.text;
    }

    return reponseJson({ texte: texte.trim() }, 200, enTetesCors);
  },
};

function reponseJson(objet, statut, enTetes) {
  return new Response(JSON.stringify(objet), {
    status: statut,
    headers: Object.assign({ "Content-Type": "application/json" }, enTetes),
  });
}
