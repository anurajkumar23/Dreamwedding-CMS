export interface PhotographerDocument {
    _id: string;
    name: string;
    rating: number;
    location: {
      city: string;
      pincode: string;
      area: string;
    } | null; // Allow location to be null
    locationUrl: string;
    outerdescription: string;
    innerdescription: string;
    feature: string[];
    price: number[];
    contactUs: number;
    yearOfEstd: number;
    services: string[];
    occasion: string;
    gallery: {
      name: string;
      photos: string[];
    }[];
    photos: string[];
    createdAt: Date;
  }