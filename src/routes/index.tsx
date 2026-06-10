import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Users, Target, Briefcase, GraduationCap, Sparkles, Zap, Leaf, Quote, TrendingUp, Heart, Compass, Award, Calendar, MapPin, HelpCircle, Newspaper, Megaphone, Clock, Flame, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


import partnerUK from "@/assets/partners/universite-kara.jpg.asset.json";
import partnerA3E from "@/assets/partners/ong-a3e.jpg.asset.json";
import partnerKEmpire from "@/assets/partners/k-empire.jpg.asset.json";
import partnerFV from "@/assets/partners/france-volontaires.jpg.asset.json";
import partnerSTADD from "@/assets/partners/ong-stadd.jpg.asset.json";
import partnerYouth from "@/assets/partners/youth-panel.jpg.asset.json";
import partnerCephal from "@/assets/partners/club-cephal.jpg.asset.json";
import partnerBege from "@/assets/partners/bege-shoot.jpg.asset.json";
import partnerAnjped from "@/assets/partners/anjped-che.jpg.asset.json";
import partnerDonBosco from "@/assets/partners/don-bosco.jpg.asset.json";
import partnerRotaract from "@/assets/partners/rotaract-kara.jpg.asset.json";
import partnerANLP from "@/assets/partners/anlp.jpg.asset.json";

const PARTNER_LOGOS = [
  { name: "Université de Kara", logo: partnerUK.url },
  { name: "ONG A3E", logo: partnerA3E.url },
  { name: "K-EMPIRE", logo: partnerKEmpire.url },
  { name: "France Volontaires", logo: partnerFV.url },
  { name: "ONG STADD", logo: partnerSTADD.url },
  { name: "Youth Panel — Plan International Togo", logo: partnerYouth.url },
  { name: "Club CEPHAL", logo: partnerCephal.url },
  { name: "BEGE SHOOT", logo: partnerBege.url },
  { name: "Association ANJPED-CHE", logo: partnerAnjped.url },
  { name: "Centre Don Bosco", logo: partnerDonBosco.url },
  { name: "Rotaract Club — Université de Kara", logo: partnerRotaract.url },
  { name: "ONG A Nous La Planète (ANLP)", logo: partnerANLP.url },
];

// Actualité phare (featured story hero)
const FEATURED_STORY = {
  date: "15 mai 2025",
  category: "Reportage terrain",
  location: "Université de Kara",
  readTime: "6 min de lecture",
  title: "À Kara, 120 jeunes ouvrent une nouvelle page du CMEP.",
  kicker: "Promotion 2025 — Cohorte annuelle",
  excerpt:
    "Sous les voûtes de l'amphithéâtre de l'Université de Kara, mentors, partenaires institutionnels et bénéficiaires ont scellé l'engagement d'une promotion qui marquera l'année. Récit d'une cérémonie où la jeunesse togolaise a repris la parole.",
};

// Actualités secondaires éditoriales (magazine)
const ACTUALITES = [
  {
    date: "28 avril 2025",
    category: "Partenariat",
    location: "Kara, Togo",
    title: "Convention historique avec le Centre Don Bosco",
    excerpt: "Un accord-cadre qui ouvre les ateliers techniques à 60 jeunes supplémentaires et installe le mentorat au cœur des métiers manuels.",
  },
  {
    date: "10 avril 2025",
    category: "Impact",
    location: "Incubateur CMEP",
    title: "Démo-day : huit projets, une génération qui entreprend",
    excerpt: "Agro-transformation, micro-services numériques, économie circulaire — la première promo d'incubés a défendu ses projets devant un jury exigeant.",
  },
];

// Opportunités premium — parcours d'excellence
const FEATURED_OPPORTUNITIES = [
  {
    badge: "Programme phare",
    type: "Appel à candidatures",
    title: "Promotion 2025 — Mentorat Entrepreneurial",
    duration: "6 mois · Janvier → Juin",
    seats: "12 places restantes",
    deadline: "30 juin 2025",
    location: "Kara, Togo",
    urgency: "Clôture imminente",
    perks: ["Mentor 1:1 dédié", "Fonds de micro-amorçage", "Réseau international"],
  },
  {
    badge: "Tech intensif",
    type: "Formation",
    title: "Bootcamp Innovation Numérique",
    duration: "4 semaines intensives",
    seats: "20 places",
    deadline: "15 juillet 2025",
    location: "Kara, Togo",
    urgency: "Inscriptions ouvertes",
    perks: ["Hackathon final", "Mise en relation employeurs", "Certification"],
  },
  {
    badge: "Insertion pro",
    type: "Stage conventionné",
    title: "Programme d'insertion 2025",
    duration: "Permanent",
    seats: "Cohortes rolling",
    deadline: "Candidature continue",
    location: "Région de la Kara",
    urgency: "Toute l'année",
    perks: ["Stage rémunéré", "Suivi 6 mois", "Forum employeurs"],
  },
];

import heroImg from "@/assets/hero-mentorship.jpg";
import challengeImg from "@/assets/challenge-youth.jpg";
import visionImg from "@/assets/vision-banner.jpg";
import impactImg from "@/assets/impact-banner.jpg";
import axisEntrepreneur from "@/assets/entrepreneur.jpg";
import axisWorkshop from "@/assets/workshop.jpg";
import axisLeadership from "@/assets/solidarity.jpg";
import axisFormation from "@/assets/axis-formation.jpg";
import axisDigital from "@/assets/axis-digital.jpg";
import axisCitizenship from "@/assets/axis-citizenship.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CMEP Togo — Mentorat et autonomisation de la jeunesse togolaise" },
      { name: "description", content: "Le Chris Mentorship & Empowerment Program accompagne chaque année 500+ jeunes togolais vers l'emploi, l'entrepreneuriat et le leadership. Région pilote : Kara." },
      { property: "og:title", content: "CMEP Togo — Propulser une génération vers l'autonomie" },
      { property: "og:description", content: "Mentorat, formation, leadership, innovation, citoyenneté : cinq leviers au service de la jeunesse togolaise." },
      { property: "og:image", content: heroImg },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const OBJECTIVES = [
  {
    num: "01",
    icon: Briefcase,
    title: "Développer les capacités entrepreneuriales",
    desc: "Faire émerger une nouvelle génération de jeunes entrepreneurs togolais, capables de créer leur propre activité et de générer de la valeur pour leur communauté.",
    activities: ["Bootcamps d'idéation et de prototypage", "Accompagnement à la création de micro-entreprises", "Accès à un réseau de mentors et de financeurs"],
    beneficiaries: "Jeunes de 18 à 35 ans porteurs de projets",
    results: "150 micro-entreprises lancées d'ici 2027",
  },
  {
    num: "02",
    icon: Users,
    title: "Promouvoir le mentorat intergénérationnel",
    desc: "Connecter chaque jeune à un mentor qualifié, capable de partager son expérience, d'ouvrir son réseau et de l'aider à éviter les écueils du parcours professionnel.",
    activities: ["Mise en relation 1:1 jeune / mentor", "Sessions collectives de mentorat thématique", "Communauté d'entraide en continu"],
    beneficiaries: "Tous les bénéficiaires des cohortes CMEP",
    results: "100 binômes mentor/mentoré actifs par an",
  },
  {
    num: "03",
    icon: Target,
    title: "Favoriser l'insertion professionnelle",
    desc: "Construire des passerelles concrètes vers l'emploi par la formation aux métiers porteurs, l'accompagnement à la candidature et le placement en stage ou en alternance.",
    activities: ["Ateliers CV, entretien, posture professionnelle", "Stages conventionnés avec les partenaires", "Forums emploi en région de la Kara"],
    beneficiaries: "Jeunes diplômés et déscolarisés",
    results: "60% des bénéficiaires en emploi ou activité 12 mois après",
  },
  {
    num: "04",
    icon: Leaf,
    title: "Ancrer un développement durable",
    desc: "Inscrire chaque action du programme dans une logique d'impact social, environnemental et territorial mesurable, au service des communautés de la région.",
    activities: ["Projets communautaires pilotés par les jeunes", "Formations à l'écocitoyenneté", "Suivi d'indicateurs ODD"],
    beneficiaries: "Communautés rurales et périurbaines de la Kara",
    results: "20 projets communautaires structurants par an",
  },
] as const;

const AXES = [
  {
    num: "01",
    title: "Entrepreneuriat & Emploi",
    image: axisEntrepreneur,
    context: "Au Togo, plus de 30% des jeunes diplômés peinent à accéder à un premier emploi stable. Dans la région de la Kara, ce chiffre grimpe encore davantage du fait du déficit d'opportunités structurées.",
    problem: "Le manque d'accompagnement, l'absence de capital de départ et la faible exposition aux écosystèmes économiques privent une génération entière de la possibilité d'entreprendre.",
    approach: "Le CMEP active un parcours en trois temps : sensibilisation à l'entrepreneuriat, incubation des projets viables, puis post-incubation avec mentorat et mise en relation avec des financeurs locaux et internationaux.",
    activities: ["Bootcamps d'idéation (5 jours)", "Programme d'incubation (12 semaines)", "Mentorat individuel mensuel", "Accès à un fonds de micro-amorçage"],
    indicators: "Nombre d'entreprises créées, chiffre d'affaires généré, emplois indirects, taux de survie à 24 mois.",
  },
  {
    num: "02",
    title: "Formation Technique & Professionnelle  ",
    image: axisFormation,
    context: "La fracture entre les formations académiques disponibles et les besoins réels du marché togolais reste l'un des principaux freins à l'insertion. Les métiers techniques recrutent — mais peinent à trouver des profils qualifiés.",
    problem: "Trop de jeunes sortent du système éducatif sans compétence directement valorisable. Les formations professionnelles existantes sont souvent saturées, coûteuses ou éloignées des zones rurales.",
    approach: "Le CMEP déploie des modules courts, intensifs et certifiants sur les métiers porteurs : maintenance, agro-transformation, BTP, services numériques. Les sessions sont co-construites avec les employeurs partenaires.",
    activities: ["Modules certifiants de 4 à 12 semaines", "Mise en situation professionnelle", "Stages conventionnés", "Suivi post-formation pendant 6 mois"],
    indicators: "Taux de certification, taux d'insertion à 6 et 12 mois, satisfaction employeur.",
  },
  {
    num: "03",
    title: "Leadership & Engagement Communautaire  ",
    image: axisLeadership,
    context: "La jeunesse togolaise constitue plus de 60% de la population. Sans relais d'engagement structurés, son énergie reste sous-exploitée et son rôle dans la vie publique marginal.",
    problem: "Le déficit de figures inspirantes accessibles, le manque de formation au leadership et l'absence de cadres d'action communautaire freinent l'émergence d'une nouvelle élite engagée.",
    approach: "Le CMEP forme une nouvelle génération de leaders capables de porter des projets collectifs, de prendre la parole publique et d'agir comme catalyseurs dans leur quartier, leur village, leur secteur.",
    activities: ["Académie Leadership (10 sessions/an)", "Projets communautaires pilotés par les jeunes", "Forums citoyens", "Mentorat par des figures inspirantes"],
    indicators: "Nombre de leaders formés, projets communautaires lancés, participation citoyenne mesurée.",
  },
  {
    num: "04",
    title: "Innovation Numérique    ",
    image: axisDigital,
    context: "Le numérique est l'opportunité économique la plus accessible pour les jeunes togolais — à condition de disposer des compétences et des outils. Or la fracture numérique reste profonde, surtout hors de Lomé.",
    problem: "Manque d'accès aux équipements, absence de formations qualifiantes, faible exposition aux métiers du futur : les jeunes de la Kara restent à l'écart de la révolution numérique africaine.",
    approach: "Le CMEP installe des parcours intensifs sur les compétences numériques recherchées : développement web, marketing digital, design, data, IA appliquée. Objectif : connecter les talents locaux à l'économie numérique mondiale.",
    activities: ["Bootcamps tech (4 à 16 semaines)", "Hackathons régionaux", "Mise en relation avec employeurs distants", "Accompagnement freelance"],
    indicators: "Compétences certifiées, contrats freelance signés, emplois numériques décrochés.",
  },
  {
    num: "05",
    title: "Citoyenneté & Écologie  ",
    image: axisCitizenship,
    context: "Les défis climatiques et environnementaux frappent durement la région de la Kara : dégradation des sols, déforestation, gestion des déchets. La jeunesse est en première ligne, et porteuse de solutions.",
    problem: "Sans formation, sans cadre, sans reconnaissance, l'engagement écologique des jeunes reste fragmenté et peu visible. Le lien entre citoyenneté et action environnementale est encore peu structuré.",
    approach: "Le CMEP fédère les initiatives écocitoyennes des jeunes, leur donne des outils méthodologiques et finance des projets pilotes à fort impact local : reboisement, économie circulaire, sensibilisation scolaire.",
    activities: ["Brigades vertes locales", "Formations à l'écocitoyenneté", "Projets de reboisement et de gestion des déchets", "Campagnes de sensibilisation"],
    indicators: "Hectares reboisés, tonnes de déchets traités, jeunes mobilisés, écoles sensibilisées.",
  },
] as const;

const PROGRAMS = [
  {
    title: "Académie CMEP — Cohorte Annuelle    ",
    image: axisWorkshop,
    description: "Le programme phare du CMEP : un parcours intensif de 6 mois combinant formation technique, mentorat individuel et projet collectif.",
    objectives: "Former 120 jeunes par an aux compétences clés de l'employabilité et du leadership.",
    activities: "Modules présentiels, ateliers de pratique, mentorat 1:1, séminaire résidentiel de clôture.",
    beneficiaries: "Jeunes de 18 à 30 ans, région de la Kara, sélectionnés sur dossier et entretien.",
    duration: "6 mois — Janvier à juin",
    results: "80% des diplômés en emploi, en formation supérieure ou créateurs d'activité à 12 mois.",
  },
  {
    title: "Bootcamp Innovation Numérique",
    image: axisDigital,
    description: "Un parcours intensif de 4 semaines pour former de jeunes Togolais aux métiers du numérique recherchés sur le marché africain et international.",
    objectives: "Faire émerger 60 talents numériques par an, employables immédiatement.",
    activities: "Cours, projets en équipe, hackathon final, mise en relation avec employeurs distants.",
    beneficiaries: "Jeunes de 18 à 35 ans, motivation et logique de base requises — aucune expérience préalable.",
    duration: "4 semaines intensives",
    results: "70% des participants décrochent un premier contrat tech (CDI, freelance, stage) sous 6 mois.",
  },
  {
    title: "Incubateur d'Entreprises Sociales",
    image: axisEntrepreneur,
    description: "Un programme d'incubation de 12 semaines pour les jeunes porteurs de projets à impact social ou environnemental dans la région de la Kara.",
    objectives: "Accompagner 30 projets par an de l'idée au lancement effectif.",
    activities: "Coaching individuel, ateliers business model, mentorat par entrepreneurs confirmés, démo-day final.",
    beneficiaries: "Jeunes entrepreneurs ayant une idée structurée ou un MVP.",
    duration: "12 semaines",
    results: "50% des projets passent en phase de commercialisation, 25% lèvent un premier financement.",
  },
] as const;

const TESTIMONIALS = [
  {
    quote: "Le mentorat reçu au CMEP a transformé ma vision. J'ai lancé mon atelier de couture six mois après la formation, et j'emploie aujourd'hui deux apprenties.",
    name: "Aïcha B.",
    role: "Entrepreneuse — Promotion 2023",
    journey: "Diplômée en couture, sans débouché. Aujourd'hui à la tête de son atelier à Kara.",
    image: testimonial1,
  },
  {
    quote: "Le CMEP m'a donné les outils pour transformer mon idée en activité. Sans ce programme, mon entreprise n'existerait pas.",
    name: "Kossi A.",
    role: "Fondateur, AgriTech Kara",
    journey: "Diplômé en agronomie, incubé par le CMEP, a lancé une plateforme de mise en marché agricole.",
    image: testimonial2,
  },
  {
    quote: "CMEP comble un vide criant : celui de l'accompagnement réel des jeunes vers l'autonomie économique. Un partenaire d'avenir pour notre région.",
    name: "Pr. K. Tchassona",
    role: "Université de Kara",
    journey: "Partenaire institutionnel du programme depuis sa création.",
    image: testimonial3,
  },
] as const;

function Home() {
  return (
    <Layout>
      {/* ============ HERO IMMERSIF ============ */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Jeunes togolais en session de mentorat à Kara" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/70 to-ngo-navy/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ngo-navy/80 via-ngo-navy/30 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-ngo-gold animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white">Chris Mentorship & Empowerment Program</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.02] tracking-tight mb-8">
              Propulser une génération togolaise vers <span className="text-ngo-gold">l'autonomie</span>, l'emploi et le leadership.
            </h1>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-2xl font-light">
              Le <strong className="text-white font-semibold">Chris Mentorship & Empowerment Program</strong> accompagner chaque année <strong className="text-ngo-gold font-semibold">100 jeunes togolais</strong> par le mentorat, la formation, l'innovation et l'engagement communautaire.
            </p>
            <div className="flex flex-wrap gap-4 mb-14">
              <Link to="/opportunites" className="bg-ngo-gold text-ngo-navy px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-all shadow-2xl shadow-ngo-gold/30">
                Rejoindre le programme <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="border-2 border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors">
                Devenir mentor
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl pt-10 border-t border-white/20">
              {[
                { v: "100+", l: "Jeunes/an" },
                { v: "60%", l: "Insertion ciblée" },
                { v: "12", l: "Partenaires" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ POURQUOI LE CMEP ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <img src={challengeImg} alt="Jeune entrepreneuse togolaise dans son atelier à Kara" loading="lazy" className="w-full h-[560px] object-cover rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-ngo-navy text-white p-6 rounded-2xl shadow-xl max-w-[240px]">
              <div className="text-4xl font-black text-ngo-gold mb-1">+30%</div>
              <div className="text-xs uppercase tracking-widest font-bold text-white/70">de chômage chez les jeunes diplômés togolais</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Pourquoi le CMEP existe</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 mb-6 leading-[1.05] tracking-tight">
              Une génération en attente d'opportunités réelles.
            </h2>
            <div className="space-y-4 text-ngo-slate text-base leading-relaxed">
              <p>
                Au Togo, plus de <strong className="text-ngo-navy">60% de la population a moins de 25 ans</strong>. Cette force démographique est aussi un défi : sans accompagnement structuré, des milliers de jeunes terminent leur formation sans débouché clair, sans mentor pour les guider, sans réseau pour les propulser.
              </p>
              <p>
                Dans la région de la Kara, le déficit d'opportunités économiques se conjugue à l'éloignement des écosystèmes nationaux. Les talents existent — mais restent invisibles, sous-exploités, fragmentés.
              </p>
              <p>
                Le CMEP est né d'un constat simple : <strong className="text-ngo-navy">aucun programme ne peut transformer une vie aussi puissamment que le mentorat, la formation et l'accompagnement combinés.</strong>
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {[
                { k: "Chômage des jeunes diplômés", v: "Élevé" },
                { k: "Accès au mentorat structuré", v: "Quasi inexistant" },
                { k: "Offre d'incubation en région", v: "Très limitée" },
                { k: "Fracture numérique hors Lomé", v: "Profonde" },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between py-3 border-b border-ngo-navy/10">
                  <span className="text-sm font-medium text-ngo-slate">{row.k}</span>
                  <span className="text-sm font-bold text-ngo-gold">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ NOTRE VISION — Bannière immersive ============ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <img src={visionImg} alt="Jeunes togolais regardant l'horizon au coucher du soleil" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ngo-navy via-ngo-navy/85 to-ngo-navy/40"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Notre Vision</span>
          <Quote size={56} className="text-ngo-gold/40 mt-8 mb-6" strokeWidth={1} />
          <p className="text-3xl md:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-10">
            « Faire émerger une jeunesse togolaise <span className="text-ngo-gold">autonome, compétente et engagée</span>, capable de transformer durablement son territoire et de prendre place dans l'économie africaine de demain. »
          </p>
          <div className="space-y-5 text-white/85 text-lg leading-relaxed font-light max-w-3xl">
            <p>
              Nous projetons un Togo où chaque jeune, quel que soit son point de départ, accède à un mentor qualifié, à une formation reconnue et à un réseau d'opportunités concrètes.
            </p>
            <p>
              Un Togo où la région de la Kara devient un foyer de talents reconnus, exportant ses entrepreneurs, ses ingénieurs, ses leaders dans toute la sous-région ouest-africaine.
            </p>
            <p>
              Un Togo où le mentorat n'est plus un privilège, mais un droit accessible à toutes et à tous.
            </p>
          </div>
        </div>
      </section>

      {/* ============ NOTRE MISSION ============ */}
      <section className="py-24 px-6 bg-ngo-pearl">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Notre Mission</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Bâtir la plateforme de référence du mentorat et de l'autonomisation des jeunes au Togo.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Compass, label: "Ce que nous faisons", text: "Nous combinons mentorat individuel, formation technique, accompagnement entrepreneurial et engagement communautaire dans un parcours intégré et mesurable." },
              { icon: Heart, label: "Pour qui", text: "Pour les jeunes togolais de 18 à 35 ans, qu'ils soient diplômés en quête d'emploi, porteurs de projet ou en rupture éducative, particulièrement dans la région de la Kara." },
              { icon: Sparkles, label: "Comment", text: "Par une approche holistique mêlant cohortes de formation, mentorat 1:1, incubation, projets communautaires et mise en relation avec un réseau d'acteurs engagés." },
              { icon: Award, label: "Pourquoi", text: "Parce que l'autonomisation économique de la jeunesse est le levier le plus puissant de transformation sociale, et que chaque jeune mérite un mentor et une chance." },
            ].map((b) => (
              <div key={b.label} className="bg-white p-8 rounded-2xl border border-ngo-navy/5 hover:border-ngo-gold/40 hover:shadow-xl transition-all">
                <div className="size-12 rounded-2xl bg-ngo-navy text-white grid place-items-center mb-6">
                  <b.icon size={20} strokeWidth={2.2} />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-3">{b.label}</div>
                <p className="text-sm text-ngo-slate leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ NOS OBJECTIFS — Une carte premium par objectif ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Nos Objectifs</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Quatre objectifs structurants, mesurables et ancrés sur le terrain.
            </h2>
            <p className="text-ngo-slate text-base leading-relaxed mt-5">
              Chaque objectif est porté par des activités concrètes, des bénéficiaires identifiés et des indicateurs de résultat suivis dans la durée.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {OBJECTIVES.map((o) => (
              <article key={o.num} className="bg-ngo-pearl p-8 rounded-3xl border border-transparent hover:border-ngo-gold/40 hover:bg-white hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div className="size-14 rounded-2xl bg-ngo-navy text-white grid place-items-center">
                    <o.icon size={22} strokeWidth={2.2} />
                  </div>
                  <span className="text-3xl font-black text-ngo-navy/15">{o.num}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-ngo-navy mb-4 leading-tight">{o.title}</h3>
                <p className="text-sm text-ngo-slate leading-relaxed mb-6">{o.desc}</p>

                <div className="space-y-4 pt-5 border-t border-ngo-navy/10">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-2">Activités prévues</div>
                    <ul className="space-y-1.5">
                      {o.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-ngo-slate">
                          <Check size={14} className="text-ngo-gold mt-0.5 shrink-0" strokeWidth={3} /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-1">Bénéficiaires</div>
                      <p className="text-xs text-ngo-slate leading-snug">{o.beneficiaries}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-1">Résultat attendu</div>
                      <p className="text-xs text-ngo-slate leading-snug">{o.results}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AXES STRATÉGIQUES — Mini-pages avec image dédiée ============ */}
      <section className="py-24 px-6 bg-ngo-pearl">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Axes Stratégiques</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Cinq leviers, déployés comme des programmes à part entière.
            </h2>
          </div>

          <div className="space-y-20">
            {AXES.map((axis, i) => (
              <article key={axis.num} className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-6 relative">
                  <img src={axis.image} alt={`Axe ${axis.title}`} loading="lazy" className="w-full h-[460px] object-cover rounded-3xl shadow-xl" />
                  <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-ngo-navy shadow-lg">
                    Axe {axis.num}
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-ngo-navy mb-6 leading-tight tracking-tight">{axis.title}</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-2">Contexte</div>
                      <p className="text-sm text-ngo-slate leading-relaxed">{axis.context}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-2">Problématique</div>
                      <p className="text-sm text-ngo-slate leading-relaxed">{axis.problem}</p>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-2">Approche CMEP</div>
                      <p className="text-sm text-ngo-slate leading-relaxed">{axis.approach}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-ngo-navy/10">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-navy mb-2">Activités prévues</div>
                      <ul className="space-y-1.5">
                        {axis.activities.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-xs text-ngo-slate">
                            <span className="size-1.5 mt-1.5 rounded-full bg-ngo-gold shrink-0"></span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-ngo-navy mb-2">Indicateurs de réussite</div>
                      <p className="text-xs text-ngo-slate leading-relaxed">{axis.indicators}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROGRAMMES ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Programmes Phares</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 leading-[1.05] tracking-tight">
              Des initiatives concrètes, mesurables et déployées chaque année.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((p) => (
              <article key={p.title} className="group bg-ngo-pearl rounded-3xl overflow-hidden border border-transparent hover:border-ngo-gold/40 hover:shadow-2xl transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-extrabold text-ngo-navy mb-3 leading-tight">{p.title}</h3>
                  <p className="text-sm text-ngo-slate leading-relaxed mb-5">{p.description}</p>

                  <dl className="space-y-3 pt-4 border-t border-ngo-navy/10 text-xs">
                    {[
                      ["Objectifs", p.objectives],
                      ["Activités", p.activities],
                      ["Bénéficiaires", p.beneficiaries],
                      ["Durée", p.duration],
                      ["Résultats attendus", p.results],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] uppercase tracking-widest font-bold text-ngo-gold mb-1">{k}</dt>
                        <dd className="text-ngo-slate leading-relaxed">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ IMPACT — Bannière immersive ============ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <img src={impactImg} alt="Jeunes togolais en atelier communautaire" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ngo-navy/95 via-ngo-navy/90 to-ngo-navy/95"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Impact Attendu</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 leading-[1.05] tracking-tight">
              Des résultats mesurables au service d'une génération.
            </h2>
            <p className="text-white/70 text-base leading-relaxed mt-5">
              Chaque indicateur est suivi, audité et publié dans nos rapports annuels d'activité.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Users, num: "100+", title: "Jeunes formés / an", desc: "Cohortes annuelles déployées en région de la Kara, sélectionnées sur dossier et entretien." },
              { icon: TrendingUp, num: "60%", title: "Taux d'insertion ciblé", desc: "Emploi salarié, micro-entreprise ou poursuite d'études supérieures dans les 12 mois." },
              { icon: Sparkles, num: "1", title: "Plateforme de mentorat", desc: "Infrastructure pérenne de mise en relation jeunes/mentors, structurante pour le territoire." },
              { icon: Award, num: "12+", title: "Partenariats structurants", desc: "Universités, ONG, entreprises et institutions publiques engagées dans la durée." },
            ].map((s) => (
              <div key={s.title} className="bg-white/[0.06] border border-white/15 backdrop-blur-md p-7 rounded-2xl hover:bg-white/[0.1] hover:border-ngo-gold/40 transition-all">
                <div className="size-11 rounded-xl bg-ngo-gold grid place-items-center mb-6">
                  <s.icon size={18} className="text-ngo-navy" strokeWidth={2.5} />
                </div>
                <div className="text-5xl font-black text-white mb-2 tracking-tight">{s.num}</div>
                <div className="text-sm font-bold text-ngo-gold mb-3 uppercase tracking-wider">{s.title}</div>
                <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TÉMOIGNAGES ILLUSTRÉS ============ */}
      <section className="py-24 px-6 bg-ngo-pearl">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14 text-center mx-auto">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Témoignages</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-ngo-navy mt-4 tracking-tight">Ils ont traversé le programme.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="bg-white rounded-3xl overflow-hidden border border-ngo-navy/5 shadow-sm hover:shadow-2xl transition-shadow">
                <div className="aspect-[5/4] overflow-hidden">
                  <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-7">
                  <Quote size={28} className="text-ngo-gold mb-3" strokeWidth={1.5} />
                  <blockquote className="text-ngo-navy text-base leading-relaxed mb-5 font-medium">
                    « {t.quote} »
                  </blockquote>
                  <figcaption className="pt-5 border-t border-ngo-navy/10">
                    <div className="font-bold text-base text-ngo-navy">{t.name}</div>
                    <div className="text-[11px] text-ngo-gold uppercase tracking-widest mt-1 font-bold">{t.role}</div>
                    <p className="text-xs text-ngo-slate mt-3 leading-relaxed">{t.journey}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ACTUALITÉS & OPPORTUNITÉS — magazine éditorial premium ============ */}
      <section className="relative bg-ngo-pearl">
        {/* ---- En-tête de section ---- */}
        <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-12">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-ngo-gold" />
                <span className="text-ngo-gold text-[10px] uppercase tracking-[0.35em] font-bold">Le magazine du programme</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ngo-navy leading-[1.02] tracking-tight">
                Reportages, parcours, cohortes — <span className="text-ngo-gold">la jeunesse togolaise en mouvement.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-ngo-slate text-base md:text-lg leading-relaxed font-light border-l border-ngo-navy/15 pl-6">
                Chaque mois, le CMEP raconte ses cérémonies, ses bootcamps, ses incubés et ouvre les portes de ses prochaines cohortes. Plongez dans l'écosystème.
              </p>
            </div>
          </div>
        </div>

        {/* ---- FEATURED STORY — actualité phare immersive ---- */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <article className="group relative rounded-[28px] overflow-hidden bg-ngo-navy shadow-[0_30px_80px_-30px_rgba(15,42,95,0.45)]">
            <div className="grid lg:grid-cols-12 min-h-[560px]">
              {/* Image plein-cadre */}
              <div className="relative lg:col-span-7 min-h-[340px] lg:min-h-[600px] overflow-hidden">
                <img
                  src={axisWorkshop}
                  alt="Cérémonie de lancement de la Promotion 2025 du CMEP à l'Université de Kara"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy/85 via-ngo-navy/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ngo-navy/40" />
                {/* Badge live */}
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-ngo-gold animate-ping opacity-60" />
                    <span className="relative w-2 h-2 rounded-full bg-ngo-gold" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-ngo-navy">À la une</span>
                </div>
              </div>

              {/* Contenu éditorial */}
              <div className="relative lg:col-span-5 p-9 md:p-12 lg:p-14 flex flex-col justify-between text-white">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-bold mb-7">
                    <span className="text-ngo-gold">{FEATURED_STORY.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-white/70 flex items-center gap-1.5"><Calendar size={11} /> {FEATURED_STORY.date}</span>
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/50 mb-4">{FEATURED_STORY.kicker}</p>
                  <h3 className="font-extrabold text-3xl md:text-4xl lg:text-[42px] leading-[1.05] tracking-tight mb-6">
                    {FEATURED_STORY.title}
                  </h3>
                  <p className="text-white/75 text-[15px] md:text-base leading-relaxed font-light mb-8 max-w-md">
                    {FEATURED_STORY.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/55 uppercase tracking-widest font-semibold mb-10">
                    <span className="flex items-center gap-1.5"><MapPin size={11} className="text-ngo-gold" /> {FEATURED_STORY.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} className="text-ngo-gold" /> {FEATURED_STORY.readTime}</span>
                  </div>
                </div>

                <Link
                  to="/actualites"
                  className="inline-flex items-center gap-3 self-start bg-ngo-gold text-ngo-navy px-7 py-4 rounded-xl font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-white transition-colors shadow-xl shadow-ngo-gold/20"
                >
                  Lire l'histoire <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* ---- ACTUALITÉS SECONDAIRES — grille éditoriale magazine ---- */}
        <div className="max-w-7xl mx-auto px-6 pb-28">
          <div className="flex items-baseline justify-between mb-10 pb-5 border-b border-ngo-navy/15">
            <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-ngo-navy flex items-center gap-3">
              <Newspaper size={14} className="text-ngo-gold" /> Dernières dépêches
            </h3>
            <Link to="/actualites" className="inline-flex items-center gap-1.5 text-ngo-slate hover:text-ngo-gold font-bold text-[10px] uppercase tracking-[0.25em] transition-colors">
              Toutes les actualités <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {ACTUALITES.map((a, i) => (
              <article key={a.title} className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-ngo-navy/5">
                  <img
                    src={i === 0 ? challengeImg : axisEntrepreneur}
                    alt={a.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold px-3 py-1.5 rounded-full">
                    {a.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ngo-slate font-semibold mb-3">
                  <span className="flex items-center gap-1.5"><Calendar size={11} className="text-ngo-gold" /> {a.date}</span>
                  <span className="w-1 h-1 rounded-full bg-ngo-navy/25" />
                  <span className="flex items-center gap-1.5"><MapPin size={11} className="text-ngo-gold" /> {a.location}</span>
                </div>

                <h4 className="text-2xl md:text-[26px] font-extrabold text-ngo-navy leading-[1.15] tracking-tight mb-3 group-hover:text-ngo-gold transition-colors">
                  {a.title}
                </h4>
                <p className="text-[15px] text-ngo-slate leading-relaxed font-light mb-5">{a.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-ngo-navy font-bold text-[11px] uppercase tracking-[0.25em] group-hover:text-ngo-gold transition-colors">
                  Lire la suite <ArrowUpRight size={12} />
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* ---- OPPORTUNITÉS PREMIUM — parcours d'excellence ---- */}
        <div className="bg-ngo-navy relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-ngo-gold/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] bg-ngo-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-32">
            <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-12 bg-ngo-gold" />
                  <span className="text-ngo-gold text-[10px] uppercase tracking-[0.35em] font-bold">Opportunités ouvertes</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.02] tracking-tight">
                  Rejoindre une <span className="text-ngo-gold">cohorte</span>, candidater à un parcours.
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-white/65 text-base md:text-lg leading-relaxed font-light border-l border-white/20 pl-6">
                  Trois portes d'entrée vers le CMEP : un programme phare de mentorat, un bootcamp tech, et un dispositif d'insertion en continu. Sélection sur dossier, frais couverts.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {FEATURED_OPPORTUNITIES.map((opp, i) => {
                const images = [axisEntrepreneur, axisDigital, axisFormation];
                const isUrgent = opp.urgency.toLowerCase().includes("imminente");
                return (
                  <article
                    key={opp.title}
                    className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-ngo-gold/40 hover:bg-white/[0.08] transition-all duration-500 flex flex-col"
                  >
                    {/* Cohort image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={images[i]}
                        alt={opp.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ngo-navy via-ngo-navy/30 to-transparent" />
                      {/* Badge */}
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-ngo-gold text-ngo-navy text-[10px] uppercase tracking-[0.22em] font-extrabold px-3 py-1.5 rounded-full">
                        <Award size={11} /> {opp.badge}
                      </span>
                      {/* Urgency badge */}
                      {isUrgent && (
                        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 bg-red-500/95 text-white text-[10px] uppercase tracking-[0.22em] font-extrabold px-3 py-1.5 rounded-full">
                          <Flame size={11} /> {opp.urgency}
                        </span>
                      )}
                    </div>

                    <div className="p-7 md:p-8 flex flex-col flex-1">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-ngo-gold mb-3">{opp.type}</span>
                      <h3 className="font-extrabold text-xl md:text-[22px] text-white leading-[1.15] tracking-tight mb-5 group-hover:text-ngo-gold transition-colors">
                        {opp.title}
                      </h3>

                      {/* Timeline / meta */}
                      <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-white/10 text-[11px]">
                        <div>
                          <div className="text-white/40 uppercase tracking-widest font-semibold text-[9px] mb-1">Durée</div>
                          <div className="text-white font-bold flex items-center gap-1.5"><Clock size={11} className="text-ngo-gold" /> {opp.duration}</div>
                        </div>
                        <div>
                          <div className="text-white/40 uppercase tracking-widest font-semibold text-[9px] mb-1">Places</div>
                          <div className="text-white font-bold flex items-center gap-1.5"><Users size={11} className="text-ngo-gold" /> {opp.seats}</div>
                        </div>
                        <div>
                          <div className="text-white/40 uppercase tracking-widest font-semibold text-[9px] mb-1">Clôture</div>
                          <div className="text-white font-bold flex items-center gap-1.5"><Calendar size={11} className="text-ngo-gold" /> {opp.deadline}</div>
                        </div>
                        <div>
                          <div className="text-white/40 uppercase tracking-widest font-semibold text-[9px] mb-1">Lieu</div>
                          <div className="text-white font-bold flex items-center gap-1.5"><MapPin size={11} className="text-ngo-gold" /> {opp.location}</div>
                        </div>
                      </div>

                      {/* Perks */}
                      <ul className="space-y-2 mb-7">
                        {opp.perks.map((perk) => (
                          <li key={perk} className="flex items-start gap-2.5 text-[13px] text-white/75 font-light">
                            <Check size={14} className="text-ngo-gold shrink-0 mt-0.5" /> {perk}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/opportunites"
                        className="mt-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-ngo-gold hover:text-ngo-navy text-white border border-white/15 hover:border-ngo-gold px-5 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all"
                      >
                        Candidater <ArrowRight size={12} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-white/10">
              <p className="text-white/55 text-sm font-light max-w-xl leading-relaxed">
                Une question avant de candidater ? La coordination CMEP répond personnellement à chaque sollicitation sous 48 h.
              </p>
              <Link to="/opportunites" className="inline-flex items-center gap-2 text-ngo-gold hover:text-white font-bold text-[11px] uppercase tracking-[0.25em] transition-colors">
                Voir toutes les opportunités <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ============ PARTENAIRES — mur de logos institutionnel ============ */}
      <section className="py-28 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-16 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-ngo-gold" />
                <span className="text-ngo-gold text-[10px] uppercase tracking-[0.35em] font-bold">Nos Partenaires</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ngo-navy leading-[1.02] tracking-tight">
                Une coalition d'acteurs <span className="text-ngo-gold">engagés</span> pour la jeunesse.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-ngo-slate text-base md:text-lg leading-relaxed font-light border-l border-ngo-navy/15 pl-6">
                Institutions académiques, ONG internationales, collectifs citoyens et entreprises locales : ces partenaires rendent possible chaque cohorte du CMEP.
              </p>
            </div>
          </div>

          {/* Mur de partenaires éditorial — typographie institutionnelle, filets sobres */}
          <div className="border-y border-ngo-navy/15">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {PARTNER_LOGOS.map((p, i) => (
                <div
                  key={p.name}
                  className={`group relative flex flex-col items-center justify-center text-center px-6 py-12 min-h-[160px] border-ngo-navy/10 transition-colors hover:bg-ngo-pearl ${
                    (i + 1) % 2 !== 0 ? "border-r sm:border-r" : ""
                  } ${(i + 1) % 3 !== 0 ? "sm:border-r" : "sm:border-r-0"} ${
                    (i + 1) % 4 !== 0 ? "lg:border-r" : "lg:border-r-0"
                  } ${i < PARTNER_LOGOS.length - (PARTNER_LOGOS.length % 4 || 4) ? "lg:border-b" : ""} border-b last:border-b-0`}
                >
                  <span className="text-[10px] tabular-nums text-ngo-gold font-bold tracking-[0.35em] mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base font-bold text-ngo-navy leading-snug tracking-tight group-hover:text-ngo-gold transition-colors">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-ngo-slate">
              {PARTNER_LOGOS.length} partenaires institutionnels · Région de la Kara, Togo
            </p>
            <Link to="/partenaires" className="inline-flex items-center gap-2 text-ngo-navy hover:text-ngo-gold font-bold text-[11px] uppercase tracking-[0.3em] border-b border-ngo-navy/20 hover:border-ngo-gold pb-1.5 transition-colors">
              Devenir partenaire <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FAQ — éditorial deux colonnes ============ */}
      <section className="py-28 md:py-32 px-6 bg-ngo-pearl">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-ngo-gold" />
                <span className="text-ngo-gold text-[10px] uppercase tracking-[0.35em] font-bold">Questions fréquentes</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ngo-navy leading-[1.02] tracking-tight mb-8">
                L'essentiel pour bien <span className="text-ngo-gold">comprendre</span> le CMEP.
              </h2>
              <p className="text-ngo-slate text-base md:text-lg leading-relaxed font-light border-l border-ngo-navy/15 pl-6 mb-10">
                Candidats, partenaires, donateurs : voici les réponses aux questions que l'on nous pose le plus souvent. Pour aller plus loin, consultez la page dédiée ou contactez notre équipe.
              </p>
              <Link to="/faq" className="inline-flex items-center gap-2 text-ngo-navy hover:text-ngo-gold font-bold text-[11px] uppercase tracking-[0.3em] border-b border-ngo-navy/20 hover:border-ngo-gold pb-1.5 transition-colors">
                <HelpCircle size={13} /> Voir toutes les questions <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="divide-y divide-ngo-navy/15 border-y border-ngo-navy/15">
              {[
                {
                  q: "Qui peut candidater au programme CMEP ?",
                  a: "Tout jeune togolais entre 18 et 35 ans, diplômé ou non, résidant prioritairement dans la région de la Kara. Aucune expérience préalable n'est requise pour la majorité des programmes — la motivation et l'engagement comptent davantage que le diplôme.",
                },
                {
                  q: "Les formations sont-elles payantes ?",
                  a: "Non. L'intégralité des programmes CMEP est gratuite pour les bénéficiaires sélectionnés. Les coûts sont couverts par nos partenaires institutionnels, donateurs et programmes de bourses.",
                },
                {
                  q: "Quels types de partenariats le CMEP propose-t-il ?",
                  a: "Partenariats techniques (formation, mentorat, experts), institutionnels (co-construction de programmes), financiers (soutien à une cohorte) ou en nature (équipements, locaux, services). Chaque partenariat fait l'objet d'une convention claire et mesurable.",
                },
                {
                  q: "Comment le CMEP utilise-t-il les fonds reçus ?",
                  a: "68% directement alloués aux programmes (formation, mentorat, bourses), 18% à la coordination et au suivi-évaluation, 9% à la communication et au plaidoyer, 5% aux frais administratifs. Chaque ligne est auditée annuellement.",
                },
                {
                  q: "Comment mesurez-vous l'impact réel du programme ?",
                  a: "Un dispositif de suivi-évaluation indépendant est en place : enquêtes à 6 et 12 mois après la formation, suivi de cohortes sur 3 ans, indicateurs alignés sur les ODD. Les résultats sont publiés dans notre rapport annuel.",
                },
              ].map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-home-${i}`}
                  className="border-0"
                >
                  <AccordionTrigger className="text-left py-7 hover:no-underline group [&[data-state=open]_.faq-num]:text-ngo-gold">
                    <div className="grid grid-cols-[auto_1fr] gap-6 items-start w-full pr-4">
                      <span className="faq-num font-mono text-[11px] tracking-widest text-ngo-slate/60 tabular-nums pt-1 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg md:text-xl font-extrabold text-ngo-navy leading-[1.25] tracking-tight group-hover:text-ngo-gold transition-colors">
                        {item.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-ngo-slate leading-relaxed text-[15px] font-light pb-7 pl-[44px] pr-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-ngo-navy rounded-3xl p-12 md:p-16 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-ngo-gold/15 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <span className="text-ngo-gold text-[10px] uppercase tracking-[0.25em] font-bold">Rejoignez-nous</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-6 leading-[1.05] tracking-tight">Un programme, deux engagements possibles.</h2>
            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-lg">
              Que vous soyez un jeune en quête d'opportunités ou un professionnel souhaitant transmettre, votre place est au sein du CMEP.
            </p>
            <ul className="space-y-3 mb-10">
              {["Inscription gratuite aux cohortes de formation", "Mise en relation avec des mentors qualifiés", "Accès à un réseau de partenaires engagés"].map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/85 text-sm">
                  <Check size={16} className="text-ngo-gold" strokeWidth={3} /> {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-ngo-gold text-ngo-navy px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors inline-flex items-center gap-2">
                Envoyer mon engagement <ArrowRight size={16} />
              </Link>
              <Link to="/opportunites" className="border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Voir les opportunités
              </Link>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4">
            {[
              { num: "100+", l: "Jeunes accompagnés" },
              { num: "60%", l: "Insertion ciblée" },
              { num: "12", l: "Partenaires actifs" },
              { num: "5", l: "Axes stratégiques" },
            ].map((s) => (
              <div key={s.l} className="bg-white/[0.06] border border-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="text-3xl font-black text-ngo-gold mb-1">{s.num}</div>
                <div className="text-[11px] uppercase tracking-widest font-bold text-white/70 leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
