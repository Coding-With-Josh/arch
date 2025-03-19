import { auth, currentUser } from "@clerk/nextjs/server";
import Navbar from "./default";

interface UserData {
  username: string;
  email: string;
  imageUrl: string;
}

export async function ServerNavbar() {
  const user = await currentUser();

  // Transform user data into a plain object
  const userData: UserData | null = user
    ? {
        username: user.username || user.firstName || "User",
        email: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl || "",
      }
    : null;

  return <Navbar userData={userData} />;
}
