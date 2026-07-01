# Refonte Mobile First — Recyc Hub Togo

Audit complet + refonte progressive de la home en Mobile First, sans casser l'identité visuelle actuelle (glassmorphism vert/or, hero premium, sections WordPress).

---

## 1. Audit Responsive (à confirmer après passage Playwright)

Zones à instrumenter en 375px / 414px / 768px / 1024px / 1440px / 2560px :

- **Navbar** : liens condensés, pills serrées, risque d'overflow sur 360–390px, hamburger déjà présent mais menu à revoir (hiérarchie, tap targets 44px).
- **Hero** : hauteur `100vh` probable → passer en `100dvh`, slideshow — vérifier ratio image + lisibilité titre sur 360px, boutons CTA empilés.
- **Section "Pourquoi"** : 3 cartes défis + onglets Vision/Mission → sur mobile les onglets se compressent, image badge peut déborder.
- **Comment ça marche** : layout image gauche + checklist droite → doit devenir stack vertical <768px avec indicateurs de progression tactiles.
- **Impact (dark)** : grille stats — passer 4 → 2 colonnes <640px, compteurs lisibles.
- **Academy / Événements / Alerte / Témoignages / Partenaires / CTA / Footer** : vérifier gouttières, tailles typos, alignements.
- **Global** : `overflow-x`, images sans `max-width:100%`, textes en `px` fixes, boutons < 44px, focus states manquants.

---

## 2. Stratégie Mobile First

- **Philosophie** : base = 360px. Media queries uniquement pour **ajouter** de la respiration, jamais pour "réparer".
- **Priorités UX** : lisibilité (>16px body), pouce-friendly (CTA principaux dans la zone basse ou sticky), hiérarchie claire (1 action par écran), performance (LCP hero <2.5s).
- **Architecture** : conteneur fluide `w-full max-w-7xl px-4 sm:px-6 lg:px-8`, grilles `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, typo `clamp()`.

---

## 3. Breakpoints (Tailwind v4, alignés sur défauts)

| Alias | min-width | Cible |
|---|---|---|
| (base) | 0 | Petits smartphones 320–390px |
| `sm` | 640px | Grands smartphones / tablette portrait étroite |
| `md` | 768px | Tablettes portrait |
| `lg` | 1024px | Tablettes paysage / petits laptops |
| `xl` | 1280px | Laptops / desktop standard |
| `2xl` | 1536px | Desktop large / 2K |

Ajout d'un token `3xl` (1920px) dans `styles.css` pour 4K si besoin (typo cap + largeur max container).

---

## 4. Grille & conteneurs

- Container : `w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl` (avec `max-w-[1600px]` sur `3xl`).
- Gouttières : `gap-4 sm:gap-6 lg:gap-8`.
- Sections verticales : `py-16 sm:py-20 md:py-24 lg:py-28`.

---

## 5. Comportement par section (résumé)

- **Header/Navbar** : logo + hamburger <lg. Menu plein écran mobile avec accordéon "Découvrir", CTA sticky bas, tap 48px. ≥lg = layout actuel affiné.
- **Hero** : `min-h-dvh`, titre `clamp(2rem, 8vw, 4.5rem)`, CTAs en colonne <sm, ligne >sm. Slideshow : swipe tactile + dots 44px.
- **Pourquoi** : cartes défis en carousel horizontal snap <md, grille 3 col ≥md. Onglets en select natif <sm (meilleure UX), pills ≥sm.
- **Comment ça marche** : stepper vertical <md (image en haut, checklist dessous), split 2 col ≥md. Indicateurs numérotés cliquables 44px.
- **Impact** : 2×2 <sm, 4×1 ≥md. Compteurs `clamp(2rem, 10vw, 3.5rem)`.
- **Academy/Events/Alerte** : cartes stack <md, grid ≥md.
- **Témoignages** : carousel snap <md, grid ≥lg.
- **Partenaires** : marquee/scroller <md, grille logos ≥md.
- **FAQ** (si présent) : accordion pleine largeur, tap 48px.
- **Footer** : accordéons collapsibles <md, 4 colonnes ≥md. Newsletter form stack <sm.

---

## 6. Typographie responsive

Tokens dans `src/index.css` :

```css
--fs-body: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);
--fs-h4: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
--fs-h3: clamp(1.375rem, 1.1rem + 1vw, 1.875rem);
--fs-h2: clamp(1.75rem, 1.2rem + 2vw, 3rem);
--fs-h1: clamp(2.25rem, 1.4rem + 4vw, 4.5rem);
--lh-tight: 1.1;
--lh-body: 1.6;
```

Line-height serrée sur titres, aérée sur body. Suppression des tailles fixes `text-6xl` non gardées.

---

## 7. Composants (règles transversales)

- **Boutons** : `min-h-11 min-w-11` (44px), padding fluide, focus ring visible (`focus-visible:ring-2 ring-secondary`).
- **Cartes** : `rounded-2xl`, padding fluide `p-5 sm:p-6 md:p-8`.
- **Images** : `w-full h-auto`, `loading="lazy"` sauf hero, `decoding="async"`, `aspect-*` sur wrappers.
- **Modales/menus** : bottom-sheet <md, dialog centré ≥md.
- **Tables** : scroll horizontal contenu dans un wrapper `overflow-x-auto` avec ombre indicative.

---

## 8. Performance

- Hero image : preload dans `head()`, WebP/AVIF via `vite-imagetools`.
- `loading="lazy"` + `decoding="async"` sur toutes les images hors LCP.
- `content-visibility: auto` sur sections hors viewport.
- Réduction des animations `prefers-reduced-motion`.
- Purge CSS Tailwind (auto en v4).

---

## 9. UX Mobile

- Zone tactile 44px min partout.
- CTA principal Hero atteignable au pouce (bas de fold).
- Swipe natif sur carousels (snap CSS).
- Pas d'hover-only, tous les états ont un équivalent tactile.
- Menu mobile avec animation < 250ms, close on route change.

---

## 10. Accessibilité (WCAG 2.2 AA)

- Contrastes vérifiés (jaune secondary sur navy = OK, vérifier sur pearl).
- `aria-label` sur tous les boutons icônes.
- Focus visible partout.
- `<main>` unique, hiérarchie H1→H2→H3 respectée.
- `prefers-reduced-motion` honoré.
- Alt text descriptifs sur images de contenu, `alt=""` sur décoratives.

---

## 11. Tests

Playwright headless : screenshots 375 / 414 / 768 / 1024 / 1440 / 2560px avant/après, vérification console (0 erreur) et absence d'overflow horizontal (`document.documentElement.scrollWidth <= innerWidth`).

---

## 12. Fichiers touchés (estimation)

- `src/index.css` — tokens typo fluides, container, focus, reduced-motion.
- `src/components/Navbar.tsx` — menu mobile refondu.
- `src/components/HeroSection.tsx` — dvh, clamp, swipe.
- `src/components/AboutSection.tsx` — carousel cartes défis, onglets → select mobile.
- `src/components/HowItWorksSection.tsx` — stepper vertical mobile.
- `src/components/ImpactSection.tsx` — grille 2×2 mobile.
- `src/components/{Academy,Events,Alert,Testimonials,Partners,Cta,Footer}Section.tsx` — passes ciblées.
- Ajout d'un utilitaire `.no-scrollbar` et `.snap-x-mandatory` si absent.

---

## Ordre d'exécution proposé

1. Audit Playwright (avant) — capture 6 viewports.
2. Tokens globaux (`index.css`) — typo fluide, container, focus, motion.
3. Navbar mobile.
4. Hero + sections dans l'ordre de la page.
5. Audit Playwright (après) — même 6 viewports + diff.
6. Rapport final structuré selon le TEMPLATE demandé.

---

**Question avant de lancer** : je fais tout en un seul batch (long, ~30-40 éditions) ou tu préfères que je livre par étapes (1. tokens + navbar → tu valides → 2. hero + pourquoi → etc.) pour pouvoir arbitrer en cours de route ?
