
# Refonte complète CMEP — Plan d'exécution

Refonte intégrale du site CMEP en un seul chantier, avec standards inspirés des organisations internationales (ONU, PNUD, GIZ). Le plan couvre les 10 chantiers demandés.

## 1. Extraction & préparation des assets

- Parser `Présentation_du_CMEP_1.pptx` avec `document--parse_document` pour extraire tous les logos partenaires + visuels institutionnels.
- Nettoyer les logos (fond blanc/transparent uniformisé via `imagegen--edit_image` si nécessaire) et les uploader en `.asset.json` via `lovable-assets`.
- Uploader `logo_cmep_well.jpg` (logo officiel) et `team_cmep.jpg` (image équipe complète) comme assets CDN.
- Remplacer le placeholder "C" par le vrai logo CMEP dans Navbar + Footer.

## 2. Optimisation performances (Core Web Vitals)

- Créer un composant `<ResponsiveImage>` réutilisable produisant `<picture>` avec sources AVIF + WebP + JPG fallback, `srcset` multi-tailles (480/768/1200/1920), `sizes` contextuel, `loading="lazy"` par défaut (`eager` pour LCP), `decoding="async"`, `fetchpriority` explicite.
- Utiliser `vite-imagetools` (`bun add -d vite-imagetools`) pour générer les variantes formats/tailles au build.
- Précharger le hero LCP dans le `head()` de la route concernée.
- Auditer et supprimer imports non utilisés, code-split lourd, activer `defaultPreloadStaleTime` déjà en place.
- Ajouter `Cache-Control` implicite via assets CDN.

## 3. Refonte Magazine (`/impact` → repositionné)

Transformer en portail éditorial de type BBC Afrique / Jeune Afrique :

- **Structure éditoriale** : Hero News plein largeur (article vedette) · rangée 2 articles secondaires · grille catégorielle (À la Une, Terrain, Portraits, Analyses, Vidéos) · derniers articles (feed) · sidebar catégories + tags populaires.
- **Recherche** : barre de recherche filtrant par titre/catégorie (client-side sur les données).
- **Structure de données** : `src/lib/magazine-data.ts` exposant `Article[]` avec champs (slug, titre, chapô, auteur, date, catégorie, image, contenu, tags, isFeatured, readTime). Placeholder de 12 articles crédibles en attendant les vrais textes utilisateur.
- **Cartes articles** : élégantes, ratio image homogène, catégorie colorée, date + temps de lecture, hover subtil.
- **Route dynamique** : `src/routes/magazine.$slug.tsx` (page article) avec head SEO complet (og:image = image de l'article).
- Renommer le lien nav "Magazine" au lieu de "Impact" et route `/magazine`.

## 4. Section Partenaires

- Nouveau composant `PartnersGrid` : grille responsive (2 → 3 → 5 → 6 col), niveau de gris + saturation au hover, `aspect-square` uniforme, fond blanc.
- Intégré sur Homepage (bande "Ils nous font confiance") + page `/partenaires` remaniée (par catégories : institutionnels, ONG, académiques, techniques).

## 5. Page À propos

- Refonte institutionnelle : Hero → Mission/Vision → Notre histoire → Valeurs → **Notre équipe** (affichage de `team_cmep.jpg` en pleine image, encadrée élégamment avec titre "Notre équipe" et légende) → Gouvernance → CTA.

## 6. Réorganisation ODD

- Retirer la section "Alignement aux 17 ODD" de `/partenaires`.
- L'intégrer dans `/programmes` (Axes), adaptée au design de la page : grille des 17 ODD avec icônes officielles ou tuiles colorées, mise en relation avec les axes CMEP.

## 7. Refonte Opportunités (`/opportunites`)

Portail dédié uniquement aux opportunités :
- Filtres : type (bourse, formation, appel à projets, concours, événement, appel à candidatures), statut (ouvert/clôturé), date limite.
- Cartes opportunité : titre, type (badge coloré), deadline, description courte, CTA "Postuler".
- Structure `src/lib/opportunities-data.ts`.
- Supprimer tout contenu non lié.

## 8. Système de CTA

- Composant `<CtaBanner variant="join|partner|donate|apply|contact|discover">` réutilisable.
- Chaque route reçoit un CTA final pertinent selon son contexte.
- Bouton `Button` shadcn étendu avec variantes `gold` (primaire CMEP) et `outline-gold`.

## 9. Refonte Footer

Nouveau footer 5 colonnes desktop, empilé mobile :
1. Bloc identité (logo, mission courte, réseaux sociaux avec vraies icônes → LinkedIn + Facebook fournis + placeholders).
2. Liens rapides (À propos, Axes, Magazine, Opportunités, Partenaires).
3. Programmes / Axes clés.
4. Contact (adresse, tel, mail) + Newsletter (input + bouton, action stockée localement pour l'instant).
5. Bas de footer : mentions légales, politique de confidentialité (routes stubs à créer), copyright.

Ajout des routes `/mentions-legales` et `/confidentialite` (contenu institutionnel type).

## 10. Accessibilité WCAG 2.2 AA

- Audit contraste (tous les tokens `text-*` sur fonds respectifs).
- `alt` sur toutes les images (décoratives : `alt=""`).
- `aria-label` sur boutons icône, focus-visible déjà global → vérifier partout.
- Un seul `<main>` par route, hiérarchie H1→H2→H3 respectée.
- Tap targets ≥44px déjà en place.
- Navigation clavier complète (dropdown langue, menu mobile, dropdowns programmes).
- `lang="fr"` déjà OK au root.
- Ajouter skip-link "Aller au contenu principal".

## 11. Navigation

Réordonner et clarifier : Accueil · À propos · Axes · Magazine · Opportunités · Partenaires · Contact. CTA "Rejoindre" reste doré. Logo CMEP officiel remplace le carré "C".

## 12. SEO

- Head unique par route (title + description + og:* + twitter:*), og:image absolu quand pertinent (article, hero).
- JSON-LD Organization sur `__root` ou home.
- Sitemap déjà présent, vérifier qu'il liste les nouvelles routes.

---

## Détails techniques

**Dépendances à installer** :
- `vite-imagetools` (transformation d'images build-time)

**Nouveaux fichiers principaux** :
- `src/components/site/ResponsiveImage.tsx`
- `src/components/site/PartnersGrid.tsx`
- `src/components/site/CtaBanner.tsx`
- `src/components/magazine/*` (HeroNews, ArticleCard, CategoryPills, SearchBar)
- `src/components/opportunities/OpportunityCard.tsx`
- `src/lib/magazine-data.ts` (12 articles placeholder)
- `src/lib/opportunities-data.ts`
- `src/lib/team-data.ts`
- `src/routes/magazine.tsx` + `src/routes/magazine.$slug.tsx`
- `src/routes/mentions-legales.tsx`, `src/routes/confidentialite.tsx`
- Assets : `src/assets/logo-cmep.jpg.asset.json`, `src/assets/team-cmep.jpg.asset.json`, `src/assets/partners/*.asset.json` (extraits du .pptx)

**Fichiers refondus** :
- `src/components/site/Navigation.tsx` (logo + ordre + magazine)
- `src/components/site/Footer.tsx` (refonte complète)
- `src/routes/__root.tsx` (SEO + skip-link + JSON-LD)
- `src/routes/impact.tsx` → renommé `magazine.tsx`
- `src/routes/a-propos.tsx` (section équipe)
- `src/routes/programmes.tsx` (ODD)
- `src/routes/partenaires.tsx` (grille partenaires, sans ODD)
- `src/routes/opportunites.tsx` (portail opportunités)
- `src/routes/index.tsx` (bande partenaires + CTAs cohérents)
- `src/styles.css` (tokens CTA gold, éventuels ajustements)

**Ordre d'exécution** :
1. Parser .pptx + upload assets (logos + équipe)
2. Installer `vite-imagetools`, créer `ResponsiveImage`
3. Refonte Navigation + Footer (impacte toutes les pages)
4. Refonte Homepage (partenaires + CTAs)
5. Magazine (portail + route article)
6. À propos (équipe)
7. Opportunités (portail)
8. Axes (+ODD) et Partenaires (–ODD)
9. Routes légales + skip-link + JSON-LD SEO
10. Audit a11y final + vérif build

Chantier long : je préviendrai à chaque grande étape franchie.
