## Problème

Après votre push local, l'aperçu affiche « This page didn't load ». L'erreur runtime :

```
Cannot find module '@supabase/supabase-js' imported from src/integrations/supabase/client.ts
```

Le fichier `src/integrations/supabase/client.ts` importe `@supabase/supabase-js`, mais ce package n'est pas listé dans `package.json` (donc absent de `node_modules`).

## Correction

1. Installer la dépendance manquante :
   ```
   bun add @supabase/supabase-js
   ```
2. Vérifier que l'aperçu se recharge sans l'erreur runtime.

Aucun changement de code applicatif — juste la dépendance manquante à réinstaller.