export interface TripData {
  id: number;
  title: string;
  slug: string;
  overview: string;
  duration: string;
  price: number;
  maxPrice?: number;
  difficultyLevel: "EASY" | "MODERATE" | "CHALLENGING" | "STRENUOUS";
  guestCapacity: number;
  meetingPoint: string;
  dropOffPoint: string;
  maximumAltitude: number;
  videoIntro?: string;
  accommodations: string[];
  meals: string[];
  languages: string[];
  images: string[];
  itinerary: ItineraryVariant[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  additionalInfo: AdditionalInfo[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    featuredMedia?: string | null;
    schema?: string;
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  ascent?: string;
  descent?: string;
  duration?: string;
  distance?: string;
  image?: string;
  highlights?: string[];
  meals?: string[];
  accommodations?: string[];
  dayFeaturedImages?: { image: string; alt?: string }[];
}

export interface ItineraryVariant {
  id: string;
  name: string;
  isDefault?: boolean;
  description?: string;
  days: ItineraryDay[];
}

export interface AdditionalInfo {
  title: string;
  description: string;
  slug?: string;
}
