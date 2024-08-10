import { connectToDB } from "@/utils/database";
import Decorator from "@/models/decorator";
import { DecoratorColumn } from "./components/columns"; // Ensure this matches your actual path
import { DecoratorClient } from "./components/client"; // Ensure this matches your actual path

// Define the interface for the Decorator document
interface DecoratorDocument {
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

const DecoratorPage = async () => {
  await connectToDB();

  const decorators: DecoratorDocument[] = await Decorator.find().lean();

  const formattedDecorators: DecoratorColumn[] = decorators.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    innerdescription: item.innerdescription,
    outerdescription: item.outerdescription,
    rating: item.rating,
    location: item.location
      ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
      : 'Location not specified',
    price: item.price,
    contactUs: item.contactUs,
    yearOfEstd: item.yearOfEstd,
    billboard: item.billboard,
    photos: item.photos,
  }));

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6 text-white">
        <DecoratorClient data={formattedDecorators} />
      </div>
    </div>
  );
};

export default DecoratorPage;
