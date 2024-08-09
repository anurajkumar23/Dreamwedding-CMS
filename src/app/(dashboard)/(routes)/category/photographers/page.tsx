// pages/dashboard/Photographers/index.tsx
import { connectToDB } from "@/utils/database";
import Photographer from "@/models/photographer";
import { PhotographerColumn } from "./components/columns"; 
import { PhotographerClient } from "./components/client";

// Define the interface for the Photographer document
interface PhotographerDocument {
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

const PhotographerPage = async () => {
  await connectToDB();

  const photographers: PhotographerDocument[] = await Photographer.find().lean();

  const formattedPhotographers: PhotographerColumn[] = photographers.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    rating: item.rating,
    location: item.location
      ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
      : 'Location not specified',
    locationUrl: item.locationUrl || 'N/A',
    outerdescription: item.outerdescription || '',
    innerdescription: item.innerdescription || '',
    feature: item.feature || 'N/A',
    price: item.price || 'N/A',
    contactUs: item.contactUs || 'N/A',
    yearOfEstd: item.yearOfEstd || 'N/A',
    services: item.services || 'N/A',
    occasion: item.occasion || 'N/A',
    gallery: item.gallery || 'N/A',
    photos: item.photos|| 'No photos',
    createdAt: item.createdAt ? item.createdAt.toISOString().split('T')[0] : "N/A",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 text-white">
        <PhotographerClient data={formattedPhotographers} />
      </div>
    </div>
  );
};

export default PhotographerPage;
