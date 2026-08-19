import photoChristian from "@/assets/images/team/01_Christian_AKAKPO_Program_Manager.jpg";
import photoEsse from "@/assets/images/team/02_ESSE_Eyram_Secretaire_Principal.jpg";
import photoRamatha from "@/assets/images/team/03_MAMOUDOU_Ramatha_Secretaire_Generale.jpg";
import photoFaizou from "@/assets/images/team/04_ABOUDOULAYE_Faizou_Community_Manager.jpg";
import photoAVerifier from "@/assets/images/team/05_photo_sans_legende_a_verifier.jpg";
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
  pole: "Direction" | "Secrétariat" | "Communication" | "Économat" | "À confirmer";
  photo: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  { nom: "Christian AKAKPO", role: "Program Manager — Coordonnateur du Programme", pole: "Direction", photo: photoChristian },
  { nom: "ADAN Kpamou Assossimna", role: "Project Manager — Responsable de projet", pole: "Direction", photo: photoAdan },
  { nom: "MAMOUDOU Ramatha", role: "Secrétaire générale", pole: "Secrétariat", photo: photoRamatha },
  { nom: "ESSE Eyram", role: "Secrétaire Principal — Responsable équipe Secrétariat", pole: "Secrétariat", photo: photoEsse },
  { nom: "ABOUDOULAYE Faïzou", role: "Community Manager — Responsable équipe Communication", pole: "Communication", photo: photoFaizou },
  { nom: "AWESSO Samie Magnimwè Rodrigue", role: "Présentateur, Assistant du responsable Communication", pole: "Communication", photo: photoRodrigue },
  { nom: "KOLA Kodzo", role: "Présentateur, Chargé à l'information", pole: "Communication", photo: photoKola },
  { nom: "TOKPO Kodjo Roméo", role: "Vidéaste, Chargé de la création de contenus", pole: "Communication", photo: photoTokpo },
  { nom: "POKONA Solim Gloria", role: "Comptable — Responsable équipe Économat", pole: "Économat", photo: photoGloria },
  { nom: "À compléter", role: "À compléter", pole: "À confirmer", photo: photoAVerifier },
];
/** ▲▲▲ FIN DU TABLEAU DES MEMBRES ▲▲▲ */

const POLE_ORDER: TeamMember["pole"][] = [
  "Direction",
  "Secrétariat",
  "Communication",
  "Économat",
  "À confirmer",
];

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group bg-white border border-ngo-navy/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-ngo-gold">
      <div className="aspect-[4/5] overflow-hidden bg-ngo-navy/5">
        <img
          src={member.photo}
          alt={`Portrait de ${member.nom} — ${member.role}`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5 text-center">
        <h4 className="font-extrabold text-ngo-navy leading-tight tracking-tight text-[17px]">
          {member.nom}
        </h4>
        <p className="mt-2 text-[13px] text-ngo-slate leading-relaxed">{member.role}</p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.22em] font-bold text-ngo-gold">
          {member.pole}
        </p>
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
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.pole} aria-label={`Pôle ${group.pole}`}>
          <div className="flex items-center gap-4 mb-7">
            <h3 className="text-[11px] uppercase tracking-[0.28em] font-bold text-ngo-navy whitespace-nowrap">
              {group.pole}
            </h3>
            <span className="h-px flex-1 bg-ngo-navy/10" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.members.map((m) => (
              <MemberCard key={m.nom + m.role} member={m} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
