// Images CMEP — imports directs de fichiers image locaux.
// Toutes les images vivent dans src/assets/ et sont bundlées par Vite.

import logoCmep from "@/assets/images/brand/logo.jpg";
import teamCmep from "@/assets/images/home/team.jpg";
import homeVision from "@/assets/images/home/vision.jpg";

import homeHero from "@/assets/images/home/hero.jpg";
import homeLancement from "@/assets/images/home/lancement.jpg";
import axeEntrepreneuriat from "@/assets/images/home/axe-entrepreneuriat.jpg";
import axeFormation from "@/assets/images/home/axe-formation.jpg";
import axeLeadership from "@/assets/images/home/axe-leadership.jpg";
import axeLeadershipNew from "@/assets/images/home/axe-leadership-new.jpg";
import axeNumeriqueNew from "@/assets/images/home/axe-numerique-new.jpg";
import axeEcologieNew from "@/assets/images/home/axe-ecologie-new.jpg";
import axeEcologie from "@/assets/images/home/axe-ecologie.jpg";
import axeNumerique from "@/assets/home/axe-numerique.jpg";

import oppAnimateur from "@/assets/images/opportunities/animateur-projet.jpg";
import oppEies from "@/assets/images/opportunities/certificat-eies.jpg";
import oppRedaction from "@/assets/images/opportunities/redaction-tdr.jpg";
import animateurProjetIntervenants from "@/assets/opportunities/animateur-projet-intervenants.jpg";

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
    animateurProjet: oppAnimateur,
    animateurProjetIntervenants,
    certificatEies: oppEies,
    redactionTdr: oppRedaction,
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
  home: {
    hero: homeHero,
    vision: homeVision,
    defis: axeLeadership,
    impact: homeLancement,
    lancement: homeLancement,
    axes: {
      entrepreneuriat: axeEntrepreneuriat,
      formation: axeFormation,
      leadership: axeLeadershipNew,
      numerique: axeNumeriqueNew,
      ecologie: axeEcologieNew,
    },
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
