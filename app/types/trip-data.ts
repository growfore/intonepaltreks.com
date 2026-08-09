export interface TripData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: number;
  maxPrice?: number;
  accommodations: string[];
  maximumAltitude: string;
  difficultyLevel: "EASY" | "MODERATE" | "CHALLENGING" | "STRENUOUS";
  guestCapacity: number;
  meetingPoint: string;
  dropOffPoint: string;
  maxAltitude: string;
  distance: string;
  trekType: string;
  accommodationType: string;
  bestTime: string;
  groupSize: string;
  transportation: string;
  meals: string;
  bestSeason: string;
  travelStyle: string;
  locations: string[];
  images: string[];
  keywords?: string[];
  itinerary: ItineraryVariant[];
  faqs: FAQGroup[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  additionalInfo: AdditionalInfo[];
  ratings: Rating;
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

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQGroup {
  category: string;
  icon?: string;
  faqs: FAQ[];
}

export interface AdditionalInfo {
  title: string;
  description: string;
  slug?: string;
}

export interface Rating {
  average: number;
  count: number;
  googleRating?: number;
  googleCount?: number;
  recommendedPercentage?: number;
}
