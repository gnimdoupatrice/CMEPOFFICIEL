# Plan — Remplacement des images par correspondance sémantique

Voici pour chaque section le fichier uploadé que je vais utiliser. Aucune image ne sera générée par IA sur les témoignages ni là où une image réelle est disponible.

## 1. Homepage (`src/routes/index.tsx`)


| Section                                                                                  | Image à utiliser                                                                        | Source | &nbsp; |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------ | ------ |
| **Hero**                                                                                 | `HERO.jfif` (panel de conférence CMEP)                                                  | upload | &nbsp; |
| **Vision**                                                                               | `vision.webp` (homme face horizon)                                                      | upload | &nbsp; |
| **Pourquoi CMEP / Défis**                                                                | `generationenattentedesopportunite.png` (jeunes en attente d'entretien PNUD Togo)       | upload | &nbsp; |
| &nbsp;                                                                                   | &nbsp;                                                                                  | &nbsp; | &nbsp; |
| **Axe 01 — Emploi & Entrepreneuriat****Axe 02 — Formation technique & professionnelle** | `entrpreprenariat.jfif` (atelier confection Togo)                                       | upload | &nbsp; |
| **Axe 01 — Emploi & Entrepreneuriat**                                                    | important : POUR CECI JE VAIS T4ENVOYER L'image                                         | &nbsp; | &nbsp; |
| **Axe 03 — Leadership & engagement communautaire**                                       | `engagementcommunautairecitoyen.png` (cercle de jeunes en discussion)                   | upload | &nbsp; |
| **Axe 04 — Innovation numérique**                                                        | *(inchangé — l'utilisateur ne l'a pas mentionné ; je garde `axe-numerique.jpg` actuel)* | —      | &nbsp; |
| **Axe 05 — Citoyenneté & écologie**                                                      | `engagement_citoyen.jpg` (plantation d'arbre officielle)                                | upload | &nbsp; |


### Programmes phares (bloc 3 cartes homepage)

Remplacer les 3 cartes actuelles par :

1. **Rédaction & gestion de projets (TDR)** → `redaction_de_proget.jpg`
2. **Animateur de projet — formation certifiante** → `683603371_...jpg`
3. **Expert en Évaluation d'Impact Environnemental & Social (EIES)** → `cerifica.jpg`

### Témoignages

Les 3 portraits actuellement générés par IA (`portrait-aicha`, `portrait-kossi`, `portrait-professeur`) sont **supprimés** faute de vraies photos fournies. Options possibles à trancher avant implémentation :

- (A) Retirer les visuels et garder uniquement le texte + initiales stylisées (recommandé, conforme à votre demande "pas d'IA")
- (B) Attendre que vous fournissiez de vraies photos

→ Je pars sur l'option **A** sauf indication contraire.

## 2. Magazine (`src/routes/impact.tsx`)

- **Article à la Une** : `LANCEMENT_OFFICIELLE.jfif` (Cérémonie de présentation & lancement CMEP)
- **Dernières dépêches** — remplacer les 3 items existants par **2 seuls** :
  1. Lancement officiel du programme CMEP → `LANCEMENT_OFFICIELLE.jfif`
  2. locavor de tourisme  → `engagement_citoyen.jpg` (visuel terrain / paysage togolais)

## 3. Opportunités (`src/routes/opportunites.tsx`)


| Opportunité                                             | Image                     |
| ------------------------------------------------------- | ------------------------- |
| Formation en animation de terrain / Animateur de projet | `683603371_...jpg`        |
| Expert en évaluation d'impact environnemental et social | `cerifica.jpg`            |
| Atelier — Rédaction & gestion des projets (TDR)         | `redaction_de_proget.jpg` |


## Exécution technique (après validation)

1. Uploader chaque fichier via `lovable-assets create` depuis `/mnt/user-uploads/` → un `.asset.json` par image dans `src/assets/home/` (ou `src/assets/opportunities/` selon usage).
2. Étendre `src/lib/media.ts` :
  - Remplacer `home.hero`, `home.vision`, `home.defis`, `home.impact`
  - Remplacer `home.axes.entrepreneuriat`, `formation`, `leadership`, `ecologie`
  - Remplacer les 4 images `opportunities.*` par les nouvelles versions officielles CMEP
3. Mettre à jour `src/routes/index.tsx` : `alt` réels, `loading="eager"` sur hero, `loading="lazy" decoding="async"` ailleurs, bloc « Programmes phares » réécrit avec les 3 nouveaux programmes.
4. Mettre à jour `src/routes/impact.tsx` : article à la Une + réduire dépêches à 2 items.
5. Mettre à jour `src/routes/opportunites.tsx` : les 3 opportunités pointent vers les nouveaux `.asset.json`.
6. Supprimer les anciens portraits IA (`portrait-aicha.jpg`, `portrait-kossi.jpg`, `portrait-professeur.jpg`) et refondre le bloc témoignages en version typographique (initiales + nom + citation).
7. Vérification visuelle après build via Playwright sur `/`, `/impact`, `/opportunites`.

**Aucun changement** de structure, couleurs ou typo — refonte strictement visuelle.

&nbsp;

important: 

Au niveau des, des axes. Pour le axe un, il y a pas l'image là. Pour le... Oui, pour le axe un, y a pas l'image. Donc je vais te réenvoyer l'image du axe un. 

Confirmez-vous ce mapping (notamment l'option A pour les témoignages sans photo IA) ?