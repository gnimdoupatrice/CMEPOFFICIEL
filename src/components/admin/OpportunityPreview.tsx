import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { OpportunityDetailView } from "@/components/site/OpportunityDetail";
import type { OpportunityInput, PublicOpportunity } from "@/lib/opportunities";
import { X, Eye } from "lucide-react";

function inputToPublic(input: OpportunityInput, coverUrl: string | null): PublicOpportunity {
  return {
    id: input.id ?? "preview",
    title: input.title,
    slug: input.slug,
    category: input.category,
    badge: input.badge ?? null,
    cover_url: coverUrl,
    short_description: input.short_description ?? "",
    description: input.description ?? "",
    sessions: input.sessions ?? [],
    registration_deadline: input.registration_deadline ?? null,
    modules: input.modules ?? [],
    pricing: input.pricing ?? [],
    application_mode: input.application_mode,
    whatsapp_message: input.whatsapp_message ?? null,
  };
}

export function OpportunityPreview({
  input,
  coverUrl,
  isOpen,
  onClose,
}: {
  input: OpportunityInput;
  coverUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const opportunity = useMemo(() => inputToPublic(input, coverUrl), [input, coverUrl]);
  const [showBanner] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ngo-navy/60 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen pb-10">
        <div className="sticky top-0 z-10 bg-white border-b border-ngo-navy/8 px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-ngo-gold" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-extrabold text-ngo-navy">
                Aperçu public
              </span>
              {showBanner && (
                <span className="hidden sm:inline text-[11px] text-ngo-slate">
                  C'est le rendu visible par les visiteurs.
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-ngo-navy hover:text-ngo-gold"
            >
              <X size={14} aria-hidden="true" /> Fermer
            </button>
          </div>
        </div>
        <OpportunityDetailView opportunity={opportunity} />
      </div>
    </div>
  );
}
