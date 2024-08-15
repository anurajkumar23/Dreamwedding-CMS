// pages/dashboard/banquets/index.tsx
import { connectToDB } from "@/utils/database";
import Banquet from "@/models/banquet";
import { BanquetColumn } from "./components/columns";
import { BanquetClient } from "./components/client";
import { BanquetDocument } from "@/interfaces/banquet";

// Define the interface for the Banquet document


const BanquetPage = async () => {
  await connectToDB();

  const banquets: BanquetDocument[] = await Banquet.find().lean();

  const formattedBanquets: BanquetColumn[] = banquets.map((item) => ({
    id: item._id.toString(),
    name: item.name,
    rating: item.rating,
    location: item.location
      ? `${item.location.city || 'N/A'}, ${item.location.area || 'N/A'}, ${item.location.pincode || 'N/A'}`
      : 'Location not specified',
    description: item.description,
    price: item.price,
    capacity: item.capacity,
    type: item.type,
    yearOfEstd: item.yearOfEstd,
    contactUs: item.contactUs,
    specialFeature: item.specialFeature.join(", "),
    availability: item.availability.join(", "),
    operatingDays: item.operatingDays,
    openHours: item.openHours,
    createdAt: item.createdAt ? item.createdAt.toISOString().split('T')[0] : "N/A",
  }));

  return (
    <div className="px-4 w-full max-w-screen-xl mx-auto">
    <div className="space-y-4 pt-6 text-white">
      <BanquetClient data={formattedBanquets} />
    </div>
  </div>
  
  );
};

export default BanquetPage;
