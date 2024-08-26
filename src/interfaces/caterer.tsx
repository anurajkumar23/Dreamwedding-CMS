export interface Caterer {
    _id: string;
    name: string;
    price: number;
    veg: {
      starter: string[];
      maincourse: string[];
      desert: string[];
      welcomedrink: string[];
      breads: string[];
      rice: string[];
    };
    nonveg: {
      starter: string[];
      maincourse: string[];
      desert: string[];
      welcomedrink: string[];
      breads: string[];
      rice: string[];
    };
    addon: {
      starter: { name: string; price: string }[];
      maincourse: { name: string; price: string }[];
      desert: { name: string; price: string }[];
      welcomedrink: { name: string; price: string }[];
      breads: { name: string; price: string }[];
      rice: { name: string; price: string }[];
    };
    createdAt: Date;
    updatedAt: Date;
  }
  