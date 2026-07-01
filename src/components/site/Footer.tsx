import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ngo-navy text-white pt-14 sm:pt-20 pb-8 sm:pb-10" style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="size-10 bg-ngo-gold rounded-lg flex items-center justify-center text-white font-extrabold text-lg">C</div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold tracking-tight text-xl">CMEP</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold mt-1">Chris Mentorship & Empowerment Program</span>
              </div>
            </div>
            <p className="text-white/60 max-w-md text-sm leading-relaxed mb-6">
              Compétences — Habilitation — Résilience — Insertion socio-économique.
              Une initiative collective portée par un réseau de jeunes leaders togolais.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-ngo-gold font-bold">
              Zone pilote : Région de Kara
            </p>
          </div>

          <div>
            <h5 className="font-serif text-base mb-5 text-white">Navigation</h5>
            <ul className="grid grid-cols-2 sm:block sm:space-y-2.5 gap-y-1 text-sm text-white/70">
              <li><Link to="/a-propos" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">À propos</Link></li>
              <li><Link to="/programmes" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">Programmes</Link></li>
              <li><Link to="/impact" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">Impact</Link></li>
              <li><Link to="/partenaires" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">Partenaires</Link></li>
              <li><Link to="/actualites" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">Actualités</Link></li>
              <li><Link to="/faq" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="inline-flex items-center min-h-11 hover:text-ngo-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-base mb-5 text-white">Contact</h5>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-ngo-gold shrink-0" />
                <span>Coordination CMEP<br/>Kara, Togo</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-ngo-gold shrink-0" />
                <a href="mailto:chrismentorshipempowermentprog@gmail.com" className="break-all hover:text-ngo-gold">chrismentorshipempowermentprog@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-ngo-gold shrink-0" />
                <span>+228 90 51 00 88<br/>WhatsApp : 96 89 87 17</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11px] uppercase tracking-widest text-white/40">© {new Date().getFullYear()} CMEP Togo. Tous droits réservés.</p>
          <p className="text-[11px] uppercase tracking-widest text-white/40">Compétences • Habilitation • Résilience • Insertion</p>
        </div>
      </div>
    </footer>
  );
}
