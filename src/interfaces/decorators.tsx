export interface DecoratorDocument {
    _id: string;
    name: string;
    innerdescription: string;
    outerdescription: string;
    rating: number;
    location: {
      city: string;
      pincode: string;
      area: string;
    } | null;
    price: number[];
    like: string[];
    contactUs: number;
    yearOfEstd: number;
    reviews: any[]; // Adjust based on how you want to handle reviews
    billboard: string;
    photos: string[];
  }