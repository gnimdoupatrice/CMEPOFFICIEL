Remplacer l'image de la section "hero " par l'image fournie.

Étapes :

1. Uploader `user-uploads://image.png` sur le CDN via `lovable-assets` → `src/assets/axis-digital.jpg.asset.json`.
2. Vérifier que `src/routes/index.tsx` importe bien `axis-digital.jpg.asset.json` et utilise `.url` (sinon ajuster l'import).
3. Aucun autre changement (hero, partenaires, etc. restent intacts).