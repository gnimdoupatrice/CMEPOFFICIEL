import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import {
  ArrowUpRight,
  MapPin,
  Flame,
  FileText,
  Wallet,
  Download,
  ArrowLeft,
} from "lucide-react";
import { createWhatsAppHref } from "@/lib/contact";
import { getPublishedOpportunity } from "@/lib/opportunities.functions";
import {
  applyHref,
  badgeLabel,
  categoryLabel,
  coverFor,
  formatAmount,
  formatDate,
  formatSessionDates,
  type PublicOpportunity,
} from "@/lib/opportunities";

const detailQuery = (slug: string) =>
  queryOptions({
    queryKey: ["opportunities", "detail", slug],
    queryFn: () => getPublishedOpportunity({ data: { slug } }),
  });

export const Route = createFileRoute("/opportunites/$slug/")({
  loader: async ({ context, params }) => {
    const result = await context.queryClient.ensureQueryData(detailQuery(params.slug));
    if (!result.opportunity) throw notFound();
    return result;
  },
  head: ({ loaderData }) => {
    const o = loaderData?.opportunity;
    if (!o) {
      return {
        meta: [{ title: "Opportunité introuvable — CMEP Togo" }, { name: "robots", content: "noindex" }],
      };
    }
    const description = (o.short_description || o.description || "Programme CMEP").slice(0, 155);
    return {
      meta: [
        { title: `${o.title} — CMEP Togo`.slice(0, 60) },
        { name: "description", content: description },
        { property: "og:title", content: `${o.title} — CMEP Togo` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold text-ngo-navy">Cette opportunité n'est plus disponible.</h1>
        <Link to="/opportunites" className="mt-6 inline-block text-ngo-gold font-bold uppercase text-[11px] tracking-[0.2em]">
          Voir toutes les opportunités
        </Link>
      </section>
    </Layout>
  ),
  component: OpportunityDetailPage,
});

const badgeStyles: Record<string, string> = {
  a_la_une: "bg-ngo-gold text-ngo-navy",
  inscriptions_ouvertes: "bg-emerald-500 text-white",
  cloture: "bg-white/90 text-ngo-navy",
};

function ApplyLink({ o, className, children }: { o: PublicOpportunity; className: string; children: React.ReactNode }) {
  if (o.application_mode === "form") {
    return (
      <Link to="/opportunites/$slug/candidater" params={{ slug: o.slug }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={applyHref(o)} target="_blank" rel="noreferrer noopener" className={className}>
      {children}
    </a>
  );
}

function OpportunityDetailPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(detailQuery(slug));
  const p = data.opportunity as PublicOpportunity;

  return (
    <Layout>
      <section className="bg-white pt-20 sm:pt-24 pb-4 px-4 sm:px-6 border-b border-ngo-navy/8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-slate">
          <Link to="/" className="hover:text-ngo-gold">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/opportunites" className="hover:text-ngo-gold">Opportunités</Link>
          <span aria-hidden="true">/</span>
          <span className="text-ngo-navy normal-case tracking-normal">{p.title}</span>
        </div>
      </section>

      <section className="bg-ngo-pearl/40 py-10 sm:py-14 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <article className="grid lg:grid-cols-12 gap-6 md:gap-10 items-start bg-white rounded-2xl p-4 sm:p-6 md:p-8 ring-1 ring-ngo-navy/8">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-ngo-pearl ring-1 ring-ngo-navy/10 shadow-xl">
                <img
                  src={coverFor(p)}
                  alt={`Affiche — ${p.title}`}
                  className="absolute inset-0 size-full object-contain p-3"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] font-extrabold rounded ${
                      badgeStyles[p.badge ?? "inscriptions_ouvertes"] ?? "bg-emerald-500 text-white"
                    }`}
                  >
                    {badgeLabel(p.badge)}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0">
              <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold">
                {categoryLabel(p.category)}
              </span>
              <h1 className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-ngo-navy leading-[1.1] tracking-tight break-words">
                {p.title}
              </h1>
              <p className="mt-2 text-ngo-navy/60 text-[13px] sm:text-sm font-medium">{p.short_description}</p>
              {p.description && (
                <p className="mt-4 text-ngo-slate leading-relaxed text-[14px] sm:text-[15px] whitespace-pre-line">{p.description}</p>
              )}

              {p.sessions.length > 0 && (
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {p.sessions.map((s, idx) => (
                    <div key={`${s.location}-${idx}`} className="p-4 bg-ngo-pearl border border-ngo-navy/10 rounded-xl">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ngo-slate font-bold">
                        <MapPin size={12} className="text-ngo-gold" aria-hidden="true" /> {s.location}
                      </div>
                      <div className="mt-2 font-extrabold text-ngo-navy text-sm">{formatSessionDates(s)}</div>
                      {s.venue && <div className="mt-1 text-[12px] text-ngo-slate leading-snug break-words">{s.venue}</div>}
                    </div>
                  ))}
                </div>
              )}

              {p.registration_deadline && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-ngo-gold/15 border border-ngo-gold/30 text-ngo-navy rounded-md text-[12px] font-bold">
                  <Flame size={13} className="text-ngo-gold" aria-hidden="true" /> Clôture des inscriptions :{" "}
                  {formatDate(p.registration_deadline)}
                </div>
              )}

              {p.modules.length > 0 && (
                <div className="mt-7">
                  <h2 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy mb-4 flex items-center gap-2">
                    <FileText size={13} className="text-ngo-gold" aria-hidden="true" /> Contenu — {p.modules.length} modules
                  </h2>
                  <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {p.modules.map((m, idx) => (
                      <li key={`${m.title}-${idx}`} className="flex items-start gap-3 text-[13px] sm:text-[13.5px] text-ngo-navy leading-snug">
                        <span className="shrink-0 mt-0.5 size-5 rounded-full bg-ngo-navy/5 text-ngo-navy text-[10px] font-extrabold grid place-items-center tabular-nums">
                          {idx + 1}
                        </span>
                        <span className="break-words">{m.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {p.pricing.length > 0 && (
                <div className="mt-7">
                  <h2 className="text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-navy mb-4 flex items-center gap-2">
                    <Wallet size={13} className="text-ngo-gold" aria-hidden="true" /> Frais de participation
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {p.pricing.map((pr, idx) => (
                      <li
                        key={`${pr.profile}-${idx}`}
                        className="flex items-center justify-between gap-3 px-4 py-3 bg-ngo-navy text-white rounded-lg"
                      >
                        <span className="text-[12px] font-medium text-white/80 leading-snug break-words min-w-0">{pr.profile}</span>
                        <span className="font-extrabold text-ngo-gold whitespace-nowrap tabular-nums">{formatAmount(pr.amount)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-7 flex flex-wrap gap-2 sm:gap-3">
                <ApplyLink
                  o={p}
                  className="inline-flex items-center gap-2 bg-ngo-navy text-white px-5 sm:px-6 py-3 min-h-11 font-bold uppercase tracking-widest text-[11px] hover:bg-ngo-gold hover:text-ngo-navy transition-colors rounded-md"
                >
                  Candidater <ArrowUpRight size={13} aria-hidden="true" />
                </ApplyLink>
                <a
                  href={coverFor(p)}
                  download
                  className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 sm:px-5 py-3 min-h-11 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                >
                  <Download size={13} aria-hidden="true" /> Affiche
                </a>
                <a
                  href={createWhatsAppHref(`Bonjour CMEP, j’ai une question sur « ${p.title} ».`)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 border border-ngo-navy/15 text-ngo-navy px-4 sm:px-5 py-3 min-h-11 font-bold uppercase tracking-widest text-[11px] hover:border-ngo-gold transition-colors rounded-md"
                >
                  Question
                </a>
              </div>
            </div>
          </article>

          <Link
            to="/opportunites"
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ngo-navy hover:text-ngo-gold"
          >
            <ArrowLeft size={13} aria-hidden="true" /> Toutes les opportunités
          </Link>
        </div>
      </section>
    </Layout>
  );
}
