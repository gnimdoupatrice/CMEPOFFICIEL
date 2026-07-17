# Refonte qualité niveau ONU/PNUD — CMEP

## 0. Situation actuelle (constat)

- **BLOCKER résolu** : le site renvoyait un `HTTP 500` à cause de deux imports d'assets manquants dans `src/lib/media.ts` (`axe-formation.jpg.asset.json`, `axe-leadership.png.asset.json`). Corrigé en pointant vers les vrais assets uploadés (`axe-entrepreneuriat-recrutement.png`, `axe-entrepreneuriat.jpg` réaffecté formation, `axe-leadership-communautaire.jpg`). Le site répond de nouveau en 200.
- **Overflow mobile** détecté sur toutes les routes (une carte à 398px sur viewport 390px → 8px de débord).
- La ref citée (`ribedu.saeicubetech.com`) sera consultée comme boussole visuelle, mais nous restons sur l'ADN CMEP (navy/gold/pearl, Inter + Cormorant).

## 1. Méthode (2 phases)

### Phase A — Audit systémique (lecture seule, 1 passe)

1. Capture Playwright des 7 routes × 3 viewports (mobile 390, tablet 834, desktop 1440) — déjà générées.
2. Lecture ciblée de : `styles.css`, `Navigation.tsx`, `Footer.tsx`, `Layout.tsx`, `index.tsx`, `a-propos.tsx`, `programmes.tsx`, `impact.tsx`, `opportunites.tsx`, `partenaires.tsx`, `contact.tsx`, `media.ts`.
3. Classement des trouvailles en 4 niveaux : **P0 blocker**, **P1 critique**, **P2 majeur**, **P3 polish**.

### Phase B — Corrections regroupées par thème (une passe par thème)

Chaque thème = un batch de fichiers édités en parallèle, puis re-vérification Playwright avant le suivant.

**Thème 1 — Fondations (P0/P1)**
- Éliminer l'overflow mobile (carte à 398px) — identifier la carte fautive et poser `min-w-0` + `max-w-full`.
- Ajouter un vrai token `--color-ngo-ink` (texte body) + palette d'états success/warning/danger pour éviter les hex arbitraires dans les composants.
- Vérifier tous les contrastes AA (WCAG 2.2) sur navy/gold/pearl/slate.

**Thème 2 — Système typographique unifié (P1)**
- Hiérarchie stricte : eyebrow (11px tracking .28em) → H2 (`text-h2`) → lead (`text-lead`) → body. Aucun `text-[Npx]` arbitraire dans les composants.
- Cormorant Garamond réservé aux citations éditoriales (magazine, témoignages). Inter partout ailleurs.
- Rythme vertical unifié : `py-[var(--space-section-y)]` sur chaque section, jamais de `py-24` codé en dur.

**Thème 3 — Grille & espacements (P1)**
- Adopter `container-fluid` (déjà défini dans `styles.css`) partout à la place des variantes maison `max-w-7xl mx-auto px-...`.
- Gouttières standardisées : `gap-6 lg:gap-8` sur toutes les grilles cartes.
- Cartes : mêmes rayons (`rounded-2xl`), mêmes bordures (`ring-1 ring-ngo-navy/10`), même ombre au hover.

**Thème 4 — Composants réutilisables (P1)**
- Extraire 3 primitives dans `src/components/site/` :
  - `SectionHeader` (eyebrow + titre + lead + optionnel lien "voir tout"),
  - `Card` (image ratio 4/5, overlay dégradé, kicker, titre, chip ODD),
  - `Stat` (chiffre tabular-nums + libellé).
- Remplacer les répétitions inline dans `index.tsx`, `programmes.tsx`, `impact.tsx`, `opportunites.tsx`.

**Thème 5 — Navigation & footer (P2)**
- Simplifier l'en-tête au scroll (ombre plus discrète, bordure 1px pearl).
- Menu mobile : accents/interactions Apple (translation + opacity, jamais de scale).
- Footer : renforcer la hiérarchie institutionnelle (colonne "À propos" plus dense, mentions de conformité).

**Thème 6 — Performance & accessibilité (P1/P2)**
- Vérifier `loading="lazy"` + `decoding="async"` sur toutes les images hors-fold ; `fetchPriority="high"` uniquement sur le hero.
- Ajout d'un `<link rel="preload" as="image">` sur le hero LCP dans le `head()` de `routes/index.tsx`.
- Alt descriptifs (jamais "image de …").
- Focus ring cohérent (déjà en place globalement → vérifier absence d'overrides).

**Thème 7 — Micro-interactions (P3)**
- Transitions unifiées : `duration-200 ease-out` par défaut, `duration-300` pour les cartes.
- Respect strict de `prefers-reduced-motion` (déjà couvert dans `styles.css`).
- Aucun effet gratuit type parallax/scale > 1.02.

## 2. Livrables

- Audit écrit (trouvailles classées P0→P3) présenté avant chaque batch de corrections.
- Screenshots avant/après par viewport pour chaque thème.
- Compte-rendu final : conformité WCAG 2.2 AA, poids page, score Core Web Vitals (estimé via lighthouse local si dispo).

## 3. Hors périmètre (à confirmer)

- Nouvelles pages/routes.
- Refonte de la charte couleur (navy/gold/pearl conservés).
- Ajout de contenus/textes (je réutilise l'existant, sauf reformulation nécessaire pour la hiérarchie).

## 4. Questions avant de démarrer

1. **OK pour cette méthode par thèmes** (7 batches, re-vérif à chaque étape) plutôt qu'une refonte monolithique en un seul commit géant ?
2. **Périmètre** : je m'attaque à **toutes les routes** (7 pages) ou d'abord uniquement la **homepage** puis les autres en itération ?
3. **Contraintes fonctionnelles** : puis-je extraire librement des composants (`SectionHeader`, `Card`, `Stat`) sans casser les URLs / props existantes ?
