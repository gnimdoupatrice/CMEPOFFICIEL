import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowLeft, ArrowUpRight, MapPin, CalendarDays, Tag, ArrowRight } from "lucide-react";
import { mergeEditorialArticles, type EditorialArticle } from "@/lib/editorial";
import { listPublishedArticles } from "@/lib/articles.functions";

export const Route = createFileRoute("/impact/$id")({
  loader: async ({ params }) => {
    let published: EditorialArticle[] = [];
    try {
      published = (await listPublishedArticles()).articles as unknown as EditorialArticle[];
    } catch {
      published = [];
    }
    const all = mergeEditorialArticles(published);
    const article = all.find((a) => a.id === params.id);
    if (!article) throw notFound();
    return { article, all };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — Retours d'activités CMEP` : "Retour d'activité — CMEP";
    const description = a?.excerpt ?? "Compte rendu d'une activité menée par le CMEP au Togo.";
    return {
      meta: [
        { title: title.slice(0, 70) },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title.slice(0, 70) },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article, all } = Route.useLoaderData();
  const others = all.filter((a) => a.id !== article.id).slice(0, 3);
  const paragraphs = article.body.filter((b) => b.type === "p");
  const pullQuote = paragraphs.length > 2 ? (paragraphs[paragraphs.length - 1] as { text: string }).text : null;

  return (
    <Layout>
      {/* Bandeau éditorial */}
      <header className="relative bg-ngo-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            style={{ objectPosition: article.focal ?? "center" }}
            className="size-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/85 to-ngo-navy/60" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-10 sm:pb-16">
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-white/70 hover:text-ngo-gold transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Tous les retours d'activités
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
            <span className="bg-ngo-gold text-ngo-navy px-2.5 py-1 rounded">{article.category}</span>
            <span className="text-white/60">Activité réalisée</span>
          </div>

          <h1 className="mt-5 font-serif text-[27px] sm:text-4xl md:text-[46px] font-black leading-[1.1] tracking-tight">
            {article.title}
          </h1>

          <p className="mt-5 text-[15px] sm:text-lg leading-relaxed text-white/80 max-w-2xl">
            {article.excerpt}
          </p>

          <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/70">
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} aria-hidden="true" /> {article.date}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" /> {article.location}</span>
            <span className="inline-flex items-center gap-1.5"><Tag size={13} aria-hidden="true" /> CMEP</span>
          </div>
        </div>
      </header>

      <article className="bg-white">
        {/* Photo principale */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10 relative z-10">
          <figure className="m-0">
            <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-ngo-pearl shadow-xl">
              <img
                src={article.image}
                alt={article.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{ objectPosition: article.focal ?? "center" }}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[11px] sm:text-[12px] text-ngo-slate italic">
              {article.location} — {article.date}. Photo : CMEP.
            </figcaption>
          </figure>
        </div>

        {/* Corps + rail */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 grid lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="lg:sticky lg:top-28 border-l-2 border-ngo-gold pl-4">
              <h2 className="text-[10px] uppercase tracking-[0.24em] font-bold text-ngo-navy mb-3">En bref</h2>
              <dl className="space-y-3 text-[12.5px]">
                <div>
                  <dt className="text-ngo-slate">Date</dt>
                  <dd className="font-semibold text-ngo-navy">{article.date}</dd>
                </div>
                <div>
                  <dt className="text-ngo-slate">Lieu</dt>
                  <dd className="font-semibold text-ngo-navy">{article.location}</dd>
                </div>
                <div>
                  <dt className="text-ngo-slate">Format</dt>
                  <dd className="font-semibold text-ngo-navy">{article.category}</dd>
                </div>
              </dl>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-ngo-navy hover:text-ngo-gold transition-colors"
              >
                Nous écrire <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </aside>

          <div className="lg:col-span-9 order-1 lg:order-2 min-w-0">
            <div className="space-y-6">
              {article.body.map((block, i) =>
                block.type === "p" ? (
                  <p
                    key={i}
                    className={`text-[15.5px] sm:text-[17px] leading-[1.85] text-ngo-slate ${
                      i === 0
                        ? "first-letter:float-left first-letter:font-serif first-letter:text-[54px] first-letter:leading-[0.9] first-letter:mr-3 first-letter:mt-1 first-letter:font-black first-letter:text-ngo-navy"
                        : ""
                    }`}
                  >
                    {block.text}
                  </p>
                ) : (
                  <ul key={i} className="space-y-3 bg-ngo-pearl rounded-xl p-5 sm:p-6">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] sm:text-[16.5px] leading-[1.8] text-ngo-slate">
                        <span className="mt-[0.7em] size-1.5 rounded-full bg-ngo-gold shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>

            {pullQuote && (
              <blockquote className="mt-10 border-l-4 border-ngo-gold pl-5 sm:pl-6">
                <p className="font-serif text-[19px] sm:text-[24px] leading-snug font-bold text-ngo-navy">
                  « {pullQuote.slice(0, 190)}{pullQuote.length > 190 ? "…" : ""} »
                </p>
              </blockquote>
            )}

            <div className="mt-10 pt-6 border-t border-ngo-navy/10 flex flex-wrap items-center gap-4">
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 bg-ngo-navy text-white px-5 py-3 min-h-11 rounded-md text-[11px] uppercase tracking-widest font-bold hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
              >
                <ArrowLeft size={13} aria-hidden="true" /> Retour au magazine
              </Link>
              <Link
                to="/opportunites"
                className="inline-flex items-center gap-2 border border-ngo-navy/15 px-5 py-3 min-h-11 rounded-md text-[11px] uppercase tracking-widest font-bold text-ngo-navy hover:border-ngo-gold transition-colors"
              >
                Voir les opportunités <ArrowUpRight size={13} className="text-ngo-gold" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-ngo-pearl py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-[20px] sm:text-2xl font-extrabold text-ngo-navy mb-6 sm:mb-8">
            D'autres activités déjà réalisées
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {others.map((a) => (
              <article key={a.id} className="group bg-white border border-ngo-navy/8 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl hover:border-ngo-gold/40 transition-all">
                <Link to="/impact/$id" params={{ id: a.id }} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ngo-pearl">
                    <img
                      src={a.image}
                      alt={a.title}
                      style={{ objectPosition: a.focal ?? "center" }}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-ngo-slate mb-2">{a.date}</div>
                    <h3 className="font-serif text-[17px] sm:text-lg font-bold text-ngo-navy leading-snug group-hover:text-ngo-gold transition-colors break-words">
                      {a.title}
                    </h3>
                    <div className="mt-4 pt-4 border-t border-ngo-navy/8 flex items-center justify-between text-[11px] uppercase tracking-widest font-bold text-ngo-navy">
                      Lire le compte rendu
                      <ArrowUpRight size={14} className="text-ngo-gold group-hover:rotate-12 transition-transform shrink-0" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
