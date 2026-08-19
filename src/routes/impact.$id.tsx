import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowLeft, ArrowUpRight, MapPin, CalendarDays } from "lucide-react";
import { EDITORIAL_ARTICLES, getArticle } from "@/lib/editorial";

export const Route = createFileRoute("/impact/$id")({
  loader: ({ params }) => {
    const article = getArticle(params.id);
    if (!article) throw notFound();
    return { article };
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
  const { article } = Route.useLoaderData();
  const others = EDITORIAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <Layout>
      <article className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14">
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-ngo-slate hover:text-ngo-gold transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Tous les retours d'activités
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold">
            <span className="bg-ngo-gold text-ngo-navy px-2 py-1 rounded">{article.category}</span>
            <span className="text-ngo-slate">Activité réalisée</span>
          </div>

          <h1 className="mt-4 font-serif text-[26px] sm:text-4xl md:text-[44px] font-black leading-[1.12] tracking-tight text-ngo-navy">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ngo-slate">
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} aria-hidden="true" /> {article.date}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden="true" /> {article.location}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
          <figure className="m-0">
            <div className="relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-ngo-pearl">
              <img
                src={article.image}
                alt={article.title}
                loading="eager"
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

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <p className="font-serif text-[17px] sm:text-xl leading-relaxed text-ngo-navy border-l-2 border-ngo-gold pl-5">
            {article.excerpt}
          </p>

          <div className="mt-8 space-y-5">
            {article.body.map((block, i) =>
              block.type === "p" ? (
                <p key={i} className="text-[15px] sm:text-[16.5px] leading-[1.8] text-ngo-slate">
                  {block.text}
                </p>
              ) : (
                <ul key={i} className="space-y-3 pl-1">
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
