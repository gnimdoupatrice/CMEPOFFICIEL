import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { STRATEGIC_AXES } from "@/lib/cmep-data";
import { ArrowRight, Target } from "lucide-react";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Axes stratégiques — CMEP Togo" },
      { name: "description", content: "Les cinq axes stratégiques du CMEP alignés sur six Objectifs de Développement Durable des Nations Unies." },
      { property: "og:title", content: "Axes stratégiques — CMEP Togo" },
      { property: "og:description", content: "Cinq axes, six ODD, une seule ambition : l'autonomisation de la jeunesse togolaise." },
      { property: "og:url", content: "/programmes" },
    ],
    links: [{ rel: "canonical", href: "/programmes" }],
  }),
  component: ProgrammesPage,
});

const SDGS = [
  { num: "04", label: "Éducation de qualité" },
  { num: "05", label: "Égalité entre les sexes" },
  { num: "08", label: "Travail décent & croissance" },
  { num: "10", label: "Inégalités réduites" },
  { num: "13", label: "Mesures climatiques" },
  { num: "17", label: "Partenariats" },
];

function ProgrammesPage() {
  return (
    <Layout>
      {/* HERO pp*/}
      <section className="pt-20 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6 bg-ngo-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Nos axes d'intervention</span>
          <h1 className="font-extrabold text-4xl sm:text-h1 mt-5 mb-8 text-white max-w-4xl">
            Cinq axes pour une <span className="text-ngo-gold">autonomisation</span> réelle.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Le CMEP intervient selon cinq axes stratégiques complémentaires, pensés pour répondre
            aux besoins des jeunes togolais de manière holistique et durable.
          </p>
        </div>
      </section>

      {/* AXES pppppppppp */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-5">
          {STRATEGIC_AXES.map((axis, i) => {
            const dark = i % 2 === 1;
            return (
            <article
              key={axis.num}
              className={`group grid md:grid-cols-12 gap-6 md:gap-8 p-8 sm:p-10 md:p-12 rounded-2xl hover:border-ngo-gold hover:shadow-2xl transition-all ${
                dark
                  ? "bg-ngo-navy border border-white/10"
                  : "bg-ngo-pearl border border-ngo-navy/10"
              }`}
            >
              <div className="md:col-span-3 flex md:flex-col items-start gap-4">
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-ngo-gold tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`inline-block text-[10px] uppercase tracking-[0.25em] font-bold mt-2 ${dark ? "text-white/50" : "text-ngo-navy/50"}`}>
                  Axe {i + 1}
                </span>
              </div>
              <div className="md:col-span-9">
                <h2 className={`text-2xl md:text-3xl font-extrabold mb-4 leading-tight tracking-tight ${dark ? "text-white" : "text-ngo-navy"}`}>
                  {axis.title}
                </h2>
                <p className={`text-base leading-relaxed mb-6 ${dark ? "text-white/70" : "text-ngo-slate"}`}>{axis.desc}</p>
                <div className={`flex flex-wrap gap-2 pt-5 border-t ${dark ? "border-white/10" : "border-ngo-navy/10"}`}>
                  {["Formation", "Mentorat", "Suivi terrain"].map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-md border ${
                        dark
                          ? "bg-white/5 border-white/15 text-white/70"
                          : "bg-white border-ngo-navy/10 text-ngo-slate"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      {/* CTA cta  hhgg */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-ngo-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-h2 font-extrabold text-white mb-5 leading-tight tracking-tight">
            Prêt à rejoindre un axe d'intervention ?
          </h2>
          <p className="text-white/70 mb-10 leading-relaxed">
            Découvrez nos appels à candidatures ouverts dès aujourd'hui.
          </p>
          <Link
            to="/opportunites"
            className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-8 py-4 min-h-12 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-white transition-colors"
          >
            Voir les opportunités <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
