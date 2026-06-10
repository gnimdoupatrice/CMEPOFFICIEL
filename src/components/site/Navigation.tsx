import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Globe, ChevronDown } from "lucide-react";

const primaryLinks = [
  { to: "/" as const, label: { fr: "Accueil", en: "Home" } },
  { to: "/a-propos" as const, label: { fr: "À propos", en: "About" } },
  { to: "/programmes" as const, label: { fr: "Axes & Programmes", en: "Programs" } },
  { to: "/impact" as const, label: { fr: "Impact", en: "Impact" } },
  { to: "/actualites" as const, label: { fr: "Actualités & Opportunités", en: "News & Opportunities" } },
  { to: "/partenaires" as const, label: { fr: "Partenaires", en: "Partners" } },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-ngo-navy/8 shadow-[0_1px_24px_-12px_rgba(15,42,95,0.18)]"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      {/* Top utility bar — institutional */}
      <div
        className={`hidden lg:block border-b border-ngo-navy/5 bg-ngo-navy text-white/85 transition-all overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between text-[11px]">
          <span className="uppercase tracking-[0.25em] font-semibold text-white/70">
            CMEP — Compétences · Habilitation · Résilience · Insertion
          </span>
          <div className="flex items-center gap-6">
            <a href="mailto:chrismentorshipempowermentprog@gmail.com" className="text-white/70 hover:text-white">
              chrismentorshipempowermentprog@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="size-10 bg-ngo-navy rounded-md flex items-center justify-center text-white font-black text-base group-hover:bg-ngo-gold group-hover:text-ngo-navy transition-colors">
            C
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-extrabold tracking-tight text-[17px] text-ngo-navy">CMEP</span>
            <span className="text-[9px] uppercase tracking-[0.22em] text-ngo-slate font-semibold mt-1">
              Mentorship · Empowerment
            </span>
          </div>
        </Link>

        {/* Primary nav */}
        <div className="hidden xl:flex items-center gap-7 text-[13px] font-medium">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-ngo-slate hover:text-ngo-navy transition-colors py-2 group"
              activeProps={{ className: "text-ngo-navy font-semibold" }}
            >
              {l.label[lang]}
              <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-ngo-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language switch */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-ngo-slate hover:text-ngo-navy px-3 py-2 rounded-md hover:bg-ngo-pearl transition-colors"
              aria-label="Language"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-28 bg-white border border-ngo-navy/10 rounded-lg shadow-xl overflow-hidden">
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-ngo-pearl ${
                      lang === l ? "text-ngo-navy" : "text-ngo-slate"
                    }`}
                  >
                    {l === "fr" ? "Français" : "English"}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="h-6 w-px bg-ngo-navy/10" />

          <Link
            to="/opportunites"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-ngo-gold text-ngo-navy text-[12.5px] font-bold uppercase tracking-wider rounded-md hover:bg-ngo-navy hover:text-white transition-colors shadow-sm"
          >
            {lang === "fr" ? "Candidater" : "Apply Now"} <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 text-ngo-navy"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="xl:hidden border-t border-ngo-navy/8 bg-white">
          <div className="px-6 py-5 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] font-medium text-ngo-slate hover:text-ngo-navy border-b border-ngo-navy/5"
              >
                {l.label[lang]}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-5 mb-3">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded ${
                    lang === l ? "bg-ngo-navy text-white" : "bg-ngo-pearl text-ngo-slate"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              to="/opportunites"
              onClick={() => setOpen(false)}
              className="mt-2 px-5 py-3 bg-ngo-gold text-ngo-navy text-center text-sm font-bold rounded-md uppercase tracking-wider"
            >
              {lang === "fr" ? "Candidater" : "Apply Now"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
