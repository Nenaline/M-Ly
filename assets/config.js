/* ===============================================================
   PERSONNALISATION DU SITE M&Ly
   Renseigne uniquement les informations confirmées par le salon.
   Toutes les valeurs vides restent masquées ou signalées comme
   à compléter. Aucune donnée personnelle n'est collectée.
   =============================================================== */
window.MLY_CONFIG = {
  // true = affiche un bandeau AVANT-PREMIÈRE ; false = le masque.
  // IMPORTANT : enlever aussi la balise meta robots noindex de index.html
  // lors de l'ouverture publique du site.
  demoMode: true,

  // Coordonnées confirmées du salon (laisser vide pour l'instant).
  address: "",
  city: "",
  phone: "",           // exemple : "03 26 XX XX XX"
  email: "",           // exemple : "contact@votre-domaine.fr"
  mapUrl: "",          // URL d'itinéraire Google Maps ou autre
  instagramUrl: "",    // URL Instagram officiel du salon
  bookingUrl: "",      // Lien de réservation si le salon en possède un

  // Les horaires sont affichés dans cet ordre. Ne pas inventer.
  hours: [
    // { day: "Lundi", time: "Fermé" },
    // { day: "Mardi – vendredi", time: "9h00 – 18h30" },
    // { day: "Samedi", time: "9h00 – 17h00" }
  ],

  // EXEMPLES de catégories, à confirmer/modifier avec Mélanie.
  // Champ price facultatif ; une chaîne vide n'affiche aucun tarif.
  services: [
    { number: "01", title: "Coupe & coiffage", description: "Des lignes, du mouvement et une coupe qui vous ressemble.", price: "" },
    { number: "02", title: "Couleur & nuances", description: "Une approche de la couleur imaginée pour révéler votre style.", price: "" },
    { number: "03", title: "Soin du cheveu", description: "Le plaisir de prendre un moment pour soi et ses cheveux.", price: "" },
    { number: "04", title: "Coiffure pour tous", description: "Une vision de la coiffure ouverte à tous les styles et tous les âges.", price: "" }
  ]
};
