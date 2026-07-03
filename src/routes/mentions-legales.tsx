import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — CMEP Togo" },
      { name: "description", content: "Mentions légales du site du Chris Mentorship & Empowerment Program (CMEP)." },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <Layout>
      <section className="pt-20 md:pt-24 pb-24 px-4 sm:px-6 bg-ngo-pearl">
        <div className="max-w-3xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Informations légales</span>
          <h1 className="font-extrabold text-4xl md:text-6xl mt-5 mb-10 leading-[1.05] tracking-tight text-ngo-navy">
            Mentions légales
          </h1>
          <div className="prose prose-slate max-w-none text-ngo-slate leading-relaxed space-y-6">
            <p><strong className="text-ngo-navy">Éditeur du site :</strong> Chris Mentorship & Empowerment Program (CMEP), initiative togolaise de mentorat et d'autonomisation de la jeunesse.</p>
            <p><strong className="text-ngo-navy">Coordination :</strong> Kara, Togo.</p>
            <p><strong className="text-ngo-navy">Contact :</strong> <a className="text-ngo-navy underline hover:text-ngo-gold" href="mailto:chrismentorshipempowermentprog@gmail.com">chrismentorshipempowermentprog@gmail.com</a> — +228 90 51 00 88</p>
            <p><strong className="text-ngo-navy">Hébergement :</strong> Les contenus de ce site sont hébergés par une infrastructure cloud sécurisée conforme aux standards internationaux.</p>
            <p><strong className="text-ngo-navy">Propriété intellectuelle :</strong> l'ensemble des contenus (textes, images, marques, logos) est protégé. Toute reproduction, même partielle, sans autorisation écrite préalable, est interdite.</p>
            <p><strong className="text-ngo-navy">Responsabilité :</strong> le CMEP s'efforce d'assurer l'exactitude des informations diffusées mais ne saurait être tenu responsable d'erreurs ou d'omissions.</p>
          </div>
          <Link to="/" className="mt-12 inline-flex items-center gap-2 text-ngo-navy font-bold text-[12px] uppercase tracking-widest hover:text-ngo-gold">
            ← Retour à l'accueil
          </Link>
        </div>
      </section>
    </Layout>
  );
}
