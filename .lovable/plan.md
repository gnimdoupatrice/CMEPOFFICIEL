# Plan — Correction images axes stratégiques + élévation qualité niveau ONU/PNUD

## 1. Clarification importante sur les fichiers `.asset.json`

Les fichiers `.asset.json` ne sont **pas** affichés comme images sur le site. Ce sont des **pointeurs CDN** (métadonnées JSON contenant l'URL réelle de l'image hébergée sur le CDN Cloudflare de Lovable).

Dans le code, on importe le pointeur puis on utilise `.url` :

```tsx
import heroAsset from "@/assets/home/hero-cmep.jpg.asset.json";
<img src={heroAsset.url} alt="..." />  // → sert un vrai .jpg
```

Le navigateur reçoit une **vraie image JPG/PNG/WebP**, pas un JSON. C'est la méthode officielle Lovable pour éviter d'alourdir le dépôt avec des binaires.

→ Si vous voyez un rendu cassé quelque part, **dites-moi précisément où** (URL + section) — je corrigerai. Mais la structure actuelle est correcte.

## 2. Remplacements demandés (section « Axes stratégiques » — homepage)


| Axe                                   | Image AVANT                          | Image APRÈS (demande utilisateur)                                                      |
| ------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------- |
| **Axe 01 — Emploi & Entrepreneuriat** | atelier confection (ancien axe 1)    | `generationenattentedesopportunite-2.png` (personnes assises en ligne, entretien PNUD) |
| **Axe 02 — Formation technique**      | image générique actuelle             | atelier confection (l'ancienne image de l'axe 1)                                       |
| **Axe 03 — Leadership & engagement**  | `engagementcommunautairecitoyen.png` | `engagement_com.jpg` (cercle de villageois en concertation)                            |


Axes 04 (Numérique) et 05 (Écologie) : inchangés.

### Exécution technique

1. Upload des 2 nouvelles images via `lovable-assets create` depuis `/mnt/user-uploads/` :
  - `generationenattentedesopportunite-2.png` → `src/assets/home/axe-entrepreneuriat.png.asset.json` (remplace l'actuel)
  - `engagement_com.jpg` → `src/assets/home/axe-leadership.jpg.asset.json` (remplace l'actuel `.png`)
2. L'ancienne image « atelier confection » (actuellement `axe-entrepreneuriat.jpg`) est réaffectée à l'axe 02 → renommage logique : la clé `axes.formation` dans `src/lib/media.ts` pointera désormais vers l'ancienne image entrepreneuriat.
3. Mise à jour de `src/lib/media.ts` (imports + clés `axes.entrepreneuriat`, `axes.formation`, `axes.leadership`).
4. Suppression des anciens pointeurs `.asset.json` orphelins via `lovable-assets delete`.
5. `alt` réels et descriptifs sur chaque `<img>` dans `src/routes/index.tsx`.

## 3. Élévation qualité — standard ONU/PNUD

Passes de raffinement appliquées **sans changer la charte** (navy/gold/pearl conservée) :

- **Traitement image institutionnel** : chaque visuel des axes reçoit un overlay dégradé subtil (`from-ngo-navy/70 to-transparent`) + titre en surimpression typographique blanc/gold — signature visuelle PNUD/UN Women.
- **Ratio & cadrage** : uniformisation en `aspect-[4/5]` portrait pour les cartes d'axes (cohérence éditoriale ONU) ; `object-cover object-center` avec `object-position` ajusté par image pour éviter les recadrages malheureux.
- **Micro-typographie** : numéros d'axes en `tabular-nums` + kicker uppercase tracking `0.28em` (grille éditoriale UN).
- **Densité & respirations** : espacement vertical entre sections aligné sur un rythme de 96 px (desktop) / 64 px (mobile) — grille UNDP.
- **Accessibilité** : contraste AA vérifié sur overlays, `alt` descriptifs contextuels (pas de « image de » générique), `loading="lazy"` + `decoding="async"` sauf hero (`eager` + `fetchpriority="high"`).
- **Cohérence des légendes** : chaque carte d'axe reçoit un mini-libellé ODD (ex. « ODD 8 · Travail décent ») en pied de card, référencé à l'Agenda 2030.

## 4. Vérification

- Build + Playwright headless sur `/` : screenshot pleine page → contrôle visuel de chaque axe (bonne image, overlay lisible, alt correct).
- Vérification que **toutes** les `<img src>` du site pointent vers des URLs CDN `/__l5e/assets-v1/...` (jamais vers un `.json`).
- imoprtant : 
  Le test au niveau de la section Hero doit être des tests du type center. C'est-à-dire que le test align doit être du type CENTER au niveau de la section Hero. Le text align doit être du type CENTER.

## Points à confirmer avant implémentation

1. OK pour l'affectation des 3 images ci-dessus ?
2. OK pour l'overlay dégradé + titre en surimpression sur les cartes d'axes (style PNUD) ? Sinon je garde les cartes actuelles avec image séparée du texte.