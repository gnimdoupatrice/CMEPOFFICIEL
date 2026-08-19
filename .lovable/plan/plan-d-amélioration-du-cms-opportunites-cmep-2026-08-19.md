# Plan d'amélioration du CMS Opportunites CMEP

## Objectif
Rendre le back-office CMS plus efficace pour une equipe non-technique qui publie regulierement des formations et ateliers, tout en gardant le design public existant intact.

## Ameliorations proposees

1. **Apercu avant publication**
   - Ajouter un bouton "Apercu" dans le formulaire d'edition qui ouvre un modal ou un onglet montrant le rendu public exact de la fiche opportunite (image, titre, description, modules, tarifs, CTA).
   - Permet de verifier le contenu avant de passer le statut a `published`.

2. **Duplication d'opportunite**
   - Ajouter un bouton "Dupliquer" sur chaque carte du tableau de bord admin.
   - Cree une copie en statut `draft` avec le meme contenu, un slug incremente et sans les candidatures.
   - Gagne du temps lors des appels a candidatures recurrents.

3. **Tableau de bord enrichi pour les candidatures**
   - Afficher le nombre de nouvelles candidatures par opportunite.
   - Ajouter un filtre par statut de candidature (`nouvelle`, `en_revue`, `acceptee`, `refusee`).
   - Ajouter une recherche par nom ou email du candidat.

4. **Export CSV des candidatures**
   - Bouton "Exporter" sur la section candidatures du tableau de bord.
   - Genere un fichier CSV contenant : nom, email, telephone, profil, motivation, opportunite, statut, date de candidature.

5. **Indicateurs de publication sur le formulaire**
   - Barre de progression ou checklist indiquant les champs obligatoires remplis (titre, description courte, image, sessions, modules).
   - Message d'alerte si l'opportunite est publiee mais incomplete.

6. **Amelioration de l'upload d'image**
   - Validation du format et de la taille cote serveur en plus du client.
   - Compression automatique cote client avant envoi (limite 6 Mo respectee, temps d'upload reduit).

## Phases de realisation

### Phase 1 : Apercu et duplication
- Ajout du composant `OpportunityPreview` reutilisant le rendu public.
- Ajout du bouton "Dupliquer" et de la server function `adminDuplicateOpportunity`.

### Phase 2 : Candidatures
- Ajout des filtres et recherche dans `admin.index.tsx`.
- Ajout de la server function `adminExportApplications` et generation CSV cote client.

### Phase 3 : Validation et upload
- Compression client de l'image avant upload.
- Verification serveur du type MIME et de la taille.

## Details techniques

- Aucune modification de schema de base de donnees requise.
- Les nouvelles server functions seront placees dans `src/lib/admin.functions.ts`.
- Le composant d'apercu sera dans `src/components/admin/OpportunityPreview.tsx`.
- L'export CSV utilisera un helper client dans `src/lib/utils.ts`.
- Les filtres de candidatures seront purement client-side pour commencer.
