import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowRight, Target, Compass, Sparkles, MapPin, Users } from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref } from "@/lib/contact";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — CMEP Togo" },
      { name: "description", content: "Origine, vision, mission, objectifs et équipe du Chris Mentorship & Empowerment Program (CMEP)." },
      { property: "og:title", content: "À propos — CMEP Togo" },
      { property: "og:description", content: "Découvrez l'histoire, la mission et l'équipe du CMEP." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

const OBJECTIVES = [
  "Développer les capacités entrepreneuriales et techniques des jeunes.",
  "Promouvoir le mentorat intergénérationnel et la citoyenneté active.",
  "Créer des opportunités d'emploi et de réseautage.",
  "Contribuer au développement durable local.",
];

function AboutPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-20 px-4 sm:px-6 bg-ngo-pearl border-b border-ngo-navy/5">
        <div className="max-w-7xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">À propos du CMEP</span>
          <h1 className="font-extrabold text-4xl sm:text-h1 mt-5 mb-8 text-ngo-navy max-w-4xl">
            Une initiative née du terrain, portée par la <span className="text-ngo-gold">jeunesse</span>.
          </h1>
          <p className="text-lg text-ngo-slate leading-relaxed max-w-2xl">
            Le Chris Mentorship & Empowerment Program (CMEP) est une initiative collective portée par un réseau de jeunes leaders togolais.
            Elle vise à renforcer l'autonomisation, les compétences et l'insertion socio-économique des jeunes à travers des formations
            pratiques, du mentorat et des actions communautaires.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Compass, eyebrow: "Notre Vision", title: "Une jeunesse togolaise outillée, autonome et engagée.", body: "Compétences, habilitation, résilience, insertion socio-économique. Une génération qui ne subit plus, mais qui bâtit le développement durable de son pays." },
            { icon: Target, eyebrow: "Notre Mission", title: "Renforcer compétences, résilience et employabilité.", body: "Le CMEP se propose de renforcer les capacités des jeunes togolais à travers le mentorat intergénérationnel, la formation pratique et l'engagement communautaire." },
          ].map((b) => (
            <article key={b.eyebrow} className="p-10 md:p-12 bg-ngo-pearl border border-ngo-navy/5 rounded-2xl">
              <div className="size-12 rounded-xl bg-ngo-navy text-white grid place-items-center mb-8">
                <b.icon size={20} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">{b.eyebrow}</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ngo-navy mt-3 mb-5 leading-tight tracking-tight">{b.title}</h2>
              <p className="text-ngo-slate leading-relaxed text-[15px]">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* NOTRE ÉQUIPE */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-ngo-pearl border-y border-ngo-navy/5" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold mb-4">
              <Users size={12} aria-hidden="true" /> Notre équipe
            </div>
            <h2 id="team-heading" className="text-h2 font-extrabold text-ngo-navy">
              Une gouvernance jeune, engagée, au service du Togo.
            </h2>
            <p className="mt-5 text-ngo-slate leading-relaxed">
              Dix membres portent l'exécutif du CMEP, répartis entre direction, secrétariat,
              communication et économat. Une équipe pluridisciplinaire au service d'une seule
              ambition — l'autonomisation de la jeunesse togolaise.
            </p>
          </div>

          <TeamGrid />

          {/* Contact coordination */}
          <div className="mt-16 grid gap-6 md:grid-cols-12 items-center p-8 sm:p-10 bg-white border border-ngo-navy/10 rounded-3xl">
            <div className="md:col-span-3 flex justify-center">
              <img
                src={CMEP_MEDIA.logo}
                alt="Logo CMEP"
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="size-24 rounded-2xl object-cover ring-1 ring-ngo-navy/10"
              />
            </div>
            <div className="md:col-span-9 text-center md:text-center">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">
                Contacter la coordination
              </span>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-ngo-navy font-medium">
                <a href={CMEP_PHONE_HREF} className="hover:text-ngo-gold transition-colors">
                  {CMEP_PHONE_DISPLAY}
                </a>
                <a href={`mailto:${CMEP_EMAIL}`} className="break-all hover:text-ngo-gold transition-colors">
                  {CMEP_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Objectifs spécifiques</span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">Quatre engagements concrets.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {OBJECTIVES.map((obj, i) => (
              <article key={i} className="group flex gap-6 p-8 bg-ngo-pearl border border-ngo-navy/10 rounded-2xl hover:border-ngo-gold hover:shadow-xl transition-all">
                <span className="text-3xl font-black text-ngo-gold tabular-nums shrink-0 leading-none pt-1">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base text-ngo-navy leading-relaxed font-medium pt-0.5">{obj}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ANCRAGE NATIONAL */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-ngo-pearl">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center p-8 sm:p-10 md:p-14 bg-ngo-navy rounded-3xl text-white">
            <div className="md:col-span-2">
              <div className="size-14 rounded-2xl bg-ngo-gold text-ngo-navy grid place-items-center">
                <MapPin size={22} strokeWidth={2.4} aria-hidden="true" />
              </div>
            </div>
            <div className="md:col-span-10">
              <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Ancrage national</span>
              <h2 className="text-2xl sm:text-h2 font-extrabold mt-3 mb-4 leading-tight tracking-tight">
                Un programme togolais, pensé pour passer à l'échelle.
              </h2>
              <p className="text-white/70 leading-relaxed">
                Nos actions s'inscrivent dans une dynamique nationale : former, mentorer et connecter les jeunes
                partout où les besoins d'accompagnement, d'emploi et de leadership sont prioritaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="mx-auto text-ngo-gold mb-6" size={28} aria-hidden="true" />
          <h2 className="text-h2 font-extrabold text-ngo-navy mb-5 leading-tight tracking-tight">
            Rejoignez l'écosystème CMEP.
          </h2>
          <p className="text-ngo-slate mb-10 leading-relaxed">
            Jeune talent, mentor, partenaire institutionnel : il y a une place pour vous dans cette aventure collective.
          </p>
          <a
            href={createWhatsAppHref("Bonjour CMEP, je souhaite rejoindre l’écosystème CMEP.")}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-8 py-4 min-h-12 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform rounded-md"
          >
            Nous contacter <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
