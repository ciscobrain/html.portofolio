/*
 * Service worker — Aide Sociale Vaud
 * Rend l'application utilisable hors ligne et applique automatiquement
 * les mises à jour : incrémentez VERSION à chaque nouvelle publication.
 */

const VERSION = "v1.0.0";
const CACHE = "aide-vaud-" + VERSION;

const FICHIERS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(FICHIERS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cles) {
      return Promise.all(
        cles.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

/* Réseau d'abord (pour recevoir les nouveautés), cache en secours (hors ligne) */
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(function (rep) {
        const copie = rep.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copie); });
        return rep;
      })
      .catch(function () { return caches.match(e.request, { ignoreSearch: true }); })
  );
});
