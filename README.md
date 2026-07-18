# Site — Étude notariale (Maître Henri Lorne)

Site statique (HTML/CSS/JS vanilla, sans framework ni étape de build) pour une
étude notariale moderne : rapide, mobile-first, accessible, et optimisé pour
le référencement classique (SEO) comme pour les moteurs de réponse basés sur
l'IA (AEO/GEO — ChatGPT, Claude, Perplexity, Gemini...).

## ⚠️ À personnaliser avant mise en ligne

Le contenu ci-dessous a été rempli avec des informations **plausibles mais
provisoires** (déduites du nom de domaine `notaires.fr` de l'expéditeur) afin
de livrer un site complet et cohérent. **Remplacez impérativement** ces
valeurs avant publication :

| Donnée | Valeur actuelle (placeholder) | Où la remplacer |
|---|---|---|
| Nom du notaire | Maître Henri Lorne | Toutes les pages (header, footer, JSON-LD) |
| Ville / adresse | 12 rue de la République, 69002 Lyon | Toutes les pages (footer, JSON-LD, `contact/index.html`) |
| Téléphone | 04 78 00 00 00 | Toutes les pages (`tel:+33478000000`) |
| Email | contact@etude-lorne-notaires.fr | Toutes les pages |
| Nom de domaine | `www.etude-lorne-notaires.fr` | Toutes les balises `canonical`, `og:url`, JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt` |
| CRPCEN / SIRET / TVA / forme d'exercice | `[à compléter]` | `mentions-legales/index.html` |
| Hébergeur | `[à compléter]` | `mentions-legales/index.html` |
| Coordonnées GPS (carte) | 45.757, 4.832 (Lyon, approximatif) | `contact/index.html` (iframe OpenStreetMap) et JSON-LD de `index.html` |
| Formulaire de contact | `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"` | `contact/index.html` — créez un compte sur [Formspree](https://formspree.io) (ou équivalent) et remplacez l'identifiant |
| Photos | Illustrations SVG génériques | Remplacez par de vraies photos (notaire, étude) dans `le-notaire/index.html` et le hero de `index.html` |

Astuce : la plupart de ces valeurs se retrouvent facilement avec une
recherche globale ("Find in files") sur `Henri Lorne`, `69002 Lyon`,
`04 78 00 00 00`, `contact@etude-lorne-notaires.fr` et
`etude-lorne-notaires.fr`.

## Structure du site

```
/                          Accueil
/le-notaire/                Présentation du notaire et de l'étude
/domaines-intervention/     Immobilier · Famille & patrimoine · Entreprises
/honoraires/                Explication des honoraires et barème indicatif
/faq/                       Questions fréquentes (accordéon + JSON-LD FAQPage)
/contact/                   Coordonnées, carte, formulaire de rendez-vous
/mentions-legales/
/politique-confidentialite/
/404.html                   Page d'erreur personnalisée

/assets/css/style.css       Design system (variables, layout, composants)
/assets/js/main.js          Menu mobile, accordéon FAQ, animations, formulaire
/assets/img/                Logo, favicons, image de partage (Open Graph)

robots.txt, sitemap.xml, llms.txt, site.webmanifest   Fichiers techniques SEO/AEO
```

Chaque page est un fichier HTML autonome (pas de moteur de templates) : le
header et le footer sont dupliqués volontairement pour garantir que **tout
le contenu soit présent dans le HTML brut**, sans dépendre de JavaScript —
un point important car de nombreux robots d'indexation IA (GPTBot, ClaudeBot,
PerplexityBot...) ne exécutent pas JavaScript.

## Choix techniques

- **Aucune dépendance externe** : pas de Google Fonts, pas de CDN, pas de
  tracker. Polices système uniquement → chargement instantané, aucun souci
  de conformité RGPD lié aux polices.
- **Mobile-first & responsive** : mise en page fluide (CSS Grid/Flexbox,
  `clamp()`), menu hamburger en dessous de 940px.
- **Accessibilité** : lien d'évitement, `aria-*` sur le menu et l'accordéon,
  contrastes suffisants, `prefers-reduced-motion` respecté.
- **Mode sombre** automatique via `prefers-color-scheme`.
- **SEO classique** : balises title/description uniques par page, canonical,
  Open Graph, Twitter Cards, `sitemap.xml`, données structurées JSON-LD
  (`LegalService`, `Person`, `Service`, `FAQPage`, `BreadcrumbList`).
- **SEO pour l'IA (AEO/GEO)** : `llms.txt` à la racine (convention
  [llmstxt.org](https://llmstxt.org)) résumant le site, `robots.txt`
  n'exclut aucun robot IA, contenu rédigé en questions/réponses factuelles
  (idéal pour être cité par un moteur génératif).

## Déploiement

Le site est 100% statique : aucun serveur applicatif n'est nécessaire.
Déployez le contenu de ce dossier tel quel sur, par exemple :

- **Cloudflare Pages / Netlify / Vercel** : glisser-déposer le dossier ou
  connecter le dépôt Git (aucune commande de build à configurer).
- **OVH / o2switch / hébergement mutualisé classique** : envoyer les
  fichiers par FTP/SFTP à la racine du domaine.

Pensez à activer HTTPS (obligatoire pour la géolocalisation du formulaire et
la confiance des visiteurs) — la plupart des hébergeurs cités l'activent
automatiquement.

### Tester en local

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Formulaire de contact

Le formulaire (`contact/index.html`) est prêt à fonctionner avec
[Formspree](https://formspree.io) (gratuit jusqu'à 50 messages/mois) : créez
un formulaire, copiez son identifiant et remplacez `VOTRE_ID_FORMSPREE` dans
l'attribut `action`. Tant que ce n'est pas fait, le site affiche un message
d'erreur explicite au lieu d'échouer silencieusement.
