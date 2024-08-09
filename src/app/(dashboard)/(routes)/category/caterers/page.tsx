import { connectToDB } from "@/utils/database";
import Caterer from "@/models/caterer";
import { CatererColumn } from "./components/columns";
import { CatererClient } from "./components/client";

// Define the interface for the Caterer document
interface CatererDocument {
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
}

const CatererPage = async () => {
  await connectToDB();

  const caterers: CatererDocument[] = await Caterer.find().lean();

  const formattedCaterers: CatererColumn[] = caterers.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    price: item.price,
    vegMenu: {
      starter: item.veg.starter.join(", "),
      maincourse: item.veg.maincourse.join(", "),
      desert: item.veg.desert.join(", "),
      welcomedrink: item.veg.welcomedrink.join(", "),
      breads: item.veg.breads.join(", "),
      rice: item.veg.rice.join(", "),
    },
    nonVegMenu: {
      starter: item.nonveg.starter.join(", "),
      maincourse: item.nonveg.maincourse.join(", "),
      desert: item.nonveg.desert.join(", "),
      welcomedrink: item.nonveg.welcomedrink.join(", "),
      breads: item.nonveg.breads.join(", "),
      rice: item.nonveg.rice.join(", "),
    },
    addons: {
      starter: item.addon.starter.map((addon) => `${addon.name} - ${addon.price}`).join(", "),
      maincourse: item.addon.maincourse.map((addon) => `${addon.name} - ${addon.price}`).join(", "),
      desert: item.addon.desert.map((addon) => `${addon.name} - ${addon.price}`).join(", "),
      welcomedrink: item.addon.welcomedrink.map((addon) => `${addon.name} - ${addon.price}`).join(", "),
      breads: item.addon.breads.map((addon) => `${addon.name} - ${addon.price}`).join(", "),
      rice: item.addon.rice.map((addon) => `${addon.name} - ${addon.price}`).join(", "),
    },
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 text-white">
        <CatererClient data={formattedCaterers} />
      </div>
    </div>
  );
};

export default CatererPage;
