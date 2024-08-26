
import { connectToDB } from "@/utils/database";
import Seller from "@/models/seller";
import { SellerColumn } from "./components/columns"; 
import { SellerClient } from "./components/client";
import { SellerInterface } from "@/interfaces/seller";



const SellerPage = async () => {
  await connectToDB();

  const sellers: SellerInterface[] = await Seller.find().lean();

  const formattedSellers: SellerColumn[] = sellers.map((seller) => ({
    id: seller._id.toString(),
    name: `${seller.firstName} ${seller.middleName || ''} ${seller.lastName}`.trim(),
    phoneNumber: seller.phoneNumber,
    email: seller.email,
    address: `${seller.city}, ${seller.state}, ${seller.pincode}`,
    whatsappNumber: seller.whatsappNumber,
    GSTNO: seller.GSTNO,
    bankDetails: seller.bank ? `${seller.bank.name || 'N/A'}, A/C: ${seller.bank.account || 'N/A'}, IFSC: ${seller.bank.ifsc || 'N/A'}` : 'N/A',
    pancard: seller.pancard,
    status: seller.status,
    banquets: seller.Banquets?.join(", ") || 'N/A',
    photographers: seller.Photographers?.join(", ") || 'N/A',
    decorators: seller.Decorators?.join(", ") || 'N/A',
    caterers: seller.Caterers?.join(", ") || 'N/A',
    createdAt: seller.createdAt ? seller.createdAt.toISOString().split('T')[0] : "N/A",
  }));

  return (
    <div className="max-w-screen-xl">
      <div className="flex-1 space-y-4 p-8 pt-6 text-white">
        <SellerClient data={formattedSellers} />
      </div>
    </div>
  );
};

export default SellerPage;
