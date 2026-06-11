# Refonte éditoriale — Opportunités & FAQ

Même ADN que la section "Actualités & Opportunités" de la home : magazine institutionnel, storytelling, visuels immersifs, micro-interactions premium, densité textuelle maîtrisée.

---

## 1. `src/routes/opportunites.tsx` — refonte totale

### Problèmes actuels

- Page = hero + grille 2×2 plate
- Aucune image dans les cartes, effet "tableau d'annonces"
- Pas de hiérarchie (toutes les opportunités au même poids visuel)
- Métadonnées minimales (deadline + lieu uniquement)
- Aucun storytelling, aucun perks, aucune urgence visible

### Nouvelle architecture (4 blocs)

**A. HERO immersif** (garder mais enrichir)

- Image cinématique + double overlay
- Badge live pulsant "Candidatures ouvertes — Promotion 2025"
- H1 XXL éditorial (5xl→7xl), accent doré sur mot-clé
- Bandeau de 4 stats glassmorphism (places, deadlines, % bourses, profils)

**B. OPPORTUNITÉ PHARE — Featured (full-width)**

- Mise en avant du "Mentorat Entrepreneurial 2025" en hero éditorial
- Image large 16/9 à gauche, contenu narratif à droite
- Badge "Programme phare" + urgency pill
- Grille 4 métadonnées (Durée / Places / Deadline / Lieu) avec icônes
- 3 perks listés (Mentor 1:1, Fonds amorçage, Réseau)
- CTA premium "Candidater" + lien secondaire "Lire le programme"

**C. GRILLE ÉDITORIALE — Autres opportunités (3 cartes asymétriques)**

- Bootcamp / Stage / Bourse, chacune avec :
  - Image dédiée + overlay dégradé
  - Badge type + badge urgency
  - Titre éditorial bold tracking-tight
  - Excerpt narratif court (1 phrase d'impact)
  - Footer carte : deadline + lieu + flèche ArrowUpRight
- Hover : scale image 1.05, border gold, translate-y -1
- Stagger reveal au scroll

**D. PROCESSUS DE CANDIDATURE (nouveau)**

- Section dark navy
- 4 étapes numérotées 01/02/03/04 (Dépôt → Entretien → Intégration → Onboarding)
- Layout horizontal sur desktop, vertical mobile
- Délais indicatifs par étape

**E. CTA final** (existe déjà — refit premium)

- Garder mais agrandir typo, ajouter sous-titre rassurant
- CTA principal + email/WhatsApp coordination en secondaire

### Données

- Réutiliser `FEATURED_OPPORTUNITIES` déjà défini dans `src/routes/index.tsx` (4 entrées avec perks/urgency/duration)
- Extraire dans `src/lib/cmep-data.ts` pour partage home ↔ page dédiée
- Ajouter champ `image` + `excerpt` par opportunité

### Assets

- Réutiliser visuels existants (`workshop`, `bootcamp`, `hero-student`, etc.)
- Pas de nouvelle génération sauf besoin manifeste

---

## 2. `src/routes/faq.tsx` — polish éditorial

La page est déjà bien structurée. Ajustements ciblés, pas de refonte totale :

**A. Bloc "Voix terrain" entre catégories et CTA final** (nouveau)

- 2 mini-témoignages courts liés aux questions fréquentes
- Format quote éditorial avec photo ronde + nom + rôle
- Renforce le "humain" promis par le hero

**B. Bloc "Ressources connexes" avant le CTA final** (nouveau)

- 3 cartes : "Lire le programme", "Voir les opportunités", "Contacter un mentor"
- Liens internes vers /programmes, /opportunites, /contact
- Cartes éditoriales avec icône + titre + 1 ligne

**C. Hero — micro-polish**

- Ajouter badge "Mis à jour juin 2025" plus visible
- Animation fade-in stagger sur les stats

**D. Accordéon — micro-interaction**

- Reveal smooth déjà OK
- Ajouter scroll-into-view léger quand on ouvre une question (UX premium)

---

## Détails techniques

- Aucun changement de design tokens (palette navy/gold/pearl conservée)
- Composants : utiliser `<Link>` `@tanstack/react-router`, icônes `lucide-react`
- Pas de nouveau package
- Métadonnées SEO conservées (head() inchangé sauf description légèrement enrichie)
- Responsive : grilles lg:grid-cols-12, fallback mobile single-column
- Accessibilité : `aria-expanded`, `aria-pressed` conservés ; alt descriptifs sur toutes les nouvelles images

---

## Fichiers touchés

- `src/routes/opportunites.tsx` — refonte totale
- `src/routes/faq.tsx` — ajout 2 sections + micro-polish
- `src/lib/cmep-data.ts` — extraction de `FEATURED_OPPORTUNITIES` (+ image, excerpt, perks)
- `src/routes/index.tsx` — remplacer la constante locale par l'import partagé

Tu valides cette direction ? Si oui, j'implémente en build mode.

&nbsp;

&nbsp;

fait aussi la refont de la section question frequente