# Site — Étude notariale (Henri Lorne - Notaire)

Site statique (HTML/CSS/JS vanilla, sans framework ni étape de build) pour une
étude notariale moderne : rapide, mobile-first, accessible, et optimisé pour
le référencement classique (SEO) comme pour les moteurs de réponse basés sur
l'IA (AEO/GEO — ChatGPT, Claude, Perplexity, Gemini...).

## ⚠️ À personnaliser avant mise en ligne

Toutes les informations ci-dessous sont désormais **réelles** (nom, adresse,
téléphone, horaires, domaine, email, photos de la façade). Il reste
seulement quelques valeurs administratives à compléter :

| Donnée | Valeur actuelle | Statut | Où la remplacer |
|---|---|---|---|
| Nom | Henri Lorne - Notaire | ✅ réel | — |
| Adresse | 15A avenue du Général Charles de Gaulle, 71880 Châtenoy-le-Royal | ✅ réel | — |
| Téléphone | 03 85 45 41 85 | ✅ réel | — |
| Horaires | Lun–Ven 9h–12h / 14h–18h, fermé le week-end | ✅ réel | — |
| Note Google | 5,0 ★ (10 avis) | ✅ réel | Mise à jour manuelle si le nombre d'avis évolue (`index.html`, badge hero + `aggregateRating` JSON-LD) |
| Email | etude.lorne@notaires.fr (adresse générale de l'étude) | ✅ réel | — |
| Nom de domaine | `lorne.notaires.fr` | ✅ réel | — |
| Photos | Vraie photo de la façade (enseigne « NOTAIRE » rétroéclairée) | ✅ intégrée | Page d'accueil (hero) et page « Le notaire » (`assets/img/etude-facade.jpg` et `etude-facade-portrait.jpg`) |
| Coordonnées GPS (carte) | 46.7936, 4.8306 (centre approximatif de Châtenoy-le-Royal) | ⚠️ approximatif | Affinez avec les coordonnées exactes du 15A avenue du Général Charles de Gaulle dans `contact/index.html` (iframe) et le JSON-LD de `index.html` |
| CRPCEN / SIRET / TVA / forme d'exercice | `[à compléter]` | ⚠️ à compléter | `mentions-legales/index.html` |
| Hébergeur | `[à compléter]` | ⚠️ à compléter | `mentions-legales/index.html` — voir aussi la note « Hébergement » ci-dessous, spécifique aux domaines `notaires.fr` |
| Formulaire de contact | `action="https://formspree.io/f/xqerdlop"` | ✅ configuré (compte Formspree réel) | — |
| Logo | Logo officiel « Notaires de France » (bloc-marque CSN, coloris bleu conforme) accolé au nom de l'étude | ✅ intégré | `assets/img/ndf-logo-blue.png` (en-tête), `ndf-logo-white.png` (pied de page sur fond foncé), favicons |

### ⚠️ Important — usage du logo officiel « Notaires de France »

Le logo est utilisé conformément à la charte graphique du notariat (CSN, 2021) :
le logo officiel n'est **jamais utilisé seul** pour représenter l'étude, il est
toujours accolé au nom « Henri Lorne - Notaire » (règle du bloc-marque). Le
coloris bleu d'origine a été conservé (les teintes autorisées par la charte
sont le bleu, le gris/noir, le rouge et le turquoise — le vert du site n'en
fait pas partie). Si le logo est un jour remplacé, veillez à conserver cette
règle d'association et à rester dans la palette de couleurs autorisée par la
charte.

### 📩 Formulaire de contact (Formspree)

Le formulaire pointe vers l'identifiant de formulaire réel créé sur le
compte Formspree de l'étude (`xqerdlop`). Les soumissions sont gérées et
notifiées depuis le tableau de bord [formspree.io](https://formspree.io).

### ⚠️ Important — hébergement sur un domaine `notaires.fr`

Votre domaine `lorne.notaires.fr` est un sous-domaine du portail national
`notaires.fr`, opéré par l'ADSN (Association pour le Développement du
Service Notarial) pour le compte des notaires de France. Ces sites sont en
général générés via une plateforme/CMS mutualisé (choix de modèles,
personnalisation limitée) plutôt qu'hébergés en dépôt de fichiers statiques
libres comme celui-ci. **Avant de déployer ce site tel quel**, vérifiez
auprès de votre interlocuteur ADSN / chambre des notaires :

- s'il est possible d'héberger un site statique personnalisé (upload de
  fichiers HTML/CSS/JS) sous `lorne.notaires.fr`, ou si le site doit
  obligatoirement passer par leur CMS ;
- si un upload est possible, la procédure technique (FTP, interface
  d'administration, etc.) ;
- si ce n'est pas possible nativement, ce site peut servir de **maquette de
  référence** (design, contenus, structure SEO) à recréer dans l'éditeur du
  portail notaires.fr, ou être déployé sur un nom de domaine indépendant
  avec une redirection depuis `lorne.notaires.fr` si l'ADSN l'autorise.

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
