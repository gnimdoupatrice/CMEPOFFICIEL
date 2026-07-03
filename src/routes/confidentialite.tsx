import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — CMEP Togo" },
      { name: "description", content: "Politique de confidentialité et de protection des données personnelles du CMEP." },
    ],
    links: [{ rel: "canonical", href: "/confidentialite" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Layout>
      <section className="pt-20 md:pt-24 pb-24 px-4 sm:px-6 bg-ngo-pearl">
        <div className="max-w-3xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Protection des données</span>
          <h1 className="font-extrabold text-4xl md:text-6xl mt-5 mb-10 leading-[1.05] tracking-tight text-ngo-navy">
            Politique de confidentialité
          </h1>
          <div className="prose prose-slate max-w-none text-ngo-slate leading-relaxed space-y-6">
            <p>Le CMEP accorde une importance particulière au respect de la vie privée des utilisateurs de son site.</p>
            <h2 className="text-ngo-navy font-bold text-xl">1. Données collectées</h2>
            <p>Nous collectons uniquement les données nécessaires au traitement de vos candidatures, à la gestion de la newsletter et à la communication institutionnelle.</p>
            <h2 className="text-ngo-navy font-bold text-xl">2. Finalités</h2>
            <p>Vos données servent exclusivement à répondre à vos demandes, à vous informer des opportunités du programme et à assurer le suivi post-formation des bénéficiaires.</p>
            <h2 className="text-ngo-navy font-bold text-xl">3. Vos droits</h2>
            <p>Conformément aux bonnes pratiques internationales, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contact : <a className="text-ngo-navy underline hover:text-ngo-gold" href="mailto:chrismentorshipempowermentprog@gmail.com">chrismentorshipempowermentprog@gmail.com</a>.</p>
            <h2 className="text-ngo-navy font-bold text-xl">4. Cookies</h2>
            <p>Ce site n'utilise que des cookies techniques essentiels au bon fonctionnement du service. Aucun traceur publicitaire n'est déployé.</p>
          </div>
          <Link to="/" className="mt-12 inline-flex items-center gap-2 text-ngo-navy font-bold text-[12px] uppercase tracking-widest hover:text-ngo-gold">
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </Layout>
  );
}
