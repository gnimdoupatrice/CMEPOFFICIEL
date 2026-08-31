import article1 from "@/assets/magazine/juin-environnement.jpg";
import article2 from "@/assets/magazine/sport-vert-kpendjal.jpg";
import article3 from "@/assets/magazine/formation-redaction-kara.jpg";
import article4 from "@/assets/magazine/diketi-2026.jpg";
import article5 from "@/assets/magazine/formation-animation-projet.jpg";

export type ArticleBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

export type EditorialArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  focal?: string;
  location: string;
  image: string;
  body: ArticleBlock[];
  featured?: boolean;
};

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: "diketi-2026",
    featured: true,
    title: "DIKETI 2026 : le CMEP a porté la voix des régions dans le débat entrepreneurial.",
    excerpt:
      "Retour sur les Rencontres Nationales sur l'Entrepreneuriat à Lomé, où le CMEP est intervenu en panel sur le thème « Réussir depuis les régions ».",
    category: "Reportage",
    date: "02 – 04 juillet 2026",
    location: "Lomé, Togo",
    image: article4,
    body: [
      {
        type: "p",
        text: "Le CHRIS Mentorship & Empowerment Program (CMEP) a pris part à DIKETI 2026, les Rencontres Nationales sur l'Entrepreneuriat organisées à Lomé par le Ministère du Développement à la Base et de l'Économie Sociale et Solidaire (MDBESS).",
      },
      {
        type: "p",
        text: "Cet événement d'envergure a réuni des acteurs de l'écosystème entrepreneurial, des institutions publiques, des partenaires au développement, des experts ainsi que de nombreux jeunes entrepreneurs, autour de réflexions et de partages d'expériences visant à promouvoir l'entrepreneuriat au Togo.",
      },
      {
        type: "p",
        text: "Le CMEP a été honoré d'y être représenté par son Program Manager, M. Christian AKAKPO, intervenu en qualité de panéliste lors du premier panel consacré au thème : « Réussir depuis les régions : réalités, défis et opportunités ». Il y a partagé son expérience de terrain et sa vision d'un entrepreneuriat inclusif, capable de valoriser le potentiel des régions et de créer des opportunités durables pour les jeunes, en mettant l'accent sur l'accompagnement, le mentorat et le développement des compétences comme leviers de réussite entrepreneuriale.",
      },
      {
        type: "p",
        text: "Cette participation s'inscrit dans la mission du CMEP : contribuer à l'émergence d'une jeunesse engagée, autonome et porteuse de solutions innovantes pour le développement des communautés togolaises.",
      },
    ],
  },
  {
    id: "sport-vert-kpendjal",
    title: "Kpendjal 1 : comment s'est déroulé le lancement de l'initiative « Sport vert ».",
    excerpt:
      "Débat citoyen avec les autorités, activité sportive et une centaine d'arbres plantés : retour sur deux journées de mobilisation dans la commune de Kpendjal 1.",
    category: "Reportage",
    date: "26 – 27 juin 2026",
    location: "Kpendjal 1, Togo",
    image: article2,
    body: [
      {
        type: "p",
        text: "L'initiative « Sport vert », pour une gouvernance locale participative et la restauration de l'environnement, a été lancée avec succès dans la commune de Kpendjal 1, avec l'appui de la Mairie. Placée sous le thème « Jeunesse engagée, gouvernance participative et protection de l'environnement pour un développement local durable », l'activité a été organisée par le Programme CMEP et l'ONG À Nous la Planète.",
      },
      {
        type: "p",
        text: "Le lancement, le vendredi 26 juin, a réuni les autorités locales, les jeunes et les organisations de la société civile, en présence du Secrétaire Général de la Préfecture et de Madame le Maire de Kpendjal 1. Le débat citoyen qui a suivi a permis aux jeunes d'échanger directement avec les autorités sur les enjeux de la gouvernance participative, le Secrétaire Général prenant lui-même part aux discussions.",
      },
      {
        type: "p",
        text: "Le lendemain, samedi 27 juin, les participants ont pris part à une activité sportive suivie d'une opération de reboisement : environ 100 arbres ont été plantés, marquant le lancement officiel de l'initiative dans la commune.",
      },
      {
        type: "p",
        text: "Cette activité vise à renforcer la participation citoyenne des jeunes dans la gouvernance locale et la préservation de l'environnement. Les organisateurs remercient les autorités locales, les forces de l'ordre et les organisations de la société civile pour leur appui.",
      },
    ],
  },
  {
    id: "formation-redaction-kara",
    title: "À Kara, 24 jeunes ont été outillés aux techniques de rédaction professionnelle.",
    excerpt:
      "Cinq modules pratiques, dix femmes parmi les participants et la naissance d'un réseau de jeunes engagés : retour sur une journée de formation à l'ANVT Kara.",
    category: "Retour d'activité",
    date: "26 juin 2026",
    location: "Kara, Togo",
    image: article3,
    focal: "50% 55%",
    body: [
      {
        type: "p",
        text: "L'Agence Nationale du Volontariat au Togo (ANVT) à Kara a accueilli une formation en rédaction administrative et professionnelle organisée par le CHRIS Mentorship & Empowerment Programme (CMEP), avec l'appui technique du Gouvernorat de la région de la Kara, de l'ANVT, de l'Espace Campus France de l'université de Kara et de Plan International Togo.",
      },
      {
        type: "p",
        text: "Vingt-quatre participants, dont dix femmes, ont renforcé leurs compétences en communication écrite à travers cinq modules pratiques :",
      },
      {
        type: "ul",
        items: [
          "Dr BADAMELI a ouvert les travaux en clarifiant la différence entre compte rendu et rapport : fidélité aux faits pour l'un, analyse et recommandations pour l'autre.",
          "M. WADJA, Conseiller juridique du Gouverneur, a détaillé les codes de la lettre administrative et de la note de service, avec un accent sur le respect de la voie hiérarchique.",
          "Mme AMOSSOU Katchobi (ANVT) a présenté les techniques de rédaction des lettres de demande, de réclamation et de motivation.",
          "Dr BADAMELI est revenu pour un atelier pratique sur la mise en page Word et PDF : sommaire automatique, police, marges, conversion professionnelle.",
          "M. Franck (Plan International Togo) a livré des conseils clés pour constituer un dossier de candidature compétitif : lire l'appel, soigner CV et lettre de motivation, valoriser stages et volontariat, respecter les délais.",
        ],
      },
      {
        type: "p",
        text: "Au-delà des acquis techniques, la journée a été marquée par des échanges riches, des exercices de groupe et la naissance d'un Réseau des Jeunes Engagés pour le Développement Communautaire. Cette formation confirme qu'une bonne maîtrise de l'écrit reste un levier essentiel d'insertion académique, professionnelle et associative pour la jeunesse togolaise.",
      },
    ],
  },
  {
    id: "juin-mois-environnement",
    title: "Juin, mois de l'action environnementale : ce que le CMEP a réalisé sur le terrain.",
    excerpt:
      "Reboisement, pépinières, randonnée à Lumen Valley : retour sur la deuxième édition du Locavore-tourisme, entre Journée Nationale de l'Arbre et Journée Mondiale de l'Environnement.",
    category: "Retour d'activité",
    date: "1er juin 2026",
    location: "Togo",
    image: article1,
    body: [
      {
        type: "p",
        text: "Le 1er juin, le Togo a célébré la Journée Nationale de l'Arbre. Le 5 juin, le monde entier s'est mobilisé pour la Journée Mondiale de l'Environnement.",
      },
      {
        type: "p",
        text: "Le CMEP (CHRIS Mentorship & Empowerment Program) a contribué à sa manière à travers la deuxième édition du Locavore-tourisme, articulée autour de quatre volets :",
      },
      {
        type: "ul",
        items: [
          "Reboisement avec les communautés locales",
          "Initiation à la création de pépinières pour une reforestation durable",
          "Randonnée guidée à Lumen Valley pour sensibiliser au tourisme durable",
          "Jeux et activités d'amusement pour renforcer la cohésion et l'engagement des jeunes",
        ],
      },
      {
        type: "p",
        text: "Chaque action compte. Protéger notre planète, c'est sécuriser notre avenir.",
      },
      {
        type: "p",
        text: "Le CMEP remercie l'ONG A3E pour son accueil et son engagement, ainsi que tous les participants des différentes structures pour leur dynamique participation. Agissons ensemble. La suite nous appartient.",
      },
    ],
  },
  {
    id: "formation-animation-projet",
    title: "Retour sur la formation « Animation de projet » : quatre jours, onze modules.",
    excerpt:
      "Professionnels et étudiants réunis à Lomé avec le club Cephal-AUF Togo pour un parcours intensif de gestion et de pilotage de projets.",
    category: "Retour d'activité",
    date: "01 – 04 juin 2026",
    location: "Lomé, Togo",
    image: article5,
    body: [
      {
        type: "p",
        text: "Le Programme CMEP a organisé, avec l'appui du club Cephal-AUF Togo, une formation intensive sur l'Animation de projet à Lomé, réunissant professionnels et étudiants autour d'un objectif commun : renforcer leurs compétences en gestion et pilotage de projets.",
      },
      {
        type: "p",
        text: "Pendant quatre jours, les participants ont exploré un parcours complet en onze modules : fondamentaux de la gestion de projet et introduction à la sauvegarde, cadrage et analyse des besoins, planification, réunions efficaces, tableau de bord et suivi, gestion des risques (incluant les risques liés à la sauvegarde), animation d'équipe sans autorité hiérarchique, communication avec les parties prenantes, évaluation de l'impact, capitalisation et clôture de projet, ainsi que politiques de sauvegarde, VBG et protection.",
      },
      {
        type: "p",
        text: "Une formation riche, concrète et résolument tournée vers la pratique, qui a permis à chaque participant de repartir avec des outils directement applicables sur le terrain. Le CMEP remercie l'AUF Togo pour son engagement constant et le club de l'Université de Lomé pour son accueil.",
      },
    ],
  },
];

export function getArticle(id: string) {
  return EDITORIAL_ARTICLES.find((a) => a.id === id);
}

/**
 * Fusionne les articles publiés depuis la base avec les articles statiques.
 * Les articles de la base ont la priorité (même identifiant = même article).
 */
export function mergeEditorialArticles(
  dbArticles: readonly EditorialArticle[] | undefined | null,
): EditorialArticle[] {
  const db = (dbArticles ?? []).filter((a) => a && a.id);
  const ids = new Set(db.map((a) => a.id));
  return [...db, ...EDITORIAL_ARTICLES.filter((a) => !ids.has(a.id))];
}
