import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { STRATEGIC_AXES } from "@/lib/cmep-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "Programmes & Axes Stratégiques — CMEP Togo" },
      { name: "description", content: "Les cinq axes stratégiques du CMEP : entrepreneuriat, formation technique, leadership, innovation numérique, citoyenneté et écologie." },
      { property: "og:title", content: "Programmes & Axes Stratégiques — CMEP Togo" },
      { property: "og:description", content: "Découvrez les cinq axes d'intervention du CMEP pour l'autonomisation des jeunes." },
      { property: "og:url", content: "/programmes" },
    ],
    links: [{ rel: "canonical", href: "/programmes" }],
  }),
  component: ProgrammesPage,
});

function ProgrammesPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-ngo-pearl border-b border-ngo-navy/5">
        <div className="max-w-7xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Nos Programmes</span>
          <h1 className="font-extrabold text-5xl md:text-7xl mt-5 mb-8 leading-[1.02] tracking-tight text-ngo-navy max-w-4xl">
            Cinq axes pour une <span className="text-ngo-gold">autonomisation</span> réelle.
          </h1>
          <p className="text-lg text-ngo-slate leading-relaxed max-w-2xl">
            Le CMEP intervient selon cinq axes stratégiques complémentaires, pensés pour répondre
            aux besoins des jeunes togolais de manière holistique et durable.
          </p>
        </div>
      </section>

      {/* AXES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-5">
          {STRATEGIC_AXES.map((axis, i) => (
            <article
              key={axis.num}
              className="group grid md:grid-cols-12 gap-8 p-10 md:p-12 bg-ngo-pearl border border-ngo-navy/10 rounded-2xl hover:border-ngo-gold hover:shadow-2xl transition-all"
            >
              <div className="md:col-span-3 flex md:flex-col items-start gap-4">
                <span className="text-6xl md:text-7xl font-black text-ngo-gold tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-navy/50">
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

      {/* CTA */}
      
    </Layout>
  );
}
