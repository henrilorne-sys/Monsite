# Site — Étude notariale (Maître Henri Lorne)

Site statique (HTML/CSS/JS vanilla, sans framework ni étape de build) pour une
étude notariale moderne : rapide, mobile-first, accessible, et optimisé pour
le référencement classique (SEO) comme pour les moteurs de réponse basés sur
l'IA (AEO/GEO — ChatGPT, Claude, Perplexity, Gemini...).

## ⚠️ À personnaliser avant mise en ligne

Les informations d'identité et de contact ci-dessous sont **réelles**
(nom, adresse, téléphone, horaires — d'après votre fiche Google
Établissement). Il reste toutefois quelques valeurs **inventées ou à
confirmer** avant mise en ligne :

| Donnée | Valeur actuelle | Statut | Où la remplacer |
|---|---|---|---|
| Nom | Henri Lorne — Notaire | ✅ réel | — |
| Adresse | 15A avenue du Général Charles de Gaulle, 71880 Châtenoy-le-Royal | ✅ réel | — |
| Téléphone | 03 85 45 41 85 | ✅ réel | — |
| Horaires | Lun–Ven 9h–12h / 14h–18h, fermé le week-end | ✅ réel | — |
| Note Google | 5,0 ★ (10 avis) | ✅ réel | Mise à jour manuelle si le nombre d'avis évolue (`index.html`, badge hero + `aggregateRating` JSON-LD) |
| Email | contact@henrilorne-notaire.fr | ⚠️ inventé (aucun site existant au moment de la création) | Toutes les pages — remplacez par votre vraie adresse (ex. celle en `@notaires.fr` ou une adresse dédiée au nom de domaine choisi) |
| Nom de domaine | `www.henrilorne-notaire.fr` | ⚠️ inventé, à réserver ou remplacer | Toutes les balises `canonical`, `og:url`, JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt` |
| Coordonnées GPS (carte) | 46.7936, 4.8306 (centre approximatif de Châtenoy-le-Royal) | ⚠️ approximatif | Affinez avec les coordonnées exactes du 15A avenue du Général Charles de Gaulle dans `contact/index.html` (iframe) et le JSON-LD de `index.html` |
| CRPCEN / SIRET / TVA / forme d'exercice | `[à compléter]` | ⚠️ à compléter | `mentions-legales/index.html` |
| Hébergeur | `[à compléter]` | ⚠️ à compléter | `mentions-legales/index.html` |
| Formulaire de contact | `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"` | ⚠️ à activer | `contact/index.html` — créez un compte sur [Formspree](https://formspree.io) (ou équivalent) et remplacez l'identifiant |
| Photos | Illustrations SVG génériques | ⚠️ à remplacer | Vous avez déjà de belles photos de la façade (enseigne « NOTAIRE » rétroéclairée) : intégrez-les dans `le-notaire/index.html` et le hero de `index.html` à la place des illustrations vectorielles |

Astuce : recherchez `henrilorne-notaire.fr` et `contact@henrilorne-notaire.fr`
dans tous les fichiers pour retrouver rapidement le nom de domaine et
l'email à confirmer.

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
