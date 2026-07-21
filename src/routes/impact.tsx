import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Search, Clock, MapPin, TrendingUp, Newspaper, Radio, Bookmark } from "lucide-react";
import { EDITORIAL_ARTICLES, type EditorialArticle } from "@/lib/editorial";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Magazine CMEP — Le média de la jeunesse togolaise" },
      { name: "description", content: "Reportages, analyses, portraits et actualités du Chris Mentorship & Empowerment Program. L'information institutionnelle sur la jeunesse togolaise." },
      { property: "og:title", content: "Magazine CMEP — Le média de la jeunesse togolaise" },
      { property: "og:description", content: "Un portail éditorial dédié à la jeunesse togolaise et à l'écosystème CMEP." },
      { property: "og:url", content: "/impact" },
    ],
    links: [{ rel: "canonical", href: "/impact" }],
  }),
  component: MagazinePage,
});

type Article = EditorialArticle;

const CATEGORIES = ["Toutes", "Institutionnel", "Formation", "Écologie", "Événement", "Analyse", "Communauté", "Développement durable", "Éditorial"] as const;

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
  const latest = rest.slice(3);

  return (
    <Layout>
      {/* Masthead */}
      <section className="border-b border-ngo-navy/8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold mb-4">
                <Radio size={12} aria-hidden="true" /> Édition {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-black tracking-tight text-ngo-navy leading-none">
                Le Magazine <span className="text-ngo-gold italic">CMEP</span>
              </h1>
              <p className="mt-4 text-ngo-slate max-w-2xl leading-relaxed">
                Reportages de terrain, portraits, analyses institutionnelles et actualités
                de l'écosystème de la jeunesse togolaise.
              </p>
            </div>
            <label className="relative w-full md:w-80">
              <span className="sr-only">Rechercher un article</span>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ngo-slate" aria-hidden="true" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher un article…"
                className="w-full pl-10 pr-4 py-3 min-h-11 bg-ngo-pearl border border-ngo-navy/10 rounded-md text-sm text-ngo-navy placeholder:text-ngo-slate focus:outline-none focus:ring-2 focus:ring-ngo-gold"
              />
            </label>
          </div>

          <nav aria-label="Catégories" className="mt-8 -mx-4 sm:mx-0 overflow-x-auto">
            <ul className="flex items-center gap-2 px-4 sm:px-0">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setCat(c)}
                    className={`whitespace-nowrap px-4 py-2 min-h-10 text-[12px] uppercase tracking-widest font-bold rounded-full border transition-colors ${
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

      {/* Hero story */}
      {featured && (
        <section className="bg-white pb-16 pt-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
            <article className="lg:col-span-8 group">
              <Link to="/impact" className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-ngo-pearl">
                <img
                  src={featured.image}
                  alt={featured.title}
                  width={1280}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy/85 via-ngo-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-bold mb-4">
                    <span className="bg-ngo-gold text-ngo-navy px-2.5 py-1 rounded">À la une</span>
                    <span className="opacity-80">{featured.category}</span>
                    <span className="opacity-60 hidden sm:inline">• {featured.date}</span>
                  </div>
                  <h2 className="font-serif text-h2 font-extrabold leading-[1.05] tracking-tight max-w-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-white/85 max-w-2xl text-body leading-relaxed line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-5 text-[12px] text-white/70">
                    <span className="inline-flex items-center gap-1.5"><Clock size={12} aria-hidden="true" /> {featured.readTime}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" /> {featured.location}</span>
                  </div>
                </div>
              </Link>
            </article>

            {/* Trending column */}
            <aside className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp size={16} className="text-ngo-gold" aria-hidden="true" />
                <h2 className="text-[11px] uppercase tracking-[0.28em] font-bold text-ngo-navy">Les plus lus</h2>
              </div>
              <ol className="divide-y divide-ngo-navy/10 border-y border-ngo-navy/10">
                {highlighted.map((a, i) => (
                  <li key={a.id} className="py-5 flex gap-4 group">
                    <span className="font-serif text-4xl font-black text-ngo-gold/70 tabular-nums leading-none shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-ngo-slate mb-2">{a.category} · {a.date}</div>
                      <h3 className="font-serif text-[17px] font-bold text-ngo-navy leading-snug group-hover:text-ngo-gold transition-colors">
                        <Link to="/impact">{a.title}</Link>
                      </h3>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      )}

      {/* Latest grid */}
      <section className="bg-ngo-pearl py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold">Dernières publications</span>
              <h2 className="font-serif text-h2 font-extrabold text-ngo-navy mt-2 leading-tight">
                {filtered.length} article{filtered.length > 1 ? "s" : ""}{cat !== "Toutes" && <> dans <em className="text-ngo-gold not-italic">{cat}</em></>}
              </h2>
            </div>
            <Newspaper size={28} className="text-ngo-navy/30 hidden md:block" aria-hidden="true" />
          </div>

          {latest.length === 0 ? (
            <p className="text-ngo-slate text-center py-16">Aucun article ne correspond à votre recherche.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((a) => (
                <article key={a.id} className="group bg-white border border-ngo-navy/8 rounded-2xl overflow-hidden hover:shadow-xl hover:border-ngo-gold/40 transition-all">
                  <Link to="/impact" className="block">
                    <div className="relative aspect-[16/10] overflow-hidden bg-ngo-pearl">
                      <img
                        src={a.image}
                        alt={a.title}
                        width={640}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-ngo-navy text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                        {a.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-ngo-slate mb-3 flex items-center gap-3">
                        <span>{a.date}</span>
                        <span aria-hidden="true">•</span>
                        <span className="inline-flex items-center gap-1"><Clock size={11} aria-hidden="true" /> {a.readTime}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-ngo-navy leading-snug group-hover:text-ngo-gold transition-colors mb-3">
                        {a.title}
                      </h3>
                      <p className="text-ngo-slate text-sm leading-relaxed line-clamp-3">{a.excerpt}</p>
                      <div className="mt-5 pt-5 border-t border-ngo-navy/8 flex items-center justify-between text-[11px] uppercase tracking-widest font-bold text-ngo-navy">
                        Lire l'article
                        <ArrowUpRight size={14} className="text-ngo-gold group-hover:rotate-12 transition-transform" aria-hidden="true" />
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
      <section className="bg-ngo-navy text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Bookmark size={28} className="text-ngo-gold mx-auto mb-5" aria-hidden="true" />
          <h2 className="font-serif text-h2 font-extrabold leading-tight tracking-tight mb-5">
            Recevez le meilleur du <span className="text-ngo-gold italic">Magazine CMEP</span>.
          </h2>
          <p className="text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
            Une lettre éditoriale trimestrielle : reportages, portraits, analyses et opportunités.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ngo-gold text-ngo-navy px-8 py-4 min-h-12 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-white transition-colors"
          >
            S'abonner à la newsletter <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
