# 🤝 Aide Sociale Vaud — assistant pour l'accès aux aides sociales

Un chatbot **gratuit**, en français, qui aide les personnes en situation de précarité
dans le **canton de Vaud (Suisse)** à découvrir les aides auxquelles elles ont droit
et les guide **étape par étape** jusqu'au dépôt de leur demande.

## ✨ Fonctionnalités

- 💬 **Chat écrit** : gros boutons simples + texte libre compris par mots-clés
- 🎤 **Chat vocal** : parlez au micro (reconnaissance vocale) et activez la lecture
  à voix haute des réponses (bouton 🔊 en haut à droite)
- 🧭 **Guides pas à pas** : chaque aide est découpée en étapes concrètes
  (« C'est fait, étape suivante ») avec la liste des documents et les contacts
- 📱 **Application iPhone et Android** : c'est une PWA — depuis Safari ou Chrome,
  « Ajouter à l'écran d'accueil » installe l'app avec son icône, en plein écran
- 🔄 **Mises à jour automatiques** : chaque nouvelle version publiée est installée
  toute seule à l'ouverture suivante de l'app
- 📴 **Fonctionne hors ligne** et **ne collecte aucune donnée personnelle**

## 📚 Aides couvertes (canton de Vaud)

| Aide | Pour qui |
|---|---|
| Revenu d'insertion (RI) | Personnes sans ressources suffisantes |
| Subside assurance-maladie | Revenus modestes (réduction des primes LAMal) |
| PC Familles | Familles qui travaillent avec enfants < 16 ans |
| PC AVS/AI | Rentiers dont la rente ne suffit pas |
| Allocations familiales | Tous les parents |
| Bourses d'études (OCBE) | Personnes en formation |
| Avances pensions alimentaires (BRAPA) | Pensions impayées |
| Aide au logement / urgence | Loyer trop lourd, sans-abri |
| Aide alimentaire d'urgence | Cartons du Cœur, Caritas, soupe populaire |
| Dettes / désendettement | Parlons Cash, CSP, Caritas |
| Chômage | Inscription ORP, caisse de chômage |

> ⚠️ Informations indicatives : seuls les organismes officiels (CSR, vd.ch)
> confirment les droits. Vérifiez toujours auprès d'eux.

## 🚀 Mise en ligne (0 CHF)

1. Activer **GitHub Pages** sur ce dépôt (Settings → Pages → branche principale)
2. L'app est alors disponible sur `https://<utilisateur>.github.io/<repo>/aide-vaud/`
3. Partager ce lien : sur iPhone (Safari → Partager → « Sur l'écran d'accueil »)
   et Android (Chrome → « Installer l'application »), l'app s'installe comme une
   application native

## 🔄 Publier une mise à jour

1. Modifier les fichiers (p. ex. ajouter une aide dans `data.js`)
2. **Incrémenter `VERSION` dans `sw.js`** (p. ex. `v1.0.1`)
3. Pousser sur GitHub : tous les utilisateurs reçoivent la mise à jour
   automatiquement à la prochaine ouverture

## 💰 Plan budget (200 CHF)

| Poste | Coût |
|---|---|
| Développement (ce prototype) | 0 CHF |
| Hébergement GitHub Pages | 0 CHF/mois |
| Nom de domaine `.ch` (optionnel, p. ex. aide-vaud.ch) | ~15 CHF/an |
| Réserve pour la suite (API IA, compte développeur) | ~185 CHF |

### Étapes suivantes possibles (avec la réserve)

- **IA conversationnelle complète** : brancher l'API Claude pour comprendre des
  situations complexes en langage naturel (~5–20 CHF/mois selon l'usage au début)
- **App stores** : empaqueter cette même app avec Capacitor ;
  compte Google Play = 25 USD une fois, Apple = 99 USD/an
  (à faire quand le service devient payant à 2 CHF/utilisateur pour couvrir ces frais)
- **Paiement 2 CHF/utilisateur** : Twint ou Stripe une fois l'app établie ;
  gratuit au lancement comme prévu

## 🗂 Fichiers

- `index.html` — structure de l'app
- `styles.css` — interface (gros boutons, contraste élevé)
- `app.js` — moteur de conversation, voix, mises à jour
- `data.js` — base de connaissances des aides vaudoises (facile à compléter)
- `sw.js` — service worker (hors ligne + mises à jour automatiques)
- `manifest.webmanifest` + `icons/` — installation sur iPhone/Android
