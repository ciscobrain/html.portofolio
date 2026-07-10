/*
 * Base de connaissances — Aides sociales du canton de Vaud (Suisse)
 * Prototype : les informations sont indicatives et doivent être vérifiées
 * auprès des organismes officiels (www.vd.ch).
 */

const AIDES = {
  ri: {
    titre: "Revenu d'insertion (RI)",
    emoji: "💰",
    resume:
      "Le RI est l'aide sociale vaudoise. Il garantit un minimum vital aux personnes qui vivent dans le canton de Vaud et n'ont pas assez de ressources pour couvrir leurs besoins essentiels (nourriture, logement, assurance-maladie).",
    conditions: [
      "Habiter dans le canton de Vaud",
      "Ne pas avoir de ressources suffisantes (revenus et fortune en dessous des limites)",
      "Avoir épuisé les autres droits (chômage, assurances, pensions…)",
      "Être âgé·e de 18 ans ou plus (des solutions existent aussi pour les jeunes)"
    ],
    documents: [
      "Pièce d'identité ou permis de séjour",
      "Bail à loyer et dernier décompte de charges",
      "Extraits de tous vos comptes bancaires/postaux des 3 derniers mois",
      "Justificatifs de revenus (fiches de salaire, indemnités, rentes…)",
      "Police d'assurance-maladie",
      "Dernière déclaration ou décision d'impôts",
      "Décisions d'autres assurances (chômage, AI, etc.) si vous en avez"
    ],
    etapes: [
      "Trouvez le Centre social régional (CSR) de votre région sur www.vd.ch (cherchez « CSR + le nom de votre ville »). C'est lui qui traite les demandes de RI.",
      "Téléphonez ou passez à la réception du CSR pour annoncer votre situation. On vous remettra le formulaire de demande RI et la liste exacte des documents.",
      "Rassemblez les documents demandés. Pas de panique s'il en manque : le CSR peut vous aider à les obtenir.",
      "Déposez votre dossier complet au CSR (guichet ou courrier). Demandez une confirmation de dépôt.",
      "Vous serez convoqué·e à un entretien avec un·e assistant·e social·e qui examinera votre situation avec vous.",
      "Vous recevez une décision écrite. Si elle est positive, le RI est versé chaque mois. Si elle est négative, vous pouvez faire recours dans les 30 jours — le CSP ou Caritas peuvent vous aider gratuitement."
    ],
    contacts: [
      "🌐 www.vd.ch/aides-financieres-et-soutien-social",
      "🏢 Centre social régional (CSR) de votre région",
      "🆘 Aide juridique gratuite : CSP Vaud (021 560 60 60) ou Caritas Vaud"
    ]
  },

  subside: {
    titre: "Subside à l'assurance-maladie",
    emoji: "🏥",
    resume:
      "Le canton de Vaud paie une partie (parfois la totalité) de vos primes d'assurance-maladie si vos revenus sont modestes. Beaucoup de personnes y ont droit sans le savoir !",
    conditions: [
      "Être domicilié·e dans le canton de Vaud",
      "Avoir un revenu modeste (le droit dépend de votre revenu déterminant)",
      "Les bénéficiaires du RI ou des PC reçoivent le subside automatiquement"
    ],
    documents: [
      "Dernière décision de taxation fiscale (impôts)",
      "Police d'assurance-maladie de chaque membre de la famille",
      "Justificatifs de revenus récents si votre situation a changé"
    ],
    etapes: [
      "Vérifiez si vous y avez droit : le site www.vd.ch propose un simulateur de subside (cherchez « subside assurance maladie Vaud »).",
      "Faites la demande en ligne sur le portail de l'État de Vaud, ou demandez le formulaire papier à l'Office vaudois de l'assurance-maladie (OVAM).",
      "Joignez votre dernière décision de taxation et vos polices d'assurance.",
      "Envoyez la demande. L'OVAM vous répond par écrit.",
      "Si accepté, le subside est versé directement à votre caisse-maladie : votre facture de prime diminue."
    ],
    contacts: [
      "🌐 www.vd.ch/subsides",
      "🏢 Office vaudois de l'assurance-maladie (OVAM), Lausanne",
      "📞 OVAM : 021 557 47 47"
    ]
  },

  pcfam: {
    titre: "Prestations complémentaires pour familles (PC Familles)",
    emoji: "👨‍👩‍👧",
    resume:
      "Les PC Familles complètent le revenu des familles qui travaillent mais dont le salaire ne suffit pas. Elles évitent de devoir recourir au RI et remboursent aussi certains frais de garde.",
    conditions: [
      "Vivre dans le canton de Vaud depuis 3 ans au moins",
      "Vivre avec un enfant de moins de 16 ans",
      "Exercer une activité lucrative (travailler), même à temps partiel",
      "Revenus en dessous des limites PC Familles"
    ],
    documents: [
      "Pièces d'identité / permis de toute la famille",
      "Fiches de salaire récentes des deux parents",
      "Bail à loyer",
      "Polices d'assurance-maladie",
      "Justificatifs des frais de garde (garderie, maman de jour…)",
      "Extraits de comptes bancaires"
    ],
    etapes: [
      "Adressez-vous à l'agence d'assurances sociales (AAS) de votre commune ou à votre CSR — cherchez « agence assurances sociales + votre commune ».",
      "Demandez le formulaire de demande PC Familles.",
      "Rassemblez les documents (salaires, bail, frais de garde…). L'agence peut vous aider à remplir le formulaire.",
      "Déposez le dossier complet à l'agence.",
      "La Caisse cantonale vaudoise de compensation calcule votre droit et rend une décision écrite.",
      "Si accepté, la prestation est versée chaque mois. Signalez tout changement de situation (salaire, déménagement…)."
    ],
    contacts: [
      "🌐 www.vd.ch (cherchez « PC Familles »)",
      "🏢 Agence d'assurances sociales (AAS) de votre commune",
      "🏢 Caisse cantonale vaudoise de compensation (CCVD)"
    ]
  },

  pcavs: {
    titre: "Prestations complémentaires AVS/AI",
    emoji: "🧓",
    resume:
      "Si votre rente AVS (retraite) ou AI (invalidité) ne suffit pas pour vivre, les prestations complémentaires (PC) comblent la différence. Elles peuvent aussi rembourser des frais de maladie, de dentiste ou de moyens auxiliaires.",
    conditions: [
      "Toucher une rente AVS ou AI (ou une allocation pour impotent / indemnités journalières AI)",
      "Habiter en Suisse",
      "Dépenses reconnues supérieures aux revenus"
    ],
    documents: [
      "Décision de rente AVS ou AI",
      "Bail à loyer",
      "Police d'assurance-maladie",
      "Relevés bancaires et justificatifs de fortune",
      "Dernière déclaration d'impôts"
    ],
    etapes: [
      "Rendez-vous à l'agence d'assurances sociales (AAS) de votre commune — c'est le guichet de proximité pour les PC.",
      "Demandez le formulaire de demande de prestations complémentaires.",
      "Remplissez-le avec l'aide de l'agence si besoin, et joignez les justificatifs.",
      "Déposez la demande. La caisse de compensation calcule votre droit.",
      "Vous recevez une décision écrite ; les PC sont ensuite versées chaque mois avec effet dès le mois du dépôt — ne tardez donc pas à déposer !",
      "Pensez à faire rembourser vos frais de maladie et de dentiste : envoyez les factures à la caisse."
    ],
    contacts: [
      "🏢 Agence d'assurances sociales (AAS) de votre commune",
      "🌐 www.vd.ch (cherchez « prestations complémentaires »)",
      "🤝 Pro Senectute Vaud (021 646 17 21) aide gratuitement les seniors dans ces démarches"
    ]
  },

  alloc: {
    titre: "Allocations familiales",
    emoji: "👶",
    resume:
      "Chaque enfant donne droit à une allocation mensuelle (environ 300 CHF ou plus dans le canton de Vaud, montant supérieur pour les jeunes en formation). Salarié·e ou non, vous y avez droit — mais il faut la demander.",
    conditions: [
      "Avoir un ou plusieurs enfants (jusqu'à 16 ans, ou 25 ans s'ils sont en formation)",
      "Salarié·e : la demande passe par l'employeur",
      "Indépendant·e ou sans activité : la demande passe par la caisse cantonale"
    ],
    documents: [
      "Acte de naissance ou livret de famille",
      "Attestation de formation pour les enfants de plus de 16 ans",
      "Pour les personnes sans activité : justificatifs de revenus"
    ],
    etapes: [
      "Si vous travaillez : demandez le formulaire d'allocations familiales à votre employeur (service RH). C'est lui qui transmet à sa caisse.",
      "Si vous êtes indépendant·e ou sans activité : adressez-vous à l'agence d'assurances sociales de votre commune ou à la Caisse cantonale vaudoise de compensation.",
      "Remplissez le formulaire et joignez l'acte de naissance / attestation de formation.",
      "L'allocation est versée chaque mois avec le salaire ou directement sur votre compte.",
      "Bon à savoir : on peut réclamer les allocations non touchées jusqu'à 5 ans en arrière !"
    ],
    contacts: [
      "🏢 Votre employeur (service du personnel)",
      "🏢 Caisse cantonale vaudoise de compensation (CCVD), Clarens",
      "🌐 www.caisseavsvaud.ch"
    ]
  },

  bourse: {
    titre: "Bourses d'études et d'apprentissage",
    emoji: "🎓",
    resume:
      "L'État de Vaud verse des bourses (argent non remboursable) aux personnes en formation — apprentissage, gymnase, école professionnelle, université — dont la famille n'a pas les moyens de financer les études.",
    conditions: [
      "Suivre une formation reconnue (apprentissage, école, université…)",
      "Être domicilié·e dans le canton de Vaud (règles spécifiques selon la situation)",
      "Ressources de la famille insuffisantes pour financer la formation"
    ],
    documents: [
      "Attestation d'inscription à la formation",
      "Contrat d'apprentissage le cas échéant",
      "Décision de taxation fiscale des parents (ou la vôtre)",
      "Justificatifs de revenus et de charges de la famille"
    ],
    etapes: [
      "Rendez-vous sur www.vd.ch et cherchez « bourses d'études » (Office cantonal des bourses d'études — OCBE).",
      "Créez votre demande en ligne sur le portail, idéalement dès l'été avant la rentrée (les demandes prennent du temps).",
      "Joignez l'attestation d'inscription et les documents financiers de la famille.",
      "Suivez l'avancement de votre dossier en ligne et répondez vite si l'OCBE demande des pièces complémentaires.",
      "La bourse est versée en plusieurs tranches pendant l'année de formation. La demande doit être renouvelée chaque année."
    ],
    contacts: [
      "🌐 www.vd.ch/ocbe",
      "🏢 Office cantonal des bourses d'études (OCBE), Lausanne",
      "📞 OCBE : 021 316 33 70"
    ]
  },

  brapa: {
    titre: "Avances sur pensions alimentaires (BRAPA)",
    emoji: "⚖️",
    resume:
      "Si votre ex-conjoint·e ne paie pas la pension alimentaire due pour vous ou vos enfants, l'État de Vaud peut vous avancer cet argent et se charger de le récupérer à votre place.",
    conditions: [
      "Avoir un jugement ou une convention fixant une pension alimentaire",
      "La pension n'est pas payée (ou seulement en partie)",
      "Être domicilié·e dans le canton de Vaud",
      "Revenus en dessous des limites fixées"
    ],
    documents: [
      "Jugement de divorce/séparation ou convention alimentaire ratifiée",
      "Preuves du non-paiement (relevés de compte)",
      "Justificatifs de revenus",
      "Pièce d'identité et permis de séjour le cas échéant"
    ],
    etapes: [
      "Contactez le Bureau de recouvrement et d'avances sur pensions alimentaires (BRAPA) à Lausanne.",
      "Demandez le formulaire de demande d'avances.",
      "Joignez le jugement fixant la pension et les preuves de non-paiement.",
      "Le BRAPA examine votre droit et, si accepté, vous verse des avances mensuelles.",
      "Le BRAPA se retourne ensuite contre la personne qui doit la pension — vous n'avez plus à vous en occuper."
    ],
    contacts: [
      "🏢 BRAPA — Bureau de recouvrement et d'avances sur pensions alimentaires, Lausanne",
      "🌐 www.vd.ch (cherchez « BRAPA »)",
      "📞 021 316 52 21"
    ]
  },

  logement: {
    titre: "Aide au logement",
    emoji: "🏠",
    resume:
      "Plusieurs aides existent : appartements à loyer modéré, aide individuelle au logement dans certaines communes (p. ex. Lausanne), et solutions d'hébergement d'urgence si vous n'avez plus de toit.",
    conditions: [
      "Logements subventionnés : revenus en dessous des limites, inscription auprès de la commune ou des gérances",
      "Aide individuelle au logement : familles avec revenus modestes dans les communes qui la proposent",
      "Hébergement d'urgence : accessible à toute personne sans abri"
    ],
    documents: [
      "Justificatifs de revenus",
      "Bail actuel et décompte de charges",
      "Attestation de domicile",
      "Pour l'urgence : aucun document exigé, venez comme vous êtes"
    ],
    etapes: [
      "Si votre loyer est trop lourd : demandez au service du logement de votre commune s'il existe des logements subventionnés ou une aide individuelle au logement, et inscrivez-vous sur les listes.",
      "En cas de menace d'expulsion : réagissez vite ! Contactez votre CSR et l'ASLOCA (défense des locataires) avant l'audience.",
      "Si vous êtes sans abri ce soir : à Lausanne, adressez-vous à un hébergement d'urgence (p. ex. La Marmotte, Le Répit, Sleep-In). L'accueil de nuit est possible même sans papiers.",
      "Parlez de votre situation de logement à votre assistant·e social·e du CSR : le RI peut prendre en charge le loyer dans certaines limites.",
      "Pour retrouver un logement durable, des associations comme Caritas Vaud ou le CSP peuvent appuyer votre dossier."
    ],
    contacts: [
      "🏢 Service du logement de votre commune (Lausanne : 021 315 74 11)",
      "🆘 Sans-abri à Lausanne : Sleep-In (021 626 22 46), La Marmotte",
      "🤝 ASLOCA Vaud (défense des locataires) : 021 617 50 36"
    ]
  },

  urgence: {
    titre: "Urgence : nourriture et besoins vitaux",
    emoji: "🍽️",
    resume:
      "Si vous n'avez plus de quoi manger ou faire face aux besoins de base, des aides immédiates et gratuites existent — sans grandes démarches administratives.",
    conditions: [
      "Aucune condition compliquée : ces aides s'adressent à toute personne dans le besoin",
      "Certaines distributions demandent une simple attestation (CSR, commune) ou fonctionnent sur bonne foi"
    ],
    documents: [
      "En général aucun, ou une simple pièce d'identité",
      "Pour certaines épiceries solidaires : une carte délivrée par un service social"
    ],
    etapes: [
      "Pour manger aujourd'hui : les Cartons du Cœur livrent des colis alimentaires gratuits (cherchez « Cartons du Cœur + votre région »), et à Lausanne la Soupe populaire (Fondation Mère Sofia) sert des repas chauds chaque soir.",
      "Pour des courses à petits prix : les épiceries Caritas sont ouvertes aux personnes à budget serré.",
      "Demandez à votre commune ou CSR la carte d'accès aux épiceries solidaires si nécessaire.",
      "En parallèle, prenez rendez-vous au CSR : l'urgence se soigne aujourd'hui, mais le RI ou d'autres aides peuvent stabiliser votre situation durablement.",
      "En cas de détresse psychologique, appelez La Main Tendue au 143 (24h/24, gratuit, anonyme)."
    ],
    contacts: [
      "🍲 Cartons du Cœur (par région) — colis alimentaires gratuits",
      "🍲 Soupe populaire Mère Sofia, Lausanne — repas chauds le soir",
      "🛒 Épiceries Caritas Vaud — Lausanne, Vevey, Yverdon",
      "📞 La Main Tendue : 143 (24h/24)"
    ]
  },

  dettes: {
    titre: "Dettes et désendettement",
    emoji: "📉",
    resume:
      "Factures impayées, poursuites, impôts en retard ? Des services gratuits et confidentiels vous aident à faire le tri, négocier avec les créanciers et retrouver un budget viable.",
    conditions: [
      "Aucune : les consultations budget/dettes sont ouvertes à tous et gratuites"
    ],
    documents: [
      "Rassemblez tout votre courrier : factures, rappels, commandements de payer",
      "Justificatifs de revenus et charges (salaire, loyer, assurance…)",
      "Extrait de l'office des poursuites si vous en avez un"
    ],
    etapes: [
      "Premier réflexe : appelez la ligne gratuite « Parlons Cash » au 0840 43 21 00 (canton de Vaud) pour un premier conseil anonyme.",
      "Prenez rendez-vous pour une consultation gratuite de désendettement au CSP Vaud ou chez Caritas Vaud.",
      "Apportez tout votre courrier, même les enveloppes non ouvertes — les conseillers ont l'habitude, personne ne vous jugera.",
      "Avec le conseiller, établissez un budget et un plan : négociation avec les créanciers, arrangements de paiement, voire remise partielle.",
      "Priorité absolue : payer d'abord le loyer et l'assurance-maladie. Le conseiller vous aidera à demander les aides qui réduisent ces charges (subside, RI…)."
    ],
    contacts: [
      "📞 Parlons Cash : 0840 43 21 00 (info budget et dettes, canton de Vaud)",
      "🤝 CSP Vaud — consultation dettes gratuite : 021 560 60 60",
      "🤝 Caritas Vaud : 021 317 59 80"
    ]
  },

  chomage: {
    titre: "Perte d'emploi (chômage)",
    emoji: "💼",
    resume:
      "Si vous perdez votre travail, l'assurance-chômage remplace une partie de votre salaire. Il faut s'inscrire au plus vite : chaque jour compte pour vos indemnités.",
    conditions: [
      "Avoir travaillé (et cotisé) au moins 12 mois durant les 2 dernières années — des exceptions existent",
      "Être apte au travail et prêt·e à accepter un emploi",
      "Habiter en Suisse"
    ],
    documents: [
      "Pièce d'identité / permis de séjour",
      "Lettre de licenciement et contrat de travail",
      "Fiches de salaire des derniers mois",
      "Attestation de l'employeur (formulaire remis par la caisse)",
      "CV à jour et preuves de recherches d'emploi"
    ],
    etapes: [
      "Inscrivez-vous immédiatement — dès que vous connaissez votre licenciement — en ligne sur www.travail.swiss ou auprès de l'Office régional de placement (ORP) de votre région.",
      "Choisissez une caisse de chômage (caisse publique cantonale ou caisse syndicale) : c'est elle qui versera vos indemnités.",
      "Commencez tout de suite vos recherches d'emploi et gardez des preuves écrites : elles sont exigées dès avant l'inscription.",
      "Participez au premier entretien ORP et suivez les instructions de votre conseiller·ère.",
      "Envoyez chaque mois le formulaire « indications de la personne assurée » à votre caisse pour recevoir vos indemnités.",
      "Si vous n'avez pas droit au chômage ou si les indemnités ne suffisent pas, le CSR peut compléter avec le RI."
    ],
    contacts: [
      "🌐 www.travail.swiss — inscription en ligne",
      "🏢 ORP (Office régional de placement) de votre région",
      "🏢 Caisse cantonale de chômage, ou caisse syndicale (Unia, Syna…)"
    ]
  }
};

/* Catégories du menu principal → aides proposées */
const CATEGORIES = [
  { id: "argent", label: "💰 Pas assez d'argent pour vivre", aides: ["ri", "subside", "pcavs"] },
  { id: "famille", label: "👨‍👩‍👧 Famille et enfants", aides: ["alloc", "pcfam", "brapa"] },
  { id: "logement", label: "🏠 Logement", aides: ["logement", "ri"] },
  { id: "sante", label: "🏥 Santé et assurance-maladie", aides: ["subside", "pcavs"] },
  { id: "travail", label: "💼 Perte d'emploi", aides: ["chomage", "ri"] },
  { id: "etudes", label: "🎓 Études et formation", aides: ["bourse", "alloc"] },
  { id: "dettes", label: "📉 Dettes et factures", aides: ["dettes", "subside"] },
  { id: "urgence", label: "🆘 Urgence : manger, dormir", aides: ["urgence", "logement"] }
];

/* Mots-clés pour comprendre le texte libre (et la voix) */
const MOTS_CLES = [
  { mots: ["manger", "faim", "nourriture", "alimentaire", "repas", "rien a manger"], aide: "urgence" },
  { mots: ["dormir", "sans abri", "sans-abri", "la rue", "toit", "hebergement", "expulsion", "expulse"], aide: "logement" },
  { mots: ["loyer", "logement", "appartement", "bail"], aide: "logement" },
  { mots: ["dette", "dettes", "poursuite", "poursuites", "facture", "factures", "impaye", "credit"], aide: "dettes" },
  { mots: ["chomage", "licencie", "licenciement", "perdu mon travail", "perte d'emploi", "sans emploi", "orp"], aide: "chomage" },
  { mots: ["bourse", "etude", "etudes", "apprentissage", "formation", "universite", "gymnase"], aide: "bourse" },
  { mots: ["pension alimentaire", "pension", "ex-mari", "ex-femme", "divorce", "separation", "brapa"], aide: "brapa" },
  { mots: ["allocation", "allocations", "enfant", "enfants", "bebe", "naissance"], aide: "alloc" },
  { mots: ["famille", "garde", "garderie", "creche"], aide: "pcfam" },
  { mots: ["retraite", "avs", "ai ", "invalidite", "rente", "age", "senior"], aide: "pcavs" },
  { mots: ["assurance maladie", "assurance-maladie", "prime", "primes", "lamal", "subside", "caisse maladie"], aide: "subside" },
  { mots: ["argent", "revenu", "aide sociale", "ri ", "minimum vital", "pauvre", "precarite"], aide: "ri" }
];
