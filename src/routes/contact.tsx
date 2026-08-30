import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { createWhatsAppHref } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CMEP Togo" },
      { name: "description", content: "Contactez la coordination CMEP au Togo. Email, téléphone et échange direct — partenariats, candidatures, presse." },
      { property: "og:title", content: "Contact — CMEP Togo" },
      { property: "og:description", content: "Joignez l'équipe du Chris Mentorship & Empowerment Program au Togo." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const CHANNELS = [
  { icon: Mail, label: "Email", value: "chrismentorshipempowermentprog@gmail.com", href: "mailto:chrismentorshipempowermentprog@gmail.com" },
  { icon: Phone, label: "Téléphone", value: "+228 90 51 00 88", href: "tel:+22890510088" },
  { icon: MessageCircle, label: "Échange direct", value: "+228 96 89 87 17", href: createWhatsAppHref("Bonjour CMEP, je souhaite échanger avec la coordination.") },
  { icon: MapPin, label: "Adresse", value: "Coordination CMEP\nRépublique Togolaise" },
];

function ContactPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-ngo-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <span className="text-ngo-gold font-bold uppercase tracking-[0.25em] text-[11px]">Contact</span>
          <h1 className="font-extrabold text-h1 mt-5 mb-8 text-white max-w-4xl">
            Bâtissons <span className="text-ngo-gold">ensemble</span>.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Une question, une candidature, un partenariat, une demande presse ? L'équipe de coordination
            CMEP vous répond sous 48 heures ouvrées, où que vous soyez au Togo.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* Channels */}
          <div className="lg:col-span-5 space-y-4">
            {CHANNELS.map((c, i) => {
              const dark = i % 2 === 0;
              const Inner = (
                <>
                  <div className={`size-11 rounded-xl grid place-items-center shrink-0 transition-colors ${
                    dark
                      ? "bg-ngo-gold text-ngo-navy group-hover:bg-white"
                      : "bg-ngo-navy text-white group-hover:bg-ngo-gold group-hover:text-ngo-navy"
                  }`}>
                    <c.icon size={18} strokeWidth={2.2} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-1.5">{c.label}</div>
                    <div className={`text-[15px] font-bold leading-snug break-words whitespace-pre-line ${dark ? "text-white" : "text-ngo-navy"}`}>
                      {c.value}
                    </div>
                  </div>
                </>
              );
              const className = `group flex items-start gap-5 p-7 border hover:border-ngo-gold hover:shadow-xl transition-all rounded-2xl ${
                dark ? "bg-ngo-navy border-white/10" : "bg-ngo-pearl border-ngo-navy/10"
              }`;
              return c.href ? (
                <a key={c.label} href={c.href} className={className}>
                  {Inner}
                </a>
              ) : (
                <div key={c.label} className={className}>
                  {Inner}
                </div>
              );
            })}
          </div>

          {/* Form */}
          <form
            className="lg:col-span-7 bg-ngo-navy p-10 md:p-12 rounded-2xl text-white space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`Contact site CMEP — ${data.get("name") || ""}`);
              const body = encodeURIComponent(
                `${data.get("message") || ""}\n\n— ${data.get("name") || ""}\n${data.get("email") || ""}`,
              );
              window.location.href = `mailto:chrismentorshipempowermentprog@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Formulaire</span>
            <h2 className="text-h2 font-extrabold leading-tight tracking-tight mt-2 mb-2">
              Écrivez-nous.
            </h2>
            <p className="text-white/65 text-sm mb-6 leading-relaxed">
              Nous répondons sous 48 heures ouvrées, du lundi au vendredi.
            </p>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60 mb-2 block">
                Nom complet
              </label>
              <input
                name="name"
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-md focus:border-ngo-gold outline-none text-white text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60 mb-2 block">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-md focus:border-ngo-gold outline-none text-white text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60 mb-2 block">
                Votre message
              </label>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full bg-white/5 border border-white/10 px-4 py-3.5 rounded-md focus:border-ngo-gold outline-none text-white text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ngo-gold text-ngo-navy font-bold uppercase tracking-widest text-xs py-4 rounded-md hover:scale-[1.02] transition-transform"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
