import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact & Résultats — CMEP Togo" },
      { name: "description", content: "500 jeunes formés par an, 60% d'insertion socio-économique, plateforme de mentorat durable — les résultats attendus du CMEP." },
      { property: "og:title", content: "Impact & Résultats — CMEP Togo" },
      { property: "og:description", content: "Découvrez l'impact mesurable du Chris Mentorship & Empowerment Program." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: ImpactPage,
});

const RESULTS = [
  { number: "500", suffix: "+", label: "Jeunes formés & mentorés / an", desc: "Entrepreneuriat, technique, numérique, leadership — un suivi rigoureux à chaque étape." },
  { number: "60", suffix: "%", label: "Taux d'insertion ciblé", desc: "Bénéficiaires en emploi ou ayant lancé une activité génératrice de revenus à 12 mois." },
  { number: "1", suffix: "", label: "Plateforme de mentorat", desc: "Opérationnelle et durable, mettant en relation mentors confirmés et jeunes talents." },
  { number: "10", suffix: "+", label: "Partenariats structurants", desc: "Institutions publiques, ONG internationales, universités, secteur privé local et diaspora." },
];

function ImpactPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-ngo-pearl border-b border-ngo-navy/5">
        <div className="max-w-7xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Impact & Résultats Attendus</span>
          <h1 className="font-extrabold text-5xl md:text-7xl mt-5 mb-8 leading-[1.02] tracking-tight text-ngo-navy max-w-4xl">
            Mesurer ce qui <span className="text-ngo-gold">compte</span> vraiment.
          </h1>
          <p className="text-lg text-ngo-slate leading-relaxed max-w-2xl">
            Le CMEP ne se mesure pas en activités, mais en vies transformées.
            Voici nos engagements chiffrés à l'horizon annuel.
          </p>
        </div>
      </section>

      {/* RESULTS GRID */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
          {RESULTS.map((r) => (
            <article
              key={r.label}
              className="group relative p-10 md:p-12 bg-ngo-navy text-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="absolute -top-8 -right-8 size-40 rounded-full bg-ngo-gold/10 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-7xl md:text-8xl font-black tabular-nums leading-none tracking-tight">{r.number}</span>
                  <span className="text-4xl font-black text-ngo-gold">{r.suffix}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold mb-3 leading-tight tracking-tight">{r.label}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section className="py-24 px-6 bg-ngo-pearl">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-2">
            <div className="size-14 rounded-2xl bg-ngo-navy text-white grid place-items-center">
              <ShieldCheck size={22} strokeWidth={2.2} />
            </div>
          </div>
          <div className="md:col-span-10">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Redevabilité</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ngo-navy mt-3 mb-5 leading-tight tracking-tight">
              Une approche fondée sur la preuve.
            </h2>
            <p className="text-ngo-slate text-base leading-relaxed">
              Chaque cohorte fait l'objet d'un suivi rigoureux à 3, 6 et 12 mois. Les indicateurs sont publiés
              dans notre rapport annuel d'impact, garantissant transparence et redevabilité envers nos partenaires
              et bénéficiaires.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-ngo-navy text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight tracking-tight">
            Recevoir le rapport d'impact.
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed">
            Indicateurs détaillés, méthodologie, cas d'études : disponible sur demande auprès de la coordination.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-8 py-4 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-md"
          >
            Demander le rapport <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
