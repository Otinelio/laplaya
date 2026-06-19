export const WHATSAPP_NUMBER = "22893910000";

export const BRAND = {
  name: "La Playa",
  fullName: "La Playa Beach Resort & Lounge",
  tagline: "L'art de vivre au bord de la mer",
  address: "Boulevard de la Marina, Bord de Mer",
  phone: "+228 93 91 00 00",
  whatsapp: WHATSAPP_NUMBER,
  email: "contact@laplaya-resort.com",
  hours: {
    dejeuner: "12h00 – 15h00",
    diner: "19h00 – 23h00",
    bar: "10h00 – 00h00",
  },
  social: {
    instagram: "https://instagram.com/laplaya",
    facebook: "https://facebook.com/laplaya",
  },
};

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function sendWhatsApp(message: string) {
  if (typeof window === "undefined") return;
  window.open(whatsappUrl(message), "_blank");
}

export function formatFCFA(n: number): string {
  return n.toLocaleString("fr-FR").replace(/,/g, " ") + " FCFA";
}
