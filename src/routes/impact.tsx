import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, MapPin, TrendingUp, Newspaper, Radio, Bookmark } from "lucide-react";
import { EDITORIAL_ARTICLES, type EditorialArticle } from "@/lib/editorial";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Retours d'activités — Magazine CMEP" },
      { name: "description", content: "Reportages et comptes rendus des activités déjà menées par le Chris Mentorship & Empowerment Program : formations, reboisements, panels et initiatives de terrain au Togo." },
      { property: "og:title", content: "Retours d'activités — Magazine CMEP" },
      { property: "og:description", content: "Ce qui s'est passé sur le terrain : reportages et comptes rendus des activités déjà réalisées par le CMEP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: MagazinePage,
});

type Article = EditorialArticle;

const CATEGORIES = ["Toutes", "Reportage", "Retour d'activité"] as const;

const ARTICLES: Article[] = EDITORIAL_ARTICLES;

function MagazinePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Toutes");

  const filtered = useMemo(() => {
    const norm = q.trim().toLowerCase();
    return ARTICLES.filter((a) => (cat === "Toutes" || a.category === cat))
      .filter((a) => !norm || a.title.toLowerCase().includes(norm) || a.excerpt.toLowerCase().includes(norm));
  }, [q, cat]);

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);
  const highlighted = rest.slice(0, 3);
  // La grille « Dernières publications » liste TOUS les articles filtrés
  // (y compris la une et les plus lus) — comportement standard des pages
  // magazine/actualités : le filtre catégorie pilote toujours la grille.
  const latest = filtered;

  return (
    <Layout>
      {/* Masthead */}
      <section className="border-b border-ngo-navy/8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-6 sm:pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-bold text-ngo-gold mb-3">
                <Radio size={12} aria-hidden="true" />
                <span className="truncate">Archives · Activités déjà réalisées</span>
              </div>
              <h1 className="font-serif text-[26px] sm:text-4xl md:text-5xl font-black text-ngo-navy leading-[1.1]">
                Retours sur <span className="text-ngo-gold italic">nos activités</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-base text-ngo-slate max-w-2xl leading-relaxed">
Reportages et comptes rendus des activités déjà menées par le CMEP sur le terrain : formations, reboisements, panels et initiatives citoyennes.
              </p>
            </div>
            <label className="relative w-full md:w-72 shrink-0">
              <span className="sr-only">Rechercher un article</span>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ngo-slate" aria-hidden="true" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher une activité…"
                className="w-full pl-10 pr-4 py-3 min-h-11 bg-ngo-pearl border border-ngo-navy/10 rounded-md text-sm text-ngo-navy placeholder:text-ngo-slate focus:outline-none focus:ring-2 focus:ring-ngo-gold"
              />
            </label>
          </div>

          <nav aria-label="Catégories" className="mt-6 sm:mt-8 -mx-4 sm:mx-0 overflow-x-auto">
            <ul className="flex items-center gap-2 px-4 sm:px-0 pb-1">
              {CATEGORIES.map((c) => (
                <li key={c} className="shrink-0">
                  <button
                    onClick={() => setCat(c)}
                    className={`whitespace-nowrap px-3 sm:px-4 py-2 min-h-9 sm:min-h-10 text-[11px] sm:text-[12px] uppercase tracking-widest font-bold rounded-full border transition-colors ${
                      cat === c
                        ? "bg-ngo-navy text-white border-ngo-navy"
                        : "bg-white text-ngo-slate border-ngo-navy/15 hover:border-ngo-gold hover:text-ngo-navy"
                    }`}
                    aria-pressed={cat === c}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Hero story — YOP-inspired: image + text stacked on mobile, side-by-side w/ trending on desktop */}
      {featured && (
        <section className="bg-white pb-12 sm:pb-16 pt-8 sm:pt-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-10">
            <article className="lg:col-span-8 group">
              <Link to="/impact/$id" params={{ id: featured.id }} className="block">
                <div className="relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-ngo-pearl">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    style={{ objectPosition: featured.focal ?? "center" }}
                    width={1280}
                    height={800}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="mt-4 sm:mt-5 bg-ngo-pearl sm:bg-transparent rounded-xl sm:rounded-none p-4 sm:p-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold mb-3">
                    <span className="bg-ngo-gold text-ngo-navy px-2 py-1 rounded">Dernier retour</span>
                    <span className="text-ngo-navy">{featured.category}</span>
                    <span className="text-ngo-slate">• {featured.date}</span>
                  </div>
                  <h2 className="font-serif text-[22px] sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-[1.15] tracking-tight text-ngo-navy group-hover:text-ngo-gold transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-ngo-slate text-[14px] sm:text-base leading-relaxed line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-[12px] text-ngo-slate">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" /> {featured.location}</span>
                    <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-widest text-ngo-navy">
                      Lire le compte rendu <ArrowUpRight size={13} className="text-ngo-gold" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>

            {/* Trending column */}
            <aside className="lg:col-span-4 min-w-0">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <TrendingUp size={16} className="text-ngo-gold shrink-0" aria-hidden="true" />
                <h2 className="text-[11px] uppercase tracking-[0.24em] font-bold text-ngo-navy">Activités marquantes</h2>
              </div>
              <ol className="divide-y divide-ngo-navy/10 border-y border-ngo-navy/10">
                {highlighted.map((a, i) => (
                  <li key={a.id} className="py-4 sm:py-5 group">
                    <Link to="/impact/$id" params={{ id: a.id }} className="flex gap-3 sm:gap-4 items-start">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-ngo-pearl">
                        <img
                          src={a.image}
                          alt=""
                          style={{ objectPosition: a.focal ?? "center" }}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 size-full object-cover"
                        />
                        <span className="absolute top-1 left-1 bg-white/90 text-ngo-navy text-[9px] font-black tabular-nums px-1.5 py-0.5 rounded">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-ngo-gold mb-1.5">{a.category}</div>
                        <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-ngo-navy leading-snug group-hover:text-ngo-gold transition-colors break-words">
                          {a.title}
                        </h3>
                        <div className="mt-1.5 text-[11px] text-ngo-slate">{a.date}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      )}

      {/* Latest grid */}
      <section className="bg-ngo-pearl py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-[0.24em] font-bold text-ngo-gold">Toutes nos activités passées</span>
              <h2 className="font-serif text-[22px] sm:text-3xl md:text-4xl font-extrabold text-ngo-navy mt-2 leading-tight break-words">
                {filtered.length} retour{filtered.length > 1 ? "s" : ""} d'activité{cat !== "Toutes" && <> dans <em className="text-ngo-gold not-italic">{cat}</em></>}
              </h2>
            </div>
            <Newspaper size={28} className="text-ngo-navy/30 hidden md:block shrink-0" aria-hidden="true" />
          </div>

          {latest.length === 0 ? (
            <p className="text-ngo-slate text-center py-16">Aucune activité ne correspond à votre recherche.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {latest.map((a) => (
                <article key={a.id} className="group bg-white border border-ngo-navy/8 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl hover:border-ngo-gold/40 transition-all">
                  <Link to="/impact/$id" params={{ id: a.id }} className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-ngo-pearl">
                      <img
                        src={a.image}
                        alt={a.title}
                        style={{ objectPosition: a.focal ?? "center" }}
                        width={640}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-ngo-navy text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                        {a.category}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-ngo-slate mb-2 sm:mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{a.date}</span>
                        <span aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1"><MapPin size={11} aria-hidden="true" /> {a.location}</span>
                      </div>
                      <h3 className="font-serif text-[17px] sm:text-xl font-bold text-ngo-navy leading-snug group-hover:text-ngo-gold transition-colors mb-2 sm:mb-3 break-words">
                        {a.title}
                      </h3>
                      <p className="text-ngo-slate text-[13px] sm:text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>
                      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-ngo-navy/8 flex items-center justify-between text-[11px] uppercase tracking-widest font-bold text-ngo-navy">
                        Lire le compte rendu
                        <ArrowUpRight size={14} className="text-ngo-gold group-hover:rotate-12 transition-transform shrink-0" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-ngo-navy text-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Bookmark size={26} className="text-ngo-gold mx-auto mb-4 sm:mb-5" aria-hidden="true" />
          <h2 className="font-serif text-[22px] sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-5 break-words">
            Ne manquez aucun <span className="text-ngo-gold italic">retour d'activité</span>.
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-[14px] sm:text-base leading-relaxed mb-6 sm:mb-8">
            Une lettre trimestrielle : comptes rendus de nos activités, reportages de terrain et prochaines opportunités.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-6 sm:px-8 py-3.5 sm:py-4 min-h-12 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-white transition-colors"
          >
            S'abonner à la newsletter <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

