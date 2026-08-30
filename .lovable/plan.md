# Accès administrateur CMEP

Votre compte `beyeliakougnimdoupatrice13@gmail.com` existe déjà dans la base, mais il n'a encore aucun rôle : il faut lui attribuer le rôle `admin`, puis rendre l'accès au back-office simple pour vous et invisible pour le public.

## 1. Attribution du rôle administrateur

Migration qui ajoute le rôle `admin` à votre compte. Après ça, `/admin` s'ouvre normalement pour vous et reste refusé à tout autre compte.

## 2. Comment vous reconnecter (discret, non public)

- L'adresse `/auth` reste la porte d'entrée : vous vous y connectez avec votre email + mot de passe (ou Google). Aucun lien public n'y mène.
- Ajout d'un lien discret dans le pied de page, tout en bas de la ligne de copyright : un simple point/mot très sobre (« · » ou « Espace équipe ») en petit, sans mise en avant. Un visiteur ne le remarque pas, vous le retrouvez toujours.
- La page `/auth` reste en `noindex` (déjà le cas) pour ne pas apparaître dans Google.

## 3. Un accès visible seulement quand vous êtes connecté

- La barre de navigation affiche un bouton « Administration » **uniquement** si une session est active (état lu depuis la session, mis à jour à la connexion/déconnexion). Les visiteurs anonymes ne voient rien de plus qu'aujourd'hui.
- Ajout d'un bouton « Se déconnecter » dans le tableau de bord `/admin`, avec nettoyage propre de la session.
- Si vous ouvrez `/auth` alors que vous êtes déjà connecté, redirection directe vers `/admin`.

## Détails techniques

- Migration : `INSERT INTO public.user_roles (user_id, role) VALUES ('53b0e927-…','admin') ON CONFLICT DO NOTHING;`
- `src/components/site/Navigation.tsx` : état de session via `supabase.auth.getSession()` + `onAuthStateChange`, lien conditionnel vers `/admin` (desktop et menu mobile).
- `src/components/site/Footer.tsx` : lien sobre vers `/auth` dans la barre légale.
- `src/routes/auth.tsx` : redirection si session déjà présente.
- `src/routes/_authenticated/admin.index.tsx` : bouton de déconnexion (`cancelQueries` → `clear` → `signOut` → `navigate('/auth', replace)`).
