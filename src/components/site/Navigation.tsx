import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Globe, ChevronDown } from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref } from "@/lib/contact";

const primaryLinks = [
  { to: "/" as const, label: { fr: "Accueil", en: "Home" } },
  { to: "/a-propos" as const, label: { fr: "À propos", en: "About" } },
  { to: "/programmes" as const, label: { fr: "Axes", en: "Programs" } },
  { to: "/impact" as const, label: { fr: "Magazine", en: "Magazine" } },
  { to: "/opportunites" as const, label: { fr: "Opportunités", en: "Opportunities" } },
  { to: "/partenaires" as const, label: { fr: "Partenaires", en: "Partners" } },
  { to: "/contact" as const, label: { fr: "Contact", en: "Contact" } },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-ngo-navy/8 shadow-[0_1px_24px_-12px_rgba(15,42,95,0.18)]"
          : "bg-white/80 backdrop-blur-md border-b border-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-3">
        {/* Brand — real logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="CMEP — Retour à l'accueil">
          <img
            src={CMEP_MEDIA.logo}
            alt=""
            width={40}
            height={40}
            fetchPriority="high"
            decoding="async"
            className="size-9 sm:size-10 rounded-md object-cover ring-1 ring-ngo-navy/10 group-hover:ring-ngo-gold transition-all"
          />
          <span className="hidden md:inline font-extrabold tracking-tight text-[15px] text-ngo-navy leading-none">
            CMEP<span className="text-ngo-gold">.</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center gap-5 2xl:gap-7 text-[13px] font-medium">
          {primaryLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative text-ngo-slate hover:text-ngo-navy transition-colors py-2 group whitespace-nowrap"
              activeProps={{ className: "text-ngo-navy font-semibold" }}
            >
              {l.label[lang]}
              <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-ngo-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-ngo-slate hover:text-ngo-navy px-3 py-2 rounded-md hover:bg-ngo-pearl transition-colors"
              aria-label="Changer de langue"
              aria-expanded={langOpen}
            >
              <Globe size={14} aria-hidden="true" />
              {lang.toUpperCase()}
              <ChevronDown size={12} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-28 bg-white border border-ngo-navy/10 rounded-lg shadow-xl overflow-hidden">
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
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

          <span className="h-6 w-px bg-ngo-navy/10" aria-hidden="true" />

          <a
            href={createWhatsAppHref("Bonjour CMEP, je souhaite rejoindre le programme.")}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 min-h-11 bg-ngo-gold text-ngo-navy text-[12.5px] font-bold uppercase tracking-wider rounded-md hover:bg-ngo-navy hover:text-white transition-colors shadow-sm whitespace-nowrap"
          >
            {lang === "fr" ? "Rejoindre" : "Apply"} <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden inline-flex items-center justify-center size-11 -mr-2 text-ngo-navy rounded-md hover:bg-ngo-pearl transition-colors"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={() => setOpen(false)}
        className={`xl:hidden fixed inset-0 top-16 sm:top-[72px] bg-ngo-navy/40 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Dropdown panel */}
      <div
        id="mobile-menu"
        className={`xl:hidden absolute inset-x-0 top-full origin-top bg-white border-t border-ngo-navy/10 shadow-2xl transition-all duration-200 ease-out ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-hidden={!open}
      >
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-5 pt-3 pb-6">
          <ul className="flex flex-col divide-y divide-ngo-navy/8">
            {primaryLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 min-h-12 text-[16px] font-medium text-ngo-navy active:bg-ngo-pearl -mx-5 px-5 transition-colors"
                  activeProps={{ className: "text-ngo-gold font-semibold" }}
                >
                  <span>{l.label[lang]}</span>
                  <ArrowRight size={18} className="text-ngo-slate" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-2" role="group" aria-label="Langue">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-2.5 min-h-11 text-[12px] font-bold uppercase tracking-wider rounded-md transition-colors ${
                  lang === l ? "bg-ngo-navy text-white" : "bg-ngo-pearl text-ngo-slate"
                }`}
                aria-pressed={lang === l}
              >
                {l === "fr" ? "Français" : "English"}
              </button>
            ))}
          </div>

          <a
            href={createWhatsAppHref("Bonjour CMEP, je souhaite rejoindre le programme.")}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 w-full px-5 py-4 min-h-12 bg-ngo-gold text-ngo-navy text-[15px] font-bold rounded-lg uppercase tracking-wider shadow-lg active:scale-[0.98] transition-transform"
          >
            {lang === "fr" ? "Candidater" : "Apply Now"} <ArrowRight size={16} aria-hidden="true" />
          </a>
          <p className="text-center text-[11px] text-ngo-slate mt-3 uppercase tracking-widest">
            Programme CMEP · Togo
          </p>
        </div>
      </div>
    </nav>
  );
}
