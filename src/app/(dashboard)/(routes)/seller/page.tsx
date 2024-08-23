
import { connectToDB } from "@/utils/database";
import Seller from "@/models/seller";
import { SellerColumn } from "./components/columns"; 
import { SellerClient } from "./components/client";
import { SellerInterface } from "@/interfaces/seller";



const SellerPage = async () => {
  await connectToDB();

  const sellers: SellerInterface[] = await Seller.find({ status: "Pending" }).sort({ createdAt: -1 }).lean();

  const formattedSellers: SellerColumn[] = sellers.map((seller) => ({
    id: seller._id.toString(),
    name: `${seller.firstName} ${seller.middleName || ''} ${seller.lastName}`.trim(),
    phoneNumber: seller.phoneNumber,
    email: seller.email,
    address: `${seller.city}, ${seller.state}, ${seller.pincode}`,
    whatsappNumber: seller.whatsappNumber,
    GSTNO: seller.GSTNO,
    bankDetails: `${seller.bank.name}, A/C: ${seller.bank.account}, IFSC: ${seller.bank.ifsc}`,
    pancard: seller.pancard,
    status: seller.status,
    banquets: seller.Banquets.join(", "),
    photographers: seller.Photographers.join(", "),
    decorators: seller.Decorators.join(", "),
    caterers: seller.Caterers.join(", "),
    createdAt: seller.createdAt ? seller.createdAt.toISOString().split('T')[0] : "N/A",
  }));

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6 text-white">
        <SellerClient data={formattedSellers} />
      </div>
    </div>
  );
};

export default SellerPage;
