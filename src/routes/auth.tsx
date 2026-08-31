import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? (search["redirect"] as string) : "/admin",
  }),
  head: () => ({
    meta: [
      { title: "Espace administration — CMEP Togo" },
      { name: "description", content: "Connexion à l'espace d'administration du portail CMEP." },
      { property: "og:title", content: "Espace administration — CMEP Togo" },
      { property: "og:description", content: "Connexion réservée à la coordination CMEP." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const target = search.redirect.startsWith("/") ? search.redirect : "/admin";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: target, replace: true });
    });
  }, [navigate, target]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}${target}` },
        });
        if (error) throw error;
        setMessage("Compte créé. Vous pouvez maintenant vous connecter.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: target });
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setMessage("Connexion Google indisponible.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: target });
  }

  return (
    <Layout>
      <section className="bg-ngo-pearl/50 min-h-[70vh] grid place-items-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-ngo-navy/8 shadow-sm">
          <span className="inline-flex items-center gap-2 text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
            <Lock size={11} aria-hidden="true" /> Espace coordination
          </span>
          <h1 className="mt-3 text-2xl font-extrabold text-ngo-navy tracking-tight">
            {mode === "signin" ? "Connexion administration" : "Créer un compte administrateur"}
          </h1>
          <p className="mt-2 text-[13px] text-ngo-slate leading-relaxed">
            Accès réservé à l'équipe CMEP pour gérer les opportunités et les candidatures.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" required minLength={6} maxLength={72} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {message && <p className="text-[12.5px] font-semibold text-ngo-navy">{message}</p>}
            <Button type="submit" disabled={loading} className="w-full bg-ngo-navy text-white hover:bg-ngo-gold hover:text-ngo-navy font-bold uppercase tracking-widest text-[11px]">
              {loading ? "Patientez…" : mode === "signin" ? "Se connecter" : "Créer le compte"}
            </Button>
          </form>

          <Button type="button" variant="outline" onClick={handleGoogle} className="mt-3 w-full border-ngo-navy/15 font-bold uppercase tracking-widest text-[11px]">
            Continuer avec Google
          </Button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-5 text-[12px] font-bold text-ngo-navy hover:text-ngo-gold"
          >
            {mode === "signin" ? "Pas encore de compte ? Créer un compte" : "J'ai déjà un compte — me connecter"}
          </button>
        </div>
      </section>
    </Layout>
  );
}
