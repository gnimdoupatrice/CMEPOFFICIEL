import logoCmep from "@/assets/brand/logo-cmep-local.jpg";
import teamCmep from "@/assets/team/team-cmep-local.jpg";
import animateurProjet from "@/assets/opportunities/animateur-projet.jpg";
import animateurProjetIntervenants from "@/assets/opportunities/animateur-projet-intervenants.jpg";
import certificatEies from "@/assets/opportunities/certificat-eies.jpg";
import redactionTdr from "@/assets/opportunities/redaction-tdr.jpg";

import universiteKara from "@/assets/partners-local/universite-kara.jpg";
import franceVolontaires from "@/assets/partners-local/france-volontaires.jpg";
import youthPanel from "@/assets/partners-local/youth-panel.jpg";
import ongA3e from "@/assets/partners-local/ong-a3e.jpg";
import kEmpire from "@/assets/partners-local/k-empire.jpg";
import ongStadd from "@/assets/partners-local/ong-stadd.jpg";
import clubCephal from "@/assets/partners-local/club-cephal.jpg";
import begeShoot from "@/assets/partners-local/bege-shoot.jpg";
import anjpedChe from "@/assets/partners-local/anjped-che.jpg";
import donBosco from "@/assets/partners-local/don-bosco.jpg";
import rotaractKara from "@/assets/partners-local/rotaract-kara.jpg";
import anlp from "@/assets/partners-local/anlp.jpg";

export const CMEP_MEDIA = {
  logo: logoCmep,
  team: teamCmep,
  opportunities: {
    animateurProjet,
    animateurProjetIntervenants,
    certificatEies,
    redactionTdr,
  },
  partners: {
    universiteKara,
    franceVolontaires,
    youthPanel,
    ongA3e,
    kEmpire,
    ongStadd,
    clubCephal,
    begeShoot,
    anjpedChe,
    donBosco,
    rotaractKara,
    anlp,
  },
} as const;

export const PARTNER_LOGOS = [
  { name: "Université de Kara", logo: universiteKara, category: "Académique" },
  { name: "ONG A3E", logo: ongA3e, category: "ONG" },
  { name: "K-EMPIRE", logo: kEmpire, category: "Entreprise" },
  { name: "France Volontaires", logo: franceVolontaires, category: "International" },
  { name: "ONG STADD", logo: ongStadd, category: "ONG" },
  { name: "Youth Panel — Plan International Togo", logo: youthPanel, category: "International" },
  { name: "Club CEPHAL", logo: clubCephal, category: "Associatif" },
  { name: "BEGE SHOOT", logo: begeShoot, category: "Entreprise" },
  { name: "Association ANJPED-CHE", logo: anjpedChe, category: "Associatif" },
  { name: "Centre Don Bosco", logo: donBosco, category: "Académique" },
  { name: "Rotaract Club — Université de Kara", logo: rotaractKara, category: "Associatif" },
  { name: "ONG À Nous La Planète (ANLP)", logo: anlp, category: "ONG" },
] as const;
