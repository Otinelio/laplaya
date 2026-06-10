export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "entrees" | "plats" | "mer" | "vegetarien" | "desserts" | "cocktails";
  image: string;
  tags?: ("spicy" | "vegan" | "signature")[];
};

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MENU: MenuItem[] = [
  // Entrées
  { id: "e1", category: "entrees", name: "Tartare de thon mariné au gingembre", description: "Thon rouge, gingembre frais, sésame, sauce soja yuzu", price: 4500, image: U("photo-1565299507177-b0ac66763828") },
  { id: "e2", category: "entrees", name: "Salade tropicale de crevettes et avocat", description: "Crevettes, avocat, mangue, vinaigrette passion", price: 3800, image: U("photo-1546069901-ba9599a7e63c") },
  { id: "e3", category: "entrees", name: "Bruschetta façon La Playa", description: "Pain grillé, tomates, basilic, huile d'olive vierge", price: 2500, image: U("photo-1572695157366-5e585ab2b69f") },
  { id: "e4", category: "entrees", name: "Plateau de crudités et houmous maison", description: "Légumes croquants, houmous, tapenade, pain pita", price: 2800, image: U("photo-1540420773420-3366772f4999") },

  // Plats
  { id: "p1", category: "plats", name: "Côte de bœuf grillée sauce poivre vert", description: "500g, sauce poivre vert, pommes grenailles, légumes du marché", price: 18500, image: U("photo-1546833999-b9f581a1996d"), tags: ["signature"] },
  { id: "p2", category: "plats", name: "Poulet fermier rôti aux herbes", description: "Riz au lait de coco, légumes braisés, jus aux herbes", price: 9500, image: U("photo-1598103442097-8b74394b95c6") },
  { id: "p3", category: "plats", name: "Pavé de barracuda grillé", description: "Purée de plantain, beurre blanc citronné", price: 11500, image: U("photo-1467003909585-2f8a72700288") },
  { id: "p4", category: "plats", name: "Entrecôte de thon mi-cuit", description: "Légumes asiatiques croquants, sauce teriyaki", price: 13000, image: U("photo-1467003909585-2f8a72700288") },

  // Mer
  { id: "m1", category: "mer", name: "Plateau de fruits de mer", description: "Homard, crevettes, calamar, huîtres — pour 2", price: 35000, image: U("photo-1559737558-2f5a35f4523b"), tags: ["signature"] },
  { id: "m2", category: "mer", name: "Brochettes de crevettes flambées au rhum", description: "Crevettes royales, flambée au rhum vieux, riz parfumé", price: 9800, image: U("photo-1625938145744-e380515399b7") },
  { id: "m3", category: "mer", name: "Carpaccio de daurade royale", description: "Citronnelle, gingembre, huile d'olive, fleur de sel", price: 7500, image: U("photo-1535400255456-da13eafdf6dc") },

  // Végétarien
  { id: "v1", category: "vegetarien", name: "Curry de légumes au lait de coco", description: "Légumes du marché, riz basmati, coriandre", price: 6500, image: U("photo-1455619452474-d2be8b1e70cd"), tags: ["vegan"] },
  { id: "v2", category: "vegetarien", name: "Risotto aux champignons et parmesan", description: "Riz arborio, mélange de champignons, copeaux de parmesan", price: 7000, image: U("photo-1476124369491-e7addf5db371") },

  // Desserts
  { id: "d1", category: "desserts", name: "Fondant au chocolat noir", description: "Cœur coulant, glace vanille bourbon", price: 3500, image: U("photo-1606313564200-e75d5e30476c") },
  { id: "d2", category: "desserts", name: "Tarte tatin ananas caramélisé", description: "Ananas victoria, caramel beurre salé, glace coco", price: 3200, image: U("photo-1488477181946-6428a0291777") },
  { id: "d3", category: "desserts", name: "Panna cotta coco et coulis de mangue", description: "Crème coco infusée, coulis de mangue fraîche", price: 2800, image: U("photo-1488477181946-6428a0291777") },

  // Cocktails
  { id: "c1", category: "cocktails", name: "La Playa Signature", description: "Rhum blanc, fruit de la passion, gingembre, sirop coco", price: 4500, image: U("photo-1551024506-0bccd828d307"), tags: ["signature"] },
  { id: "c2", category: "cocktails", name: "Sunset Mojito", description: "Rhum, menthe, citron, sirop d'hibiscus", price: 4000, image: U("photo-1514362545857-3bc16c4c7d1b") },
  { id: "c3", category: "cocktails", name: "Blue Ocean", description: "Vodka, curaçao bleu, limonade, citron", price: 4200, image: U("photo-1536935338788-846bb9981813") },
  { id: "c4", category: "cocktails", name: "Virgin Tropical", description: "Mangue, ananas, grenadine, soda — sans alcool", price: 2500, image: U("photo-1546171753-97d7676e4602") },
  { id: "c5", category: "cocktails", name: "Bière locale pression", description: "33cl — fraîche", price: 1500, image: U("photo-1551024709-8f23befc6f87") },
  { id: "c6", category: "cocktails", name: "Eau minérale", description: "50cl plate ou gazeuse", price: 1000, image: U("photo-1564419320461-6870880221ad") },
  { id: "c7", category: "cocktails", name: "Café / Thé", description: "Espresso, allongé, thé noir ou vert", price: 1200, image: U("photo-1495474472287-4d71bcdd2085") },
];

export const MENU_CATEGORIES = [
  { id: "entrees", label: "Entrées", icon: "Utensils" as const },
  { id: "plats", label: "Plats Principaux", icon: "Flame" as const },
  { id: "mer", label: "Poissons & Fruits de Mer", icon: "Fish" as const },
  { id: "vegetarien", label: "Végétarien", icon: "Leaf" as const },
  { id: "desserts", label: "Desserts", icon: "Cake" as const },
  { id: "cocktails", label: "Cocktails & Boissons", icon: "Wine" as const },
] as const;

export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  view: "mer" | "jardin" | "plage";
  type: "suite" | "chambre" | "bungalow" | "cabane";
  amenities: string[];
  images: string[];
  available: boolean;
};

export const ROOMS: Room[] = [
  { id: "r1", name: "Suite Prestige Vue Mer", description: "Lit king-size, terrasse vue mer panoramique, jacuzzi privatif, climatisation, minibar premium.", price: 120000, view: "mer", type: "suite", amenities: ["Wifi", "Wind", "Tv", "Coffee", "Bath"], images: [U("photo-1566073771259-6a8506099945"), U("photo-1551882547-ff40c63fe5fa"), U("photo-1582719478250-c89cae4dc85b")], available: true },
  { id: "r2", name: "Chambre Deluxe Vue Jardin", description: "Lit queen-size, terrasse vue jardin tropical, climatisation, minibar.", price: 75000, view: "jardin", type: "chambre", amenities: ["Wifi", "Wind", "Tv", "Coffee"], images: [U("photo-1611892440504-42a792e24d32"), U("photo-1631049307264-da0ec9d70304")], available: true },
  { id: "r3", name: "Bungalow Romantique", description: "Accès plage privé, douche extérieure, lit king-size sous moustiquaire.", price: 150000, view: "plage", type: "bungalow", amenities: ["Wifi", "Wind", "Coffee", "Bath"], images: [U("photo-1540541338287-41700207dee6"), U("photo-1602002418082-a4443e081dd1")], available: true },
  { id: "r4", name: "Suite Familiale", description: "2 chambres, salon, kitchenette, vue mer — idéal pour les familles.", price: 180000, view: "mer", type: "suite", amenities: ["Wifi", "Wind", "Tv", "Coffee", "Bath"], images: [U("photo-1591088398332-8a7791972843"), U("photo-1578683010236-d716f9a3f461")], available: false },
  { id: "r5", name: "Cabane Premium Plage", description: "Accès direct plage, hamac privé, climatisation, lit king-size.", price: 200000, view: "plage", type: "cabane", amenities: ["Wifi", "Wind", "Coffee", "Bath"], images: [U("photo-1520250497591-112f2f40a3f4"), U("photo-1571896349842-33c89424de2d")], available: true },
  { id: "r6", name: "Chambre Standard", description: "Vue jardin, climatisation, lit double ou twin.", price: 50000, view: "jardin", type: "chambre", amenities: ["Wifi", "Wind", "Tv"], images: [U("photo-1631049552057-403cdb8f0658"), U("photo-1505693416388-ac5ce068fe85")], available: true },
];

export type EventItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  price: string;
  description: string;
  image: string;
};

export const EVENTS: EventItem[] = [
  { id: "ev1", title: "Sunset Afterwork", category: "Soirée DJ", date: "Tous les vendredis", time: "18h00 – 21h00", price: "5 000 FCFA (consommation incluse)", description: "DJ set en bord de mer, cocktails spéciaux et coucher de soleil.", image: U("photo-1571266028243-d220c6a6b937") },
  { id: "ev2", title: "Brunch Dominical La Playa", category: "Brunch", date: "Tous les dimanches", time: "11h00 – 15h00", price: "12 000 FCFA", description: "Buffet généreux, live music, mimosas et ambiance jazzy.", image: U("photo-1551782450-a2132b4ba21d") },
  { id: "ev3", title: "Nuit Blanche Tropicale", category: "Sunset Party", date: "Samedi 28 Juin", time: "21h00 – 04h00", price: "10 000 FCFA", description: "DJ international, beach party, performances live.", image: U("photo-1492684223066-81342ee5ff30") },
  { id: "ev4", title: "Privatisation & Événements Corporate", category: "Événement Privé", date: "Sur demande", time: "Personnalisable", price: "Sur devis", description: "Anniversaires, mariages, séminaires — La Playa s'adapte à vos envies.", image: U("photo-1519225421980-715cb0215aed") },
];

export const TESTIMONIALS = [
  { name: "Aminata K.", date: "Mars 2025", stars: 5, quote: "Un cadre paradisiaque, un service impeccable. Nous avons vécu le plus beau couché de soleil de notre séjour ici." },
  { name: "Jean-Marc L.", date: "Février 2025", stars: 5, quote: "La Playa est une véritable parenthèse enchantée. Cuisine raffinée, cocktails créatifs, équipe attentionnée." },
  { name: "Sophie M.", date: "Janvier 2025", stars: 5, quote: "Nous avons organisé notre mariage ici. Tout était parfait, du dîner au DJ set sous les étoiles." },
];

export const GALLERY = [
  { id: 1, src: U("photo-1571896349842-33c89424de2d", 1200), category: "Resort" },
  { id: 2, src: U("photo-1455587734955-081b22074882", 1200), category: "Resort" },
  { id: 3, src: U("photo-1414235077428-338989a2e8c0", 1200), category: "Restaurant" },
  { id: 4, src: U("photo-1551024506-0bccd828d307", 1200), category: "Bar" },
  { id: 5, src: U("photo-1492684223066-81342ee5ff30", 1200), category: "Événements" },
  { id: 6, src: U("photo-1507525428034-b723cf961d3e", 1200), category: "Plage" },
  { id: 7, src: U("photo-1540541338287-41700207dee6", 1200), category: "Resort" },
  { id: 8, src: U("photo-1551218808-94e220e084d2", 1200), category: "Restaurant" },
  { id: 9, src: U("photo-1514362545857-3bc16c4c7d1b", 1200), category: "Bar" },
  { id: 10, src: U("photo-1519225421980-715cb0215aed", 1200), category: "Événements" },
  { id: 11, src: U("photo-1582967788606-a171c1080cb0", 1200), category: "Plage" },
  { id: 12, src: U("photo-1571003123894-1f0594d2b5d9", 1200), category: "Nuit" },
  { id: 13, src: U("photo-1566073771259-6a8506099945", 1200), category: "Resort" },
  { id: 14, src: U("photo-1559339352-11d035aa65de", 1200), category: "Restaurant" },
  { id: 15, src: U("photo-1536935338788-846bb9981813", 1200), category: "Bar" },
];