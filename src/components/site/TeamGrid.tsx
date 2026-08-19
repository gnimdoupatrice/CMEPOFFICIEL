import photoChristian from "@/assets/images/team/01_Christian_AKAKPO_Program_Manager.jpg";
import photoEsse from "@/assets/images/team/02_ESSE_Eyram_Secretaire_Principal.jpg";
import photoRamatha from "@/assets/images/team/03_MAMOUDOU_Ramatha_Secretaire_Generale.jpg";
import photoFaizou from "@/assets/images/team/04_ABOUDOULAYE_Faizou_Community_Manager.jpg";
import photoRodrigue from "@/assets/images/team/06_AWESSO_Samie_Magnimwe_Rodrigue_Presentateur.jpg";
import photoKola from "@/assets/images/team/07_KOLA_Kodzo_Presentateur.jpg";
import photoTokpo from "@/assets/images/team/08_TOKPO_Kodjo_Romeo_Videaste.jpg";
import photoAdan from "@/assets/images/team/09_ADAN_Kpamou_Assossimna_Project_Manager.jpg";
import photoGloria from "@/assets/images/team/10_POKONA_Solim_Gloria_Comptable.jpg";

/**
 * ▼▼▼ TABLEAU DES MEMBRES — ÉDITER ICI ▼▼▼
 * Pour ajouter / corriger un membre : modifier ce tableau (nom, role, pole, photo).
 * Les photos vivent dans src/assets/images/team/.
 */
export type TeamMember = {
  nom: string;
  role: string;
  pole: "Direction" | "Secrétariat" | "Communication" | "Économat";
  photo: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    nom: "Christian AKAKPO",
    role: "Program Manager — Coordonnateur du Programme",
    pole: "Direction",
    photo: photoChristian,
  },
  {
    nom: "ADAN Kpamou Assossimna",
    role: "Project Manager — Responsable de projet",
    pole: "Direction",
    photo: photoAdan,
  },
  {
    nom: "MAMOUDOU Ramatha",
    role: "Secrétaire générale",
    pole: "Secrétariat",
    photo: photoRamatha,
  },
  {
    nom: "ESSE Eyram",
    role: "Secrétaire Principal — Responsable équipe Secrétariat",
    pole: "Secrétariat",
    photo: photoEsse,
  },
  {
    nom: "ABOUDOULAYE Faïzou",
    role: "Community Manager — Responsable équipe Communication",
    pole: "Communication",
    photo: photoFaizou,
  },
  {
    nom: "AWESSO Samie Magnimwè Rodrigue",
    role: "Présentateur, Assistant du responsable Communication",
    pole: "Communication",
    photo: photoRodrigue,
  },
  {
    nom: "KOLA Kodzo",
    role: "Présentateur, Chargé à l'information",
    pole: "Communication",
    photo: photoKola,
  },
  {
    nom: "TOKPO Kodjo Roméo",
    role: "Vidéaste, Chargé de la création de contenus",
    pole: "Communication",
    photo: photoTokpo,
  },
  {
    nom: "POKONA Solim Gloria",
    role: "Comptable — Responsable équipe Économat",
    pole: "Économat",
    photo: photoGloria,
  },
];
/** ▲▲▲ FIN DU TABLEAU DES MEMBRES ▲▲▲ */

const POLE_ORDER: TeamMember["pole"][] = [
  "Direction",
  "Secrétariat",
  "Communication",
  "Économat",
];

/** Système de carte unique de la page À propos (rayon / bordure / ombre / survol). */
export const CARD_BASE =
  "rounded-2xl border border-ngo-navy/10 shadow-[0_1px_2px_rgba(15,42,95,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-ngo-gold hover:shadow-[0_18px_40px_-18px_rgba(15,42,95,0.35)]";

/** Libellé de section en petites majuscules — même échelle partout. */
export const EYEBROW =
  "text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-gold-ink";

/**
 * Piste flex centrée : la dernière rangée incomplète reste centrée.
 * 1 col < 640 · 2 cols 640–1024 · 3 cols 1024–1440 · 4 cols ≥ 1440
 */
const TRACK = "flex flex-wrap justify-center gap-6";
const CELL =
  "basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] min-[1440px]:basis-[calc(25%-1.125rem)] max-w-sm min-w-0";

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className={`group bg-white overflow-hidden ${CARD_BASE}`}>
      <div className="aspect-[4/5] overflow-hidden bg-ngo-navy/5">
        <img
          src={member.photo}
          alt={`Portrait de ${member.nom} — ${member.role}`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1440px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-6 text-center">
        <h4 className="font-extrabold text-ngo-navy leading-tight tracking-tight text-[17px]">
          {member.nom}
        </h4>
        <p className="mt-2 text-[13px] text-ngo-slate leading-relaxed">{member.role}</p>
        <p className={`mt-4 ${EYEBROW}`}>{member.pole}</p>
      </div>
    </article>
  );
}

export function TeamGrid() {
  const groups = POLE_ORDER.map((pole) => ({
    pole,
    members: TEAM_MEMBERS.filter((m) => m.pole === pole),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section key={group.pole} aria-label={`Pôle ${group.pole}`}>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px flex-1 bg-ngo-navy/10" aria-hidden="true" />
            <h3 className="text-[10px] uppercase tracking-[0.28em] font-bold text-ngo-navy whitespace-nowrap">
              {group.pole}
            </h3>
            <span className="h-px flex-1 bg-ngo-navy/10" aria-hidden="true" />
          </div>
          <div className={TRACK}>
            {group.members.map((m) => (
              <div key={m.nom + m.role} className={CELL}>
                <MemberCard member={m} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
