import { VISUAL_SYSTEM } from "../visual-system";

export const TOURISM_LIFESTYLE = {
  eyebrow: "Tourism & Lifestyle",
  title: "Discover the best of Zanzibar",
  intro:
    "From Zanzibar beaches and luxury resorts to beach clubs, diving, and wellness — your premium guide to things to do in Zanzibar and the island's luxury living culture.",
  categories: [
    {
      title: "Best beaches",
      items: ["Nungwi & Kendwa", "Paje & Jambiani", "Matemwe", "Kiwengwa", "Prison Island"],
      image: VISUAL_SYSTEM.lifestyle.beach,
    },
    {
      title: "Luxury resorts & hotels",
      items: ["Five-star coast resorts", "Boutique beach hotels", "Wellness retreats", "Private villa resorts"],
      image: VISUAL_SYSTEM.propertyTypes.hotels,
    },
    {
      title: "Beach clubs & dining",
      items: ["Sunset rooftop bars", "Beachfront fine dining", "Seafood & spice fusion", "Private chef villas"],
      image: VISUAL_SYSTEM.lifestyle.dining,
    },
    {
      title: "Water sports & adventure",
      items: ["Kitesurfing in Paje", "Mnemba diving", "Dhow sunset cruises", "Safari + beach combos"],
      image: VISUAL_SYSTEM.lifestyle.tourism,
    },
    {
      title: "Wellness & luxury living",
      items: ["Spa & wellness retreats", "Yoga on the beach", "Infinity pool villas", "Tropical outdoor lounges"],
      image: VISUAL_SYSTEM.lifestyle.wellness,
    },
    {
      title: "Culture & heritage",
      items: ["Stone Town UNESCO sites", "Spice farm tours", "Swahili architecture", "Forodhani night market"],
      image: VISUAL_SYSTEM.areas["stone-town"],
    },
  ],
} as const;
