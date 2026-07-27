import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Linkedin, ArrowRight, Check } from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { createWhatsAppHref, CMEP_EMAIL } from "@/lib/contact";

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    const subject = encodeURIComponent("Inscription à la newsletter CMEP");
    const body = encodeURIComponent(
      `Bonjour CMEP,\n\nJe souhaite m'inscrire à votre newsletter institutionnelle.\n\nEmail : ${value}\n\nMerci.`,
    );
    window.location.href = `mailto:${CMEP_EMAIL}?subject=${subject}&body=${body}`;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer
      className="bg-ngo-navy text-white pt-12 sm:pt-20 pb-8"
      style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Pied de page — CMEP Togo</h2>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid gap-8 sm:gap-12 grid-cols-2 md:grid-cols-12 mb-10 sm:mb-14 text-left">
          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-6" aria-label="CMEP — Accueil">
              <img
                src={CMEP_MEDIA.logo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="size-12 rounded-lg object-cover ring-1 ring-white/20"
              />
              <span className="font-extrabold tracking-tight text-xl">
                CMEP<span className="text-ngo-gold">.</span>
              </span>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-md mb-8">
              Chris Mentorship & Empowerment Program — une initiative togolaise dédiée à
              l'autonomisation des jeunes par le mentorat, la formation, le leadership
              et l'engagement communautaire.
            </p>

            <form
              className="max-w-md"
              onSubmit={(e) => e.preventDefault()}
              aria-labelledby="newsletter-label"
            >
              <label id="newsletter-label" htmlFor="newsletter" className="block text-[11px] uppercase tracking-[0.22em] font-bold text-ngo-gold mb-3">
                Newsletter institutionnelle
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="votre.email@exemple.com"
                  className="flex-1 min-w-0 px-4 py-3 min-h-11 bg-white/5 border border-white/15 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-ngo-gold focus:border-transparent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-3 min-h-11 bg-ngo-gold text-ngo-navy font-bold text-[12px] uppercase tracking-wider rounded-md hover:bg-white transition-colors"
                >
                  OK <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
              <p className="text-[11px] text-white/40 mt-3">
                Une lettre trimestrielle. Désinscription en un clic.
              </p>
            </form>

          </div>

          {/* Nav columns */}
          <nav aria-label="Programme" className="md:col-span-2">
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-bold text-white mb-5 whitespace-nowrap">Programme</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link to="/a-propos" className="hover:text-ngo-gold transition-colors">À propos</Link></li>
              <li><Link to="/programmes" className="hover:text-ngo-gold transition-colors">Axes stratégiques</Link></li>
              <li><Link to="/impact" className="hover:text-ngo-gold transition-colors">Magazine</Link></li>
              <li><Link to="/partenaires" className="hover:text-ngo-gold transition-colors">Partenaires</Link></li>
            </ul>
          </nav>

          <nav aria-label="Agir" className="md:col-span-2">
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-bold text-white mb-5 whitespace-nowrap">Agir</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link to="/opportunites" className="hover:text-ngo-gold transition-colors">Opportunités</Link></li>
              <li><Link to="/opportunites" className="hover:text-ngo-gold transition-colors">Postuler</Link></li>
              <li><a href={createWhatsAppHref("Bonjour CMEP, je souhaite échanger sur un partenariat.")} target="_blank" rel="noreferrer noopener" className="hover:text-ngo-gold transition-colors">Devenir partenaire</a></li>
              <li><a href={createWhatsAppHref("Bonjour CMEP, je souhaite soutenir le programme.")} target="_blank" rel="noreferrer noopener" className="hover:text-ngo-gold transition-colors">Soutenir le programme</a></li>
              <li><Link to="/faq" className="hover:text-ngo-gold transition-colors">FAQ</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-bold text-white mb-5 whitespace-nowrap">Contact</h3>
            <ul className="space-y-4 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-ngo-gold shrink-0" aria-hidden="true" />
                <span>Coordination CMEP<br />Togo</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-ngo-gold shrink-0" aria-hidden="true" />
                <a href="mailto:chrismentorshipempowermentprog@gmail.com" className="break-all hover:text-ngo-gold transition-colors">
                  chrismentorshipempowermentprog@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-ngo-gold shrink-0" aria-hidden="true" />
                <a href="tel:+22890510088" className="hover:text-ngo-gold transition-colors">+228 90 51 00 88</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11px] uppercase tracking-widest text-white/40">
            © {year} CMEP Togo. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3 order-3 md:order-none md:mx-auto">
            <a
              href="https://www.linkedin.com/company/chris-mentorship-empowerment-program-cmep/about/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn CMEP"
              className="inline-flex items-center justify-center size-10 rounded-md bg-white/5 border border-white/10 hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook CMEP"
              className="inline-flex items-center justify-center size-10 rounded-md bg-white/5 border border-white/10 hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
            >
              <Facebook size={16} aria-hidden="true" />
            </a>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-white/50">
            <li><Link to="/mentions-legales" className="hover:text-ngo-gold transition-colors">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="hover:text-ngo-gold transition-colors">Confidentialité</Link></li>
            <li><Link to="/contact" className="hover:text-ngo-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
