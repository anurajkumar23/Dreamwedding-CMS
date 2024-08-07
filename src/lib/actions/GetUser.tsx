export default async function getUsers() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users`,
        { cache: 'no-store',
          method: 'GET',
         }
      );
      const data = await response.json();
  
      if (data.message === "success") {
        return data.data.users;
      } else {
        throw new Error("Failed to fetch users data");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  