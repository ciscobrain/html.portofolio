/*
 * Configuration de l'application.
 *
 * IA_URL : adresse du serveur intermédiaire (Cloudflare Worker) qui parle
 * à l'API Claude — voir serveur-ia/worker.js pour le déployer.
 *
 *  - Laisser vide ("") : l'app fonctionne en mode guidé uniquement
 *    (boutons + mots-clés), 100 % gratuit et hors ligne.
 *  - Renseigner l'URL (p. ex. "https://aide-vaud.mon-compte.workers.dev") :
 *    les messages écrits ou dictés librement sont traités par l'IA Claude,
 *    avec repli automatique sur le mode guidé si le serveur ne répond pas.
 */
const CONFIG = {
  IA_URL: ""
};
