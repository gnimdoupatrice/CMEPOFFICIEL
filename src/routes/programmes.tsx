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
      <section className="pt-20 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6 bg-ngo-pearl border-b border-ngo-navy/5">
        <div className="max-w-7xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Nos axes d'intervention</span>
          <h1 className="font-extrabold text-4xl sm:text-h1 mt-5 mb-8 text-ngo-navy max-w-4xl">
            Cinq axes pour une <span className="text-ngo-gold">autonomisation</span> réelle.
          </h1>
          <p className="text-lg text-ngo-slate leading-relaxed max-w-2xl">
            Le CMEP intervient selon cinq axes stratégiques complémentaires, pensés pour répondre
            aux besoins des jeunes togolais de manière holistique et durable.
          </p>iit
        </div>
      </section>

      {/* AXES pppppppppp */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-5">
          {STRATEGIC_AXES.map((axis, i) => (
            <article
              key={axis.num}
              className="group grid md:grid-cols-12 gap-6 md:gap-8 p-8 sm:p-10 md:p-12 bg-ngo-pearl border border-ngo-navy/10 rounded-2xl hover:border-ngo-gold hover:shadow-2xl transition-all"
            >
              <div className="md:col-span-3 flex md:flex-col items-start gap-4">
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-ngo-gold tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-navy/50 mt-2">
                  Axe {i + 1}
                </span>
              </div>
              <div className="md:col-span-9">
                <h2 className="text-2xl md:text-3xl font-extrabold text-ngo-navy mb-4 leading-tight tracking-tight">
                  {axis.title}
                </h2>
                <p className="text-ngo-slate text-base leading-relaxed mb-6">{axis.desc}</p>
                <div className="flex flex-wrap gap-2 pt-5 border-t border-ngo-navy/10">
                  {["Formation", "Mentorat", "Suivi terrain"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold bg-white border border-ngo-navy/10 text-ngo-slate rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA cta cta cta */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-h2 font-extrabold text-ngo-navy mb-5 leading-tight tracking-tight">
            Prêt à rejoindre un axe d'intervention ?
          </h2>
          <p className="text-ngo-slate mb-10 leading-relaxed">
            Découvrez nos appels à candidatures ouverts dès aujourd'hui.
          </p>
          <Link
            to="/opportunites"
            className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-8 py-4 min-h-12 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-ngo-navy hover:text-white transition-colors"
          >
            Voir les opportunités <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
