import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowRight, Target, Compass, Sparkles, MapPin, Users } from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref, CMEP_EMAIL, CMEP_PHONE_DISPLAY, CMEP_PHONE_HREF } from "@/lib/contact";
import { TeamGrid, CARD_BASE, EYEBROW } from "@/components/site/TeamGrid";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — CMEP Togo" },
      {
        name: "description",
        content:
          "Origine, vision, mission, objectifs et équipe du Chris Mentorship & Empowerment Program (CMEP).",
      },
      { property: "og:title", content: "À propos — CMEP Togo" },
      {
        property: "og:description",
        content: "Découvrez l'histoire, la mission et l'équipe du CMEP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      {/* HERO — navy plein écran, comme les sections sombres de l'accueil */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-20 md:pb-28 px-4 sm:px-6 bg-gradient-to-b from-ngo-navy via-ngo-navy to-[color-mix(in_oklab,var(--color-ngo-navy)_92%,black)] text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[42rem] rounded-full bg-ngo-gold/15 blur-3xl"
        />
        <Reveal className="relative max-w-4xl mx-auto text-center [&_*]:text-center!">
          <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold">À propos du CMEP</span>
          <h1 className="font-extrabold text-4xl sm:text-h1 mt-5 mb-6 text-white! leading-[1.03] tracking-tight">
            Une initiative née du terrain, portée par la{" "}
            <span className="relative text-ngo-gold">jeunesse</span>.
          </h1>
          <span aria-hidden="true" className="mx-auto mb-8 block w-28 rule-gold" />
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto editorial-body">
            Le Chris Mentorship &amp; Empowerment Program (CMEP) est une initiative collective
            portée par un réseau de jeunes leaders togolais. Elle vise à renforcer l'autonomisation,
            les compétences et l'insertion socio-économique des jeunes à travers des formations
            pratiques, du mentorat et des actions communautaires.
          </p>
        </Reveal>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
          {[
            {
              icon: Compass,
              eyebrow: "Notre Vision",
              title: "Une jeunesse togolaise outillée, autonome et engagée.",
              body: "Compétences, habilitation, résilience, insertion socio-économique. Une génération qui ne subit plus, mais qui bâtit le développement durable de son pays.",
            },
            {
              icon: Target,
              eyebrow: "Notre Mission",
              title: "Renforcer compétences, résilience et employabilité.",
              body: "Le CMEP se propose de renforcer les capacités des jeunes togolais à travers le mentorat intergénérationnel, la formation pratique et l'engagement communautaire.",
            },
          ].map((b, i) => (
            <Reveal
              key={b.eyebrow}
              delay={i * 120}
              className="basis-full md:basis-[calc(50%-0.75rem)] min-w-0"
            >
              <article
                className={`group h-full p-10 md:p-12 bg-white text-center [&_*]:text-center! ${CARD_BASE}`}
              >
                <div className="size-14 rounded-2xl bg-ngo-navy text-white grid place-items-center mb-8 mx-auto shadow-[0_16px_30px_-18px_rgba(15,42,95,0.7)] transition-transform duration-500 group-hover:-translate-y-1">
                  <b.icon size={22} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <span className={EYEBROW}>{b.eyebrow}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ngo-navy mt-3 mb-5 leading-tight tracking-tight">
                  {b.title}
                </h2>
                <span aria-hidden="true" className="mx-auto mb-5 block w-16 rule-gold" />
                <p className="text-ngo-slate leading-relaxed text-[15px] editorial-body">{b.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NOTRE ÉQUIPE — alternance bleu/blanc par sous-section */}
      <section className="relative" aria-labelledby="team-heading">
        <div className="relative overflow-hidden bg-gradient-to-b from-ngo-navy via-ngo-navy to-[color-mix(in_oklab,var(--color-ngo-navy)_94%,black)] text-white py-20 md:py-24 px-4 sm:px-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-[-8%] size-96 rounded-full bg-ngo-gold/15 blur-3xl"
          />
          <Reveal className="relative max-w-3xl mx-auto text-center [&_*]:text-center!">
            <div className="inline-flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold">
              <Users size={12} aria-hidden="true" /> Notre équipe
            </div>
            <h2
              id="team-heading"
              className="text-h2 font-extrabold text-white! leading-[1.05] tracking-tight"
            >
              Une gouvernance jeune, engagée, au service du Togo.
            </h2>
            <span aria-hidden="true" className="mx-auto mt-6 block w-24 rule-gold" />
            <p className="mt-5 text-white/80 leading-relaxed editorial-body">
              Dix membres portent l'exécutif du CMEP, répartis entre direction, secrétariat,
              communication et économat. Une équipe pluridisciplinaire au service d'une seule
              ambition — l'autonomisation de la jeunesse togolaise.
            </p>
          </Reveal>
        </div>

        <TeamGrid />


          {/* Contact coordination — poursuit la bande navy du pôle Économat */}
        <div className="bg-gradient-to-b from-[color-mix(in_oklab,var(--color-ngo-navy)_94%,black)] to-ngo-navy px-4 sm:px-6 pt-4 pb-20 md:pb-24">
          <Reveal>
            <div
              className={`max-w-7xl mx-auto grid gap-6 md:grid-cols-12 items-center p-8 sm:p-10 bg-white ${CARD_BASE}`}
            >

              <div className="md:col-span-3 flex justify-center">
                <img
                  src={CMEP_MEDIA.logo}
                  alt="Logo CMEP"
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="size-24 rounded-2xl object-cover ring-1 ring-ngo-navy/10 shadow-[0_18px_40px_-24px_rgba(15,42,95,0.6)]"
                />
              </div>
              <div className="md:col-span-9 text-center [&_*]:text-center!">
                <span className={EYEBROW}>Contacter la coordination</span>
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-ngo-navy font-medium">
                  <a href={CMEP_PHONE_HREF} className="hover:text-ngo-gold-ink transition-colors">
                    {CMEP_PHONE_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${CMEP_EMAIL}`}
                    className="break-all hover:text-ngo-gold-ink transition-colors"
                  >
                    {CMEP_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OBJECTIFS */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="max-w-3xl mx-auto text-center [&_*]:text-center! mb-14">
            <span className={EYEBROW}>Objectifs spécifiques</span>
            <h2 className="text-h2 font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Quatre engagements concrets.
            </h2>
            <span aria-hidden="true" className="mx-auto mt-6 block w-20 rule-gold" />
          </Reveal>
          <div className="flex flex-wrap justify-center gap-6">
            {OBJECTIVES.map((obj, i) => (
              <Reveal
                key={i}
                delay={i * 90}
                className="basis-full md:basis-[calc(50%-0.75rem)] min-w-0"
              >
                <article className={`h-full flex gap-6 p-8 bg-white ${CARD_BASE}`}>
                  <span className="text-4xl font-black tabular-nums shrink-0 leading-none pt-1 bg-gradient-to-b from-ngo-gold to-ngo-gold-ink bg-clip-text text-transparent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base text-ngo-navy leading-relaxed font-medium pt-0.5 editorial-body">
                    {obj}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANCRAGE NATIONAL — section plein écran navy, comme sur l'accueil */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-ngo-navy via-ngo-navy to-[color-mix(in_oklab,var(--color-ngo-navy)_92%,black)] text-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[-10%] size-[30rem] rounded-full bg-ngo-gold/15 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-[-10%] size-[26rem] rounded-full bg-ngo-gold/10 blur-3xl"
        />
        <div className="relative max-w-4xl mx-auto">
          <Reveal className="text-center [&_*]:text-center!">
            <div className="size-14 rounded-2xl bg-ngo-gold text-ngo-navy grid place-items-center mx-auto mb-8 shadow-[0_18px_40px_-16px_rgba(212,162,60,0.85)]">
              <MapPin size={22} strokeWidth={2.4} aria-hidden="true" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold">
              Ancrage national
            </span>
            <h2 className="text-2xl sm:text-h2 font-extrabold mt-3 mb-5 leading-tight tracking-tight text-white!">
              Un programme togolais, pensé pour passer à l'échelle.
            </h2>
            <span aria-hidden="true" className="mx-auto mb-6 block w-20 rule-gold" />
            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto editorial-body">
              Nos actions s'inscrivent dans une dynamique nationale : former, mentorer et
              connecter les jeunes partout où les besoins d'accompagnement, d'emploi et de
              leadership sont prioritaires.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className={`p-10 sm:p-12 bg-white text-center [&_*]:text-center! ${CARD_BASE}`}>
              <Sparkles className="mx-auto text-ngo-gold-ink mb-6" size={28} aria-hidden="true" />
              <span className={EYEBROW}>Rejoindre le CMEP</span>
              <h2 className="text-h2 font-extrabold text-ngo-navy mt-3 mb-5 leading-tight tracking-tight">
                Rejoignez l'écosystème CMEP.
              </h2>
              <p className="text-ngo-slate mb-10 leading-relaxed max-w-xl mx-auto editorial-body">
                Jeune talent, mentor, partenaire institutionnel : il y a une place pour vous dans
                cette aventure collective.
              </p>
              <a
                href={createWhatsAppHref("Bonjour CMEP, je souhaite rejoindre l’écosystème CMEP.")}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-gold inline-flex items-center gap-2 px-9 py-4 min-h-12 font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Nous contacter <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
