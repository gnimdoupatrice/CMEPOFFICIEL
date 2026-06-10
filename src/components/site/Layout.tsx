import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ngo-navy">
      <Navigation />
      <main className="flex-1 pt-[72px] lg:pt-[108px]">{children}</main>
      <Footer />
    </div>
  );
}
