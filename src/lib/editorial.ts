import { CMEP_MEDIA } from "@/lib/media";

export type EditorialArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  location: string;
  image: string;
  source: string;
  featured?: boolean;
};

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: "anvt-cmep",
    featured: true,
    title: "CMEP et ANVT : une passerelle nationale pour l'engagement des jeunes.",
    excerpt:
      "À travers les échanges menés avec l'Agence Nationale du Volontariat au Togo, le programme consolide une approche où mentorat, volontariat et insertion professionnelle se répondent.",
    category: "Institutionnel",
    date: "Juin 2026",
    readTime: "7 min",
    location: "Togo",
    image: CMEP_MEDIA.team,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_cmep-anvt-kara-activity-7477382452274184194-rILI",
  },
  {
    id: "renforcement-capacites",
    title: "Renforcement de capacités : quand la formation devient un levier d'autonomie.",
    excerpt:
      "Retour sur les sessions de formation CMEP qui outillent les jeunes en gestion de projet, leadership, communication et développement durable.",
    category: "Formation",
    date: "Juin 2026",
    readTime: "5 min",
    location: "Togo",
    image: CMEP_MEDIA.opportunities.animateurProjetIntervenants,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_cmep-formation-renforcementcapacites-activity-7474803148881256448-2Yni",
  },
  {
    id: "journee-arbre",
    title: "1er juin : la citoyenneté écologique au cœur du parcours CMEP.",
    excerpt:
      "La Journée nationale de l'arbre rappelle que l'employabilité durable passe aussi par la protection de l'environnement et l'éducation citoyenne.",
    category: "Écologie",
    date: "1er juin 2026",
    readTime: "4 min",
    location: "Togo",
    image: CMEP_MEDIA.opportunities.certificatEies,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_chaque-1er-juin-de-chaque-ann%C3%A9e-est-c%C3%A9l%C3%A9br%C3%A9e-activity-7467438823187050496-ctO4",
  },
  {
    id: "sikatour-universite",
    title: "SIKA Tour, CMEP et université : connecter les talents aux écosystèmes.",
    excerpt:
      "Une rencontre autour de l'orientation, de l'entrepreneuriat et de la mise en réseau pour aider les jeunes à transformer les idées en trajectoires concrètes.",
    category: "Événement",
    date: "Mai 2026",
    readTime: "6 min",
    location: "Togo",
    image: CMEP_MEDIA.partners.universiteKara,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_sikatour-cmep-universitedekara-activity-7443915664379121664-VC8a",
  },
  {
    id: "locavore-tourisme",
    title: "Locavore, tourisme et développement durable : le terrain comme laboratoire.",
    excerpt:
      "CMEP met en avant des modèles économiques locaux, responsables et capables de créer de la valeur dans les chaînes touristiques et alimentaires.",
    category: "Analyse",
    date: "Avril 2026",
    readTime: "8 min",
    location: "Togo",
    image: CMEP_MEDIA.opportunities.redactionTdr,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_cmep-locavoretourisme-daezveloppementdurable-activity-7437412725321936896-MCZ3",
  },
  {
    id: "jeunes-enfants",
    title: "Jeunes et enfants : transmettre tôt les réflexes de leadership.",
    excerpt:
      "L'action communautaire du programme s'élargit à la sensibilisation, à l'écoute et à la transmission de compétences de base pour les plus jeunes publics.",
    category: "Communauté",
    date: "Mars 2026",
    readTime: "5 min",
    location: "Togo",
    image: CMEP_MEDIA.team,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_renforcement-jeunes-enfants-activity-7431637066213601281--ehF",
  },
  {
    id: "management-projet",
    title: "Management de projet : professionnaliser les idées avant le financement.",
    excerpt:
      "Les modules de management de projet accompagnent les participants de l'analyse des besoins à la planification, jusqu'au suivi-évaluation.",
    category: "Formation",
    date: "Février 2026",
    readTime: "6 min",
    location: "Togo",
    image: CMEP_MEDIA.opportunities.animateurProjet,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_cmep-formation-managementdeprojet-activity-7424029145338249216-faBQ",
  },
  {
    id: "impact-environnemental",
    title: "Impact environnemental : une compétence stratégique pour les porteurs de projets.",
    excerpt:
      "CMEP documente l'importance des évaluations environnementales et sociales dans la conception de projets sérieux et finançables.",
    category: "Développement durable",
    date: "Février 2026",
    readTime: "7 min",
    location: "Togo",
    image: CMEP_MEDIA.opportunities.certificatEies,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_cmep-daezveloppementdurable-impactenvironnemental-activity-7426925397960790016-r25f",
  },
  {
    id: "mentorat-impact",
    title: "Mentorat, jeunesse, impact : la méthode CMEP expliquée.",
    excerpt:
      "Le mentorat n'est pas un supplément : c'est l'infrastructure relationnelle qui permet aux jeunes de tenir dans la durée.",
    category: "Éditorial",
    date: "Janvier 2026",
    readTime: "4 min",
    location: "Togo",
    image: CMEP_MEDIA.logo,
    source:
      "https://www.linkedin.com/posts/chris-mentorship-empowerment-program-cmep_mentorat-jeunesse-impact-activity-7416106819426918400-i2KT",
  },
];
