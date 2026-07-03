export const CMEP_WHATSAPP_NUMBER = "22896898717";
export const CMEP_EMAIL = "chrismentorshipempowermentprog@gmail.com";
export const CMEP_PHONE_DISPLAY = "+228 90 51 00 88";
export const CMEP_PHONE_HREF = "tel:+22890510088";

export function createWhatsAppHref(message: string) {
  return `https://wa.me/${CMEP_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_CONTACT_HREF = createWhatsAppHref(
  "Bonjour CMEP, je souhaite obtenir des informations sur le programme.",
);
