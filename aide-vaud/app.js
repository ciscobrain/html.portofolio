/*
 * Aide Sociale Vaud — assistant conversationnel (écrit + vocal)
 * Prototype 100 % hors ligne : aucune donnée personnelle n'est envoyée nulle part.
 */

(function () {
  "use strict";

  const chatEl = document.getElementById("chat");
  const repliesEl = document.getElementById("quick-replies");
  const inputEl = document.getElementById("input");
  const sendBtn = document.getElementById("btn-send");
  const micBtn = document.getElementById("btn-mic");
  const ttsBtn = document.getElementById("btn-tts");

  /* État de la conversation */
  let aideCourante = null;   // id de l'aide en cours de consultation
  let etapeCourante = 0;     // index de l'étape dans le guide pas à pas
  let ttsActif = false;      // lecture vocale des réponses
  let historiqueIA = [];     // historique envoyé à l'IA (mode conversation libre)
  let iaEnCours = false;     // une requête IA est en cours

  const iaActive = typeof CONFIG !== "undefined" && CONFIG.IA_URL;

  /* ---------- Affichage ---------- */

  function ajouterMessage(texte, qui, html) {
    const div = document.createElement("div");
    div.className = "msg " + qui;
    if (html) div.innerHTML = texte;
    else div.textContent = texte;
    chatEl.appendChild(div);
    chatEl.scrollTop = chatEl.scrollHeight;
    if (qui === "bot" && ttsActif) lire(div.textContent);
    return div;
  }

  function bot(texte, html) { return ajouterMessage(texte, "bot", html); }
  function user(texte) { return ajouterMessage(texte, "user", false); }

  function proposer(boutons) {
    repliesEl.innerHTML = "";
    boutons.forEach(function (b) {
      const btn = document.createElement("button");
      btn.textContent = b.label;
      if (b.primaire) btn.className = "primaire";
      btn.addEventListener("click", function () {
        user(b.label);
        b.action();
      });
      repliesEl.appendChild(btn);
    });
  }

  function echapper(s) {
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /* ---------- Écrans du chatbot ---------- */

  function accueil(premiereFois) {
    aideCourante = null;
    if (premiereFois) {
      bot(
        "Bonjour 👋 Je suis votre assistant pour les aides sociales du canton de Vaud.\n\n" +
        "Beaucoup d'aides existent, mais il faut savoir lesquelles demander et comment. " +
        "Je suis là pour vous guider, étape par étape, gratuitement et sans jugement.\n\n" +
        "Vous pouvez appuyer sur un bouton, écrire votre situation, ou appuyer sur le micro 🎤 pour me parler."
      );
      bot(
        "ℹ️ Je donne des informations générales : seuls les organismes officiels (CSR, vd.ch) confirment vos droits. " +
        "Rien de ce que vous écrivez ici n'est enregistré ni transmis."
      );
    }
    bot("Quelle est votre situation ?");
    proposer(
      CATEGORIES.map(function (c) {
        return { label: c.label, action: function () { montrerCategorie(c); } };
      })
    );
  }

  function montrerCategorie(cat) {
    const noms = cat.aides.map(function (id) {
      return AIDES[id].emoji + " " + AIDES[id].titre;
    });
    bot("Voici les aides qui peuvent correspondre à votre situation :\n\n• " + noms.join("\n• ") +
        "\n\nChoisissez-en une pour que je vous explique tout.");
    proposer(
      cat.aides.map(function (id) {
        return {
          label: AIDES[id].emoji + " " + AIDES[id].titre,
          action: function () { montrerAide(id); }
        };
      }).concat([{ label: "⬅️ Retour au menu", action: function () { accueil(false); } }])
    );
  }

  function montrerAide(id) {
    const a = AIDES[id];
    aideCourante = id;
    etapeCourante = 0;
    bot(
      '<span class="titre-aide">' + a.emoji + " " + echapper(a.titre) + "</span>" +
      echapper(a.resume) +
      "<br><br><strong>Conditions principales :</strong><br>• " +
      a.conditions.map(echapper).join("<br>• "),
      true
    );
    menuAide();
  }

  function menuAide() {
    const a = AIDES[aideCourante];
    bot("Que souhaitez-vous faire pour « " + a.titre + " » ?");
    proposer([
      { label: "🚀 Me guider étape par étape", primaire: true, action: demarrerGuide },
      { label: "📄 Documents à préparer", action: montrerDocuments },
      { label: "📞 Contacts utiles", action: montrerContacts },
      { label: "⬅️ Retour au menu", action: function () { accueil(false); } }
    ]);
  }

  function montrerDocuments() {
    const a = AIDES[aideCourante];
    bot(
      "<strong>📄 Documents à préparer :</strong><br>☐ " +
      a.documents.map(echapper).join("<br>☐ ") +
      "<br><br>💡 S'il vous manque un document, ne renoncez pas : l'organisme peut souvent vous aider à l'obtenir.",
      true
    );
    menuAide();
  }

  function montrerContacts() {
    const a = AIDES[aideCourante];
    bot("<strong>📞 Contacts et liens :</strong><br>" + a.contacts.map(echapper).join("<br>"), true);
    menuAide();
  }

  function demarrerGuide() {
    etapeCourante = 0;
    montrerEtape();
  }

  function montrerEtape() {
    const a = AIDES[aideCourante];
    const total = a.etapes.length;
    bot(
      '<span class="etape-badge">Étape ' + (etapeCourante + 1) + " sur " + total + "</span><br>" +
      echapper(a.etapes[etapeCourante]),
      true
    );

    const boutons = [];
    if (etapeCourante < total - 1) {
      boutons.push({
        label: "✅ C'est fait, étape suivante",
        primaire: true,
        action: function () { etapeCourante++; montrerEtape(); }
      });
    } else {
      boutons.push({
        label: "🎉 J'ai terminé toutes les étapes",
        primaire: true,
        action: function () {
          bot(
            "Bravo, vous avez fait le plus dur ! 👏\n\n" +
            "Gardez une copie de tout ce que vous envoyez, et notez les dates. " +
            "Si vous n'avez pas de réponse dans un délai raisonnable, relancez l'organisme — c'est votre droit.\n\n" +
            "Vous méritez cette aide. Bon courage !"
          );
          accueil(false);
        }
      });
    }
    if (etapeCourante > 0) {
      boutons.push({ label: "⬅️ Étape précédente", action: function () { etapeCourante--; montrerEtape(); } });
    }
    boutons.push({ label: "📄 Documents", action: montrerDocuments });
    boutons.push({ label: "🏠 Menu principal", action: function () { accueil(false); } });
    proposer(boutons);
  }

  /* ---------- Compréhension du texte libre (et de la voix) ---------- */

  function normaliser(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function comprendre(texte) {
    const t = " " + normaliser(texte) + " ";
    const scores = {};
    MOTS_CLES.forEach(function (regle) {
      regle.mots.forEach(function (mot) {
        if (t.indexOf(normaliser(mot)) !== -1) {
          scores[regle.aide] = (scores[regle.aide] || 0) + mot.length;
        }
      });
    });
    let meilleur = null;
    Object.keys(scores).forEach(function (id) {
      if (!meilleur || scores[id] > scores[meilleur]) meilleur = id;
    });
    return meilleur;
  }

  function traiterEntree(texte) {
    texte = texte.trim();
    if (!texte || iaEnCours) return;
    user(texte);
    inputEl.value = "";

    const t = normaliser(texte);
    if (/(menu|recommencer|accueil)/.test(t)) {
      accueil(false);
      return;
    }

    // Conversation libre avec l'IA quand un serveur est configuré
    if (iaActive) {
      repondreAvecIA(texte);
      return;
    }

    if (/(bonjour|salut|hello)/.test(t)) {
      accueil(false);
      return;
    }
    if (/(merci)/.test(t)) {
      bot("Avec plaisir ! 💚 Je reste là si vous avez besoin d'autre chose.");
      accueil(false);
      return;
    }

    repondreParMotsCles(texte);
  }

  /* Mode guidé : compréhension par mots-clés */
  function repondreParMotsCles(texte) {
    const id = comprendre(texte);
    if (id) {
      bot("Je pense que cette aide peut vous concerner :");
      montrerAide(id);
    } else {
      bot(
        "Je n'ai pas bien compris votre situation, mais nous allons y arriver ensemble. 🙂\n" +
        "Choisissez le thème qui se rapproche le plus de votre besoin :"
      );
      proposer(
        CATEGORIES.map(function (c) {
          return { label: c.label, action: function () { montrerCategorie(c); } };
        })
      );
    }
  }

  /* Mode IA : conversation libre via le serveur intermédiaire (API Claude) */
  function repondreAvecIA(texte) {
    historiqueIA.push({ role: "user", content: texte });
    // Borne l'historique côté client (le serveur re-vérifie de son côté)
    if (historiqueIA.length > 24) historiqueIA = historiqueIA.slice(-24);

    iaEnCours = true;
    proposer([]);
    const indicateur = ajouterMessage("…", "bot", false);
    indicateur.classList.add("typing");

    const controleur = new AbortController();
    const minuteur = setTimeout(function () { controleur.abort(); }, 30000);

    fetch(CONFIG.IA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: historiqueIA }),
      signal: controleur.signal
    })
      .then(function (rep) {
        if (!rep.ok) throw new Error("HTTP " + rep.status);
        return rep.json();
      })
      .then(function (donnees) {
        if (!donnees.texte) throw new Error("Réponse vide");
        indicateur.remove();
        historiqueIA.push({ role: "assistant", content: donnees.texte });
        bot(donnees.texte);
        proposer([
          { label: "🏠 Menu des aides", action: function () { accueil(false); } }
        ]);
      })
      .catch(function () {
        // Repli : le mode guidé fonctionne toujours, même sans serveur
        indicateur.remove();
        historiqueIA.pop();
        bot("Le service IA ne répond pas pour le moment — je continue en mode guidé. 🙂");
        repondreParMotsCles(texte);
      })
      .finally(function () {
        clearTimeout(minuteur);
        iaEnCours = false;
      });
  }

  sendBtn.addEventListener("click", function () { traiterEntree(inputEl.value); });
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") traiterEntree(inputEl.value);
  });

  /* ---------- Voix : reconnaissance (micro) ---------- */

  const Reconnaissance = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;

  if (Reconnaissance) {
    rec = new Reconnaissance();
    rec.lang = "fr-CH";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = function (e) {
      const texte = e.results[0][0].transcript;
      traiterEntree(texte);
    };
    rec.onend = function () { micBtn.classList.remove("actif"); };
    rec.onerror = function () {
      micBtn.classList.remove("actif");
      bot("Je n'ai pas réussi à vous entendre. Vérifiez que le micro est autorisé, ou écrivez votre message.");
    };

    micBtn.addEventListener("click", function () {
      if (micBtn.classList.contains("actif")) {
        rec.stop();
        return;
      }
      micBtn.classList.add("actif");
      try { rec.start(); } catch (e) { micBtn.classList.remove("actif"); }
    });
  } else {
    micBtn.addEventListener("click", function () {
      bot("La saisie vocale n'est pas disponible dans ce navigateur. Sur iPhone/Android, utilisez Safari ou Chrome, ou le micro du clavier.");
    });
  }

  /* ---------- Voix : lecture des réponses ---------- */

  function lire(texte) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texte.replace(/[☐•]/g, ", "));
    u.lang = "fr-FR";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  ttsBtn.addEventListener("click", function () {
    ttsActif = !ttsActif;
    ttsBtn.textContent = ttsActif ? "🔊" : "🔇";
    ttsBtn.setAttribute("aria-pressed", String(ttsActif));
    if (ttsActif) lire("Lecture vocale activée. Je lirai mes réponses à voix haute.");
    else window.speechSynthesis && window.speechSynthesis.cancel();
  });

  /* ---------- PWA : mises à jour automatiques ---------- */

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function (reg) {
      // Vérifie une nouvelle version à chaque ouverture
      reg.update();
    });

    const avaitControleur = Boolean(navigator.serviceWorker.controller);
    let dejaRecharge = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      // Première installation : rien à recharger
      if (!avaitControleur || dejaRecharge) return;
      dejaRecharge = true;
      const banner = document.getElementById("update-banner");
      banner.hidden = false;
      setTimeout(function () { window.location.reload(); }, 1200);
    });
  }

  /* ---------- Démarrage ---------- */
  accueil(true);
})();
