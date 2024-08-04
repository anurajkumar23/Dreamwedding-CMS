import Image from "next/image";
import Link from "next/link";

const UsersPage = async () => {
  const users = [
    {
      id: "1",
      username: "Anuraj",
      email: "anuraj@gmail.com",
      createdAt: "27 July 2024",
      img: "/noavatar.png", // Ensure you have a placeholder image
      isAdmin: false,
      isActive: true,
    },
  ];

  return (
    <div className="bg-gray-100 p-5 rounded-lg mt-5 shadow-lg overflow-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 mb-4 md:mb-0 md:mr-4 border border-gray-300 rounded-lg w-full md:w-auto"
        />
        <Link href="/dashboard/users/add">
          <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Add New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3  items-center gap-2">
                  <Image
                    src={user.img}
                    alt={user.username}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                 <p>{user.username}</p> 
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.createdAt}</td>
                <td className="p-3">{user.isAdmin ? "Admin" : "User"}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Active" : "Passive"}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                      View
                    </button>
                  </Link>
                  <form>
                    <input type="hidden" name="id" value={user.id} />
                    <button
                      type="submit"
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default UsersPage;
