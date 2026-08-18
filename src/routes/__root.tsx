import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import styles from "@/styles.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0F2A5F" },
      { title: "CMEP — Chris Mentorship & Empowerment Program" },
      {
        name: "description",
        content:
          "CMEP : programme national d'autonomisation, de mentorat et d'insertion socio-économique des jeunes togolais.",
      },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800;9..144,900&family=Cormorant+Garamond:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Chris Mentorship & Empowerment Program",
          alternateName: "CMEP",
          url: "/",
          logo: "/",
          areaServed: "Togo",
          address: { "@type": "PostalAddress", addressCountry: "TG" },
          email: "chrismentorshipempowermentprog@gmail.com",
          telephone: "+228 90 51 00 88",
          sameAs: [
            "https://www.linkedin.com/company/chris-mentorship-empowerment-program-cmep/about/",
          ],
        }),
      },
    ],
  }),
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
  component: RootComponent,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-ngo-pearl px-6 text-center">
      <div className="max-w-md">
        <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Erreur 404</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-tight tracking-tight">
          Cette page n'existe pas.
        </h1>
        <p className="text-ngo-slate mt-5">Le lien est peut-être obsolète. Retournez à l'accueil pour reprendre votre navigation.</p>
        <a
          href="/"
          className="inline-block mt-8 bg-ngo-navy text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="min-h-screen grid place-items-center bg-ngo-pearl px-6 text-center">
      <div className="max-w-md">
        <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Erreur inattendue</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ngo-navy mt-4 leading-tight tracking-tight">
          Une erreur est survenue.
        </h1>
        <p className="text-ngo-slate mt-5 text-sm">{error.message}</p>
        <a
          href="/"
          className="inline-block mt-8 bg-ngo-navy text-white px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-md hover:bg-ngo-gold hover:text-ngo-navy transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
