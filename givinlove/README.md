# 💙 Site de la Fondation Giv'in Love

Site vitrine premium de la **Fondation Giv'in Love** — fondation humanitaire née en 2017
de l'engagement du couple Decurey, entre la Suisse 🇨🇭 et la Côte d'Ivoire 🇨🇮, et reconnue
officiellement par les autorités ivoiriennes en 2022.

Domaine cible : **https://fondationgivinlove.com**

## Pages

| Page | Fichier |
|---|---|
| Accueil (hero plein écran, statistiques animées, missions, témoignages, galerie, actualités, appel au don) | `index.html` |
| Notre Histoire (récit + frise chronologique) | `notre-histoire.html` |
| Notre Mission (8 missions illustrées) | `notre-mission.html` |
| Nos Actions (cartes interactives) | `nos-actions.html` |
| Galerie (masonry + lightbox + catégories) | `galerie.html` |
| Actualités (recherche + filtres par catégorie) | `actualites.html` |
| Faire un Don (montants, don mensuel, impact) | `faire-un-don.html` |
| Contact (formulaire complet + carte Google Maps) | `contact.html` |
| Espace administrateur (démonstration) | `admin.html` |
| Mentions légales / Politique de confidentialité | `mentions-legales.html`, `politique-confidentialite.html` |

## Technologies

- **HTML5** sémantique et accessible (WCAG AA : contrastes, focus visible, aria, skip-link, `prefers-reduced-motion`)
- **CSS moderne** (custom properties, grid, `color-mix`, glassmorphism, mode sombre)
- **JavaScript vanilla** léger : animations au scroll (IntersectionObserver), compteurs animés,
  menu mobile animé, lightbox, filtres, recherche, formulaires protégés par honeypot anti-spam
- **SEO complet** : titles/descriptions uniques, Open Graph, Twitter Cards, Schema.org
  (`NGO` + `BreadcrumbList`), `sitemap.xml`, `robots.txt`, images ALT, URLs propres
- **Performance** : images JPEG optimisées et redimensionnées (+ variantes `-sm`), lazy loading,
  `preload` du visuel hero, aucune dépendance JS externe

> Le cahier des charges mentionnait React/Next.js : ce dépôt étant un portfolio de sites
> statiques (GitHub Pages), le site est livré en HTML/CSS/JS pur — même rendu premium,
> déployable partout sans build. Une migration Next.js reste possible en réutilisant
> tel quel le design system (`css/styles.css`) et les contenus.

## Espace administrateur (démonstration)

`admin.html` — identifiant `admin`, mot de passe `givinlove`.
Panneaux : actualités, photos, projets, textes, événements, partenaires, messages.
Les données sont stockées dans le navigateur (localStorage). **Pour la production**,
brancher un vrai back-end ou un CMS headless (Decap CMS, Strapi, Directus…) et
remplacer cette authentification de démonstration.

## Paiements

La page de don présente Stripe, PayPal, TWINT et carte bancaire. Les boutons pointent
vers le formulaire de contact tant que les comptes marchands ne sont pas créés :
il suffira ensuite de remplacer le lien du bouton « Faire un don » par le lien de
paiement Stripe (Payment Link), PayPal (bouton don) ou TWINT.

## Crédits photos

Photographies d'illustration issues d'[Unsplash](https://unsplash.com) (licence Unsplash).
Remplacez-les progressivement par les photos réelles de la Fondation dans `assets/img/`
(conservez les mêmes noms de fichiers pour ne rien casser).
