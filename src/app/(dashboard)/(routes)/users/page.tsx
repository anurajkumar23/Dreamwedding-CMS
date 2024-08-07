// pages/dashboard/users/index.js
import { format } from "date-fns";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { UserColumn } from "./components/columns";
import { UserClient } from "./components/client";

const UserPage = async ({ params }) => {
  await connectToDB();

  const users = await User.find({ params }).sort({ createdAt: -1 }).lean();

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item._id.toString(),
    phone: item.phone,
    name: item.name,
    role: item.role,
    email: item.email,
    address: item.address,
    createdAt: format(new Date(item.createdAt), 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 text-white">
        <UserClient data={formattedUsers} />
      </div>
    </div>
  );
};

export default UserPage;
