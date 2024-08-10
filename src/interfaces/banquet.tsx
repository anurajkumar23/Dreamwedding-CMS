export interface postBanquet{
    name: string;
    location: {
      city: string;
      pincode: string;
      area: string;
    };
    services: string[];
    description: string;
    price: string;
    capacity:  string;
    specialFeature: string[];
    
    yearOfEstd: string;
    availability: string[];
    billboard: string;
    openHours: string;
    operatingDays: string;
    type: string;
}