import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-ngo-navy">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3 focus:bg-ngo-navy focus:text-white focus:rounded-md focus:font-bold focus:text-sm focus:shadow-2xl focus:outline focus:outline-2 focus:outline-ngo-gold"
      >
        Aller au contenu principal
      </a>
      <Navigation />
      <main id="main-content" className="flex-1 pt-16 sm:pt-[72px] lg:pt-[108px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
