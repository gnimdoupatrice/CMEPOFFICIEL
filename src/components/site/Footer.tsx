import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Linkedin, ArrowRight, Check } from "lucide-react";
import { CMEP_MEDIA } from "@/lib/media";
import { CMEP_EMAIL } from "@/lib/contact";
import { CMEP_SOCIAL } from "@/lib/social";

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
              onSubmit={handleNewsletter}
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
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubscribed(false); }}
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
              <p className="text-[11px] mt-3 flex items-center gap-1.5" aria-live="polite">
                {subscribed ? (
                  <><Check size={13} className="text-ngo-gold" /> <span className="text-white/70">Merci ! Votre demande d'inscription est prête à être envoyée.</span></>
                ) : (
                  <span className="text-white/40">Une lettre trimestrielle. Désinscription en un clic.</span>
                )}
              </p>
            </form>

          </div>

          {/* Nav columns */}
          <nav aria-label="Programme" className="md:col-span-2">
            <h3 className="text-[12px] uppercase tracking-[0.12em] font-bold text-white mb-4 leading-tight">Programme</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link to="/a-propos" className="hover:text-ngo-gold transition-colors">À propos</Link></li>
              <li><Link to="/programmes" className="hover:text-ngo-gold transition-colors">Axes stratégiques</Link></li>
              <li><Link to="/impact" className="hover:text-ngo-gold transition-colors">Magazine</Link></li>
              <li><Link to="/partenaires" className="hover:text-ngo-gold transition-colors">Partenaires</Link></li>
            </ul>
          </nav>

          <nav aria-label="Agir" className="md:col-span-2">
            <h3 className="text-[12px] uppercase tracking-[0.12em] font-bold text-white mb-4 leading-tight">Agir</h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li><Link to="/opportunites" className="hover:text-ngo-gold transition-colors">Opportunités</Link></li>
              <li><Link to="/opportunites" className="hover:text-ngo-gold transition-colors">Postuler</Link></li>
              <li><Link to="/partenaires" className="hover:text-ngo-gold transition-colors">Devenir partenaire</Link></li>
              <li><Link to="/partenaires" className="hover:text-ngo-gold transition-colors">Soutenir le programme</Link></li>
              <li><Link to="/faq" className="hover:text-ngo-gold transition-colors">FAQ</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[12px] uppercase tracking-[0.12em] font-bold text-white mb-4 leading-tight">Contact</h3>
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
              href={CMEP_SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn CMEP"
              className="inline-flex items-center justify-center size-10 rounded-md bg-white/5 border border-white/10 hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>
            <a
              href={CMEP_SOCIAL.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook CMEP"
              className="inline-flex items-center justify-center size-10 rounded-md bg-white/5 border border-white/10 hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
            >
              <Facebook size={16} aria-hidden="true" />
            </a>
            <a
              href={CMEP_SOCIAL.tiktok}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="TikTok CMEP"
              className="inline-flex items-center justify-center size-10 rounded-md bg-white/5 border border-white/10 hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3c.3 2.1 1.6 3.6 3.8 3.8v2.4c-1.4.1-2.7-.3-3.9-1v5.9c0 4.4-3.6 6.9-7.1 5.6-2.4-.9-3.7-3.4-3.3-6 .4-2.4 2.6-4.2 5-4.2.3 0 .5 0 .8.1v2.6c-1.6-.5-3 .6-3.1 2-.1 1.3.9 2.4 2.2 2.5 1.4.1 2.6-1 2.6-2.4V3h3z" />
              </svg>
            </a>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-white/50">
            <li><Link to="/mentions-legales" className="hover:text-ngo-gold transition-colors">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="hover:text-ngo-gold transition-colors">Confidentialité</Link></li>
            <li><Link to="/contact" className="hover:text-ngo-gold transition-colors">Contact</Link></li>
            <li><Link to="/admin" className="text-white/25 hover:text-ngo-gold transition-colors">Espace coordination</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
