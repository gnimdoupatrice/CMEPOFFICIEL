
## Diagnostic — incohérences actuelles sur la homepage

Toutes les sections utilisent en boucle **3 photos** seulement (`team-cmep`, `animateur-projet-intervenants`, `redaction-tdr`), sans lien avec le contenu :

| Section | Image actuelle | Problème |
|---|---|---|
| Hero | `team.jpg` (photo de groupe posée) | Statique, ne traduit pas le dynamisme / la jeunesse |
| Pourquoi / Défis | `animateurProjetIntervenants` | Photo d'atelier générique |
| Vision | `team.jpg` (répétée) | Doublon avec le hero, aucune symbolique |
| Impact | `animateurProjetIntervenants` (répétée) | Doublon, pas d'idée de réussite collective |
| Axe 01 Entrepreneuriat | `redactionTdr` | Photo de documents, pas d'entrepreneuriat |
| Axe 02 Formation | `animateurProjet` | Correct mais réutilisé |
| Axe 03 Leadership | `team.jpg` (répétée) | Doublon |
| Axe 04 Innovation numérique | `certificatEies` (papier) | **Contresens** total avec le numérique |
| Axe 05 Citoyenneté & Écologie | `team.jpg` (répétée) | Aucun lien avec l'écologie |
| Témoignage 1 (Aïcha, couturière) | `team.jpg` | Pas un portrait |
| Témoignage 2 (Kossi, AgriTech) | `animateurProjetIntervenants` | Pas un portrait |
| Témoignage 3 (Pr Tchassona) | `team.jpg` | Pas un portrait |

## Sources d'images

1. **Images fournies par l'utilisateur** (uploads) :
   - `Gemini_Generated_Image_vj9re2...png` → **Section Hero** (réunion CMEP moderne)
   - `Gemini_Generated_Image_c0267...png` → **Section Vision** (homme regardant l'horizon / phare)
2. **Images à générer** via `imagegen` (fast) selon les mots-clés Unsplash du PDF ASPECCT, adaptées au contexte togolais / ouest-africain, HD, réalistes :
   - Défis : jeunes togolais en réflexion / recherche d'emploi
   - Impact : équipe de jeunes africains en réussite collective
   - Axe 01 Entrepreneuriat : jeunes entrepreneurs africains en réunion de startup
   - Axe 02 Formation : formation professionnelle technique (atelier)
   - Axe 03 Leadership : leadership communautaire jeunesse Afrique
   - Axe 04 Innovation numérique : hub tech africain, coding
   - Axe 05 Écologie : reboisement / action environnementale Afrique
   - Témoignages : 3 portraits (femme entrepreneuse, homme fondateur tech, professeur senior) — headshots pros souriants

## Étapes d'exécution

1. **Uploader les 2 images utilisateur** via `lovable-assets create` depuis `/mnt/user-uploads/` :
   - `src/assets/home/hero-cmep.jpg.asset.json`
   - `src/assets/home/vision-cmep.jpg.asset.json`
2. **Générer 10 images HD** dans `src/assets/home/` :
   - `defis.jpg`, `impact.jpg`
   - `axe-entrepreneuriat.jpg`, `axe-formation.jpg`, `axe-leadership.jpg`, `axe-numerique.jpg`, `axe-ecologie.jpg`
   - `portrait-aicha.jpg`, `portrait-kossi.jpg`, `portrait-professeur.jpg`
3. **Étendre `src/lib/media.ts`** : ajouter un bloc `home: { hero, vision, defis, impact, axes: {...}, portraits: {...} }` en important les nouveaux `.asset.json`.
4. **Mettre à jour `src/routes/index.tsx`** :
   - Remplacer les constantes `heroImg`, `challengeImg`, `visionImg`, `impactImg`, `axis*`, `testimonial*` par les nouvelles références `CMEP_MEDIA.home.*`
   - Mettre à jour l'`og:image` du hero
   - Corriger l'`alt` du hero (sujet réel)
   - Conserver `loading="eager" fetchPriority="high"` sur le hero LCP, `loading="lazy" decoding="async"` sur les autres
5. **Ne pas toucher** aux autres pages, à la structure, au style ou à la logique — refonte strictement visuelle sur la homepage.

## Détails techniques

- Toutes les images générées : format `.jpg`, 1600×1000 (axes/impact/défis) et 800×800 (portraits carrés pour cartes témoignages).
- Prompts en anglais suivant les mots-clés du PDF, avec ajout systématique de « West African / Togolese, natural lighting, documentary photography, no text overlay ».
- Aucune modification du `styles.css`, des composants shadcn, ou du contenu textuel.
- Résultat attendu : chaque section porte un visuel unique, cohérent avec son message, sans doublon.
