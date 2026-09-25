export type Tone = "green" | "blue" | "red" | "amber" | "neutral";
export type RoleId = "gerant" | "adjoint" | "superviseur" | "pompiste";
export type ViewId =
  | "overview"
  | "map"
  | "fleet"
  | "drivers"
  | "missions"
  | "fuel"
  | "tanks"
  | "alerts"
  | "geofences"
  | "procam"
  | "maintenance"
  | "reports"
  | "users"
  | "settings";

export const roles: { id: RoleId; label: string; title: string; initials: string }[] = [
  { id: "gerant", label: "Moussa Diabaté", title: "Gérant — vue groupe", initials: "MD" },
  { id: "adjoint", label: "Awa Traoré", title: "Adjointe — toutes stations", initials: "AT" },
  { id: "superviseur", label: "Yao Kouadio", title: "Superviseur station", initials: "YK" },
  { id: "pompiste", label: "Jean-Marc Brou", title: "Pompiste — relevés", initials: "JB" },
];

export const stations = [
  { id: "all", name: "Toutes les stations", city: "Côte d’Ivoire" },
  { id: "riviera", name: "Riviera 3", city: "Abidjan" },
  { id: "yopougon", name: "Yopougon Niangon", city: "Abidjan" },
  { id: "bassam", name: "Dépôt Bassam", city: "Grand-Bassam" },
];

export const navGroups: {
  title: string;
  items: { id: ViewId; label: string; badge?: number; roles?: RoleId[] }[];
}[] = [
  {
    title: "Pilotage",
    items: [
      { id: "overview", label: "Vue d’ensemble" },
      { id: "map", label: "Carte live" },
      { id: "fleet", label: "Flotte" },
      { id: "drivers", label: "Conducteurs" },
      { id: "missions", label: "Missions" },
    ],
  },
  {
    title: "Énergie",
    items: [
      { id: "fuel", label: "Carburant Pro Vision+" },
      { id: "tanks", label: "Cuves & pompes" },
    ],
  },
  {
    title: "Sécurité",
    items: [
      { id: "alerts", label: "Alertes", badge: 7 },
      { id: "geofences", label: "Géofences" },
      { id: "procam", label: "ProCam" },
    ],
  },
  {
    title: "Parc",
    items: [
      { id: "maintenance", label: "Maintenance" },
      { id: "reports", label: "Rapports" },
    ],
  },
  {
    title: "Administration",
    items: [
      { id: "users", label: "Utilisateurs", roles: ["gerant", "adjoint"] },
      { id: "settings", label: "Paramètres", roles: ["gerant", "adjoint", "superviseur"] },
    ],
  },
];

export const vehicles = [
  { id: "CI-4821-MD", type: "Citerne 45 000 L", driver: "K. Diabaté", status: "En mission", tone: "blue" as Tone, speed: 62, fuel: 88, idle: 4, score: 91, km: 186_420, hours: 8_412, site: "riviera", lat: 28, lng: 62, heading: 40, product: "Gasoil" },
  { id: "CI-1938-AB", type: "Citerne 32 000 L", driver: "S. Coulibaly", status: "À quai", tone: "green" as Tone, speed: 0, fuel: 12, idle: 18, score: 84, km: 142_110, hours: 6_901, site: "riviera", lat: 48, lng: 72, heading: 0, product: "Super" },
  { id: "CI-7704-KT", type: "Citerne 45 000 L", driver: "A. Koné", status: "Alerte siphonnage", tone: "red" as Tone, speed: 48, fuel: 71, idle: 9, score: 62, km: 210_044, hours: 9_880, site: "yopougon", lat: 58, lng: 38, heading: 210, product: "Gasoil" },
  { id: "CI-2201-YR", type: "Citerne 20 000 L", driver: "M. Touré", status: "En mission", tone: "blue" as Tone, speed: 71, fuel: 54, idle: 6, score: 88, km: 98_330, hours: 4_120, site: "bassam", lat: 70, lng: 78, heading: 95, product: "Gasoil" },
  { id: "CI-0912-PL", type: "Pickup supervision", driver: "Y. Kouadio", status: "Hors plage", tone: "amber" as Tone, speed: 34, fuel: 41, idle: 22, score: 73, km: 64_210, hours: 3_440, site: "riviera", lat: 36, lng: 54, heading: 12, product: "Super" },
  { id: "CI-5580-BT", type: "Benne chantier", driver: "I. Sanogo", status: "Ralenti", tone: "amber" as Tone, speed: 0, fuel: 63, idle: 41, score: 79, km: 41_002, hours: 5_610, site: "bassam", lat: 78, lng: 82, heading: 0, product: "Gasoil" },
  { id: "CI-3310-SP", type: "Citerne 12 cpts", driver: "F. Ouattara", status: "En mission", tone: "blue" as Tone, speed: 55, fuel: 92, idle: 3, score: 94, km: 155_900, hours: 7_201, site: "yopougon", lat: 42, lng: 30, heading: 160, product: "Jet A1" },
  { id: "CI-1044-CC", type: "Camion frigo", driver: "R. N’Guessan", status: "Chaîne du froid OK", tone: "green" as Tone, speed: 44, fuel: 48, idle: 7, score: 90, km: 88_450, hours: 4_880, site: "riviera", lat: 22, lng: 48, heading: 300, product: "Froid +4°C" },
];

export const drivers = [
  { name: "Kouadio Diabaté", vehicle: "CI-4821-MD", score: 91, trips: 18, harsh: 1, speeding: 0, idleH: 1.2, coaching: "Stable", permit: "C + ADR", expires: "12/2027" },
  { name: "Seydou Coulibaly", vehicle: "CI-1938-AB", score: 84, trips: 16, harsh: 3, speeding: 2, idleH: 2.4, coaching: "Freinages", permit: "C", expires: "03/2027" },
  { name: "Adama Koné", vehicle: "CI-7704-KT", score: 62, trips: 14, harsh: 6, speeding: 5, idleH: 3.1, coaching: "Prioritaire", permit: "C + ADR", expires: "08/2026" },
  { name: "Mariam Touré", vehicle: "CI-2201-YR", score: 88, trips: 15, harsh: 1, speeding: 1, idleH: 0.8, coaching: "Stable", permit: "C", expires: "01/2028" },
  { name: "Yao Kouadio", vehicle: "CI-0912-PL", score: 73, trips: 22, harsh: 2, speeding: 4, idleH: 4.6, coaching: "Hors horaires", permit: "B", expires: "11/2026" },
  { name: "Ibrahim Sanogo", vehicle: "CI-5580-BT", score: 79, trips: 11, harsh: 2, speeding: 1, idleH: 6.2, coaching: "Ralenti chantier", permit: "C", expires: "06/2027" },
];

export const missions = [
  { ref: "LIV-0925-018", truck: "CI-4821-MD", driver: "K. Diabaté", from: "GESTOCI Vridi", to: "Riviera 3", volume: "44 810 L", status: "En transit", tone: "blue" as Tone, eta: "14:35", progress: 68 },
  { ref: "LIV-0925-017", truck: "CI-1938-AB", driver: "S. Coulibaly", from: "GESTOCI Vridi", to: "Riviera 3", volume: "32 000 L", status: "Réconciliée", tone: "green" as Tone, eta: "08:42", progress: 100 },
  { ref: "LIV-0924-016", truck: "CI-7704-KT", driver: "A. Koné", from: "GESTOCI", to: "Yopougon", volume: "44 420 L", status: "Écart détecté", tone: "red" as Tone, eta: "17:16", progress: 100 },
  { ref: "MIS-0925-041", truck: "CI-5580-BT", driver: "I. Sanogo", from: "Dépôt Bassam", to: "Chantier PH 3", volume: "Gravats", status: "Sur site", tone: "amber" as Tone, eta: "En cours", progress: 40 },
  { ref: "COLD-0925-007", truck: "CI-1044-CC", driver: "R. N’Guessan", from: "Entrepôt Vridi", to: "Carrefour 2 Plateaux", volume: "+3,8 °C", status: "En livraison", tone: "blue" as Tone, eta: "15:10", progress: 54 },
];

export const tanks = [
  { site: "riviera", name: "Cuve A · Gasoil", level: 72, volume: "21 640 L", capacity: "30 000 L", color: "#f4a621" },
  { site: "riviera", name: "Cuve B · Super", level: 48, volume: "9 680 L", capacity: "20 000 L", color: "#22a66a" },
  { site: "riviera", name: "Cuve C · Gasoil", level: 18, volume: "3 610 L", capacity: "20 000 L", color: "#e96552" },
  { site: "yopougon", name: "Cuve 1 · Gasoil", level: 81, volume: "24 300 L", capacity: "30 000 L", color: "#f4a621" },
  { site: "bassam", name: "Cuve dépôt · Gasoil", level: 64, volume: "19 200 L", capacity: "30 000 L", color: "#f4a621" },
];

export const pumps = [
  { site: "riviera", name: "Pompe 1", product: "Gasoil", open: "12 448,3", close: "12 901,1", volume: "452,8 L" },
  { site: "riviera", name: "Pompe 2", product: "Super", open: "8 102,0", close: "8 340,6", volume: "238,6 L" },
  { site: "riviera", name: "Pompe 3", product: "Gasoil", open: "19 220,4", close: "19 511,9", volume: "291,5 L" },
  { site: "yopougon", name: "Pompe A", product: "Gasoil", open: "4 018,2", close: "4 410,0", volume: "391,8 L" },
];

export const fuelTx = [
  { time: "13:42", vehicle: "CI-4821-MD", type: "Chargement GESTOCI", liters: "+45 000", match: "OK GPS + bon", tone: "green" as Tone },
  { time: "13:18", vehicle: "CI-7704-KT", type: "Baisse anormale en transit", liters: "−420", match: "Hors station", tone: "red" as Tone },
  { time: "11:05", vehicle: "CI-0912-PL", type: "Plein station interne", liters: "+48", match: "Carte + sonde OK", tone: "green" as Tone },
  { time: "09:12", vehicle: "CI-1938-AB", type: "Dépotage Riviera 3", liters: "−32 000", match: "Écart 0,2 %", tone: "amber" as Tone },
];

export const alerts = [
  { level: "critical", title: "Variation de volume hors station", desc: "−420 L · CI-7704-KT · PK 18 Autoroute du Nord", time: "Il y a 18 min", module: "Pro Vision+" },
  { level: "warning", title: "Sortie de géofence hors horaires", desc: "Pickup CI-0912-PL a quitté Riviera 3 à 21:14", time: "Hier, 21:14", module: "Pro Vision" },
  { level: "warning", title: "Niveau de cuve faible", desc: "Cuve C · Gasoil à 18 % · Riviera 3", time: "Il y a 1 h", module: "Pro Fuel" },
  { level: "critical", title: "Freinage d’urgence + clip ProCam", desc: "A. Koné · 78 km/h · Boulevard Valéry Giscard", time: "Il y a 2 h", module: "ProCam" },
  { level: "info", title: "Code défaut moteur P0401", desc: "CI-5580-BT · EGR · maintenance à planifier", time: "Il y a 4 h", module: "Atelier" },
  { level: "info", title: "Écart de rapprochement", desc: "−0,7 % · LIV-0924-016", time: "Hier, 17:24", module: "Pro Fuel" },
  { level: "warning", title: "Ralenti > 15 min", desc: "Benne CI-5580-BT · chantier PH 3", time: "Il y a 26 min", module: "Télématique" },
];

export const geofences = [
  { name: "GESTOCI Vridi", type: "Chargement", vehicles: 8, events: "Entrée / sortie", hours: "06:00–22:00", status: "Active" },
  { name: "Station Riviera 3", type: "Dépôt autorisé", vehicles: 12, events: "Arrêt + dépotage", hours: "05:00–23:00", status: "Active" },
  { name: "Station Yopougon", type: "Dépôt autorisé", vehicles: 6, events: "Arrêt + dépotage", hours: "05:00–22:00", status: "Active" },
  { name: "Corridor Abidjan–Bassam", type: "Itinéraire", vehicles: 4, events: "Sortie de corridor", hours: "24/24", status: "Active" },
  { name: "Zone résidentielle Cocody", type: "Interdite hors mission", vehicles: 18, events: "Entrée hors plage", hours: "Interdit 20:00–05:00", status: "Active" },
];

export const camEvents = [
  { id: "CAM-4412", type: "Freinage brutal", driver: "A. Koné", vehicle: "CI-7704-KT", time: "12:08", risk: "Élevé", tone: "red" as Tone },
  { id: "CAM-4408", type: "Téléphone au volant", driver: "Y. Kouadio", vehicle: "CI-0912-PL", time: "11:41", risk: "Moyen", tone: "amber" as Tone },
  { id: "CAM-4399", type: "Collision évitée", driver: "K. Diabaté", vehicle: "CI-4821-MD", time: "09:22", risk: "Élevé", tone: "red" as Tone },
  { id: "CAM-4381", type: "Preuve livraison", driver: "S. Coulibaly", vehicle: "CI-1938-AB", time: "08:40", risk: "Info", tone: "blue" as Tone },
];

export const workOrders = [
  { id: "OT-2041", vehicle: "CI-7704-KT", reason: "Sonde compartiment 3 instable", due: "Aujourd’hui", km: "210 044", status: "Urgent", tone: "red" as Tone },
  { id: "OT-2038", vehicle: "CI-5580-BT", reason: "P0401 EGR + vidange 250 h", due: "26 sept.", km: "41 002", status: "Planifié", tone: "amber" as Tone },
  { id: "OT-2033", vehicle: "CI-1938-AB", reason: "Contrôle pneus / TPMS", due: "28 sept.", km: "142 110", status: "Planifié", tone: "blue" as Tone },
  { id: "OT-2029", vehicle: "CI-4821-MD", reason: "Révision 10 000 km", due: "02 oct.", km: "186 420", status: "OK", tone: "green" as Tone },
];

export const users = [
  { name: "Moussa Diabaté", role: "Gérant", access: "Groupe · toutes stations", last: "En ligne" },
  { name: "Awa Traoré", role: "Adjointe", access: "Groupe · lecture / alertes", last: "Il y a 12 min" },
  { name: "Yao Kouadio", role: "Superviseur", access: "Riviera 3 · jauges & commandes", last: "Il y a 1 h" },
  { name: "Jean-Marc Brou", role: "Pompiste", access: "Riviera 3 · index pompes", last: "Ce matin, 05:52" },
  { name: "Fatou Diallo", role: "Superviseur", access: "Yopougon · jauges", last: "Hier, 22:10" },
];

export const reports = [
  { name: "Rapprochement GESTOCI vs cuves", period: "Semaine 38", owner: "Gérant" },
  { name: "Consommation & ralenti par véhicule", period: "30 jours", owner: "Flotte" },
  { name: "Scorecard conducteurs", period: "Septembre", owner: "RH / sécurité" },
  { name: "Émissions CO₂ & km à vide", period: "Mensuel", owner: "Direction" },
  { name: "DVIR / check-list départ", period: "Aujourd’hui", owner: "Atelier" },
  { name: "Clips ProCam & sinistres", period: "90 jours", owner: "Assurance" },
];

export const stockChart = [
  { time: "00h", stock: 112, sortie: 3 },
  { time: "04h", stock: 109, sortie: 3 },
  { time: "08h", stock: 98, sortie: 11 },
  { time: "12h", stock: 87, sortie: 11 },
  { time: "16h", stock: 74, sortie: 13 },
  { time: "20h", stock: 66, sortie: 8 },
  { time: "24h", stock: 62, sortie: 4 },
];

export const fuelTrend = [
  { d: "Lun", l: 1840, idle: 210 },
  { d: "Mar", l: 1920, idle: 180 },
  { d: "Mer", l: 1760, idle: 240 },
  { d: "Jeu", l: 2010, idle: 190 },
  { d: "Ven", l: 1880, idle: 160 },
  { d: "Sam", l: 1540, idle: 90 },
  { d: "Dim", l: 980, idle: 40 },
];
