import { auth } from "@/auth";
import HomeCard from "./HomeCard";

export default async function HomePage() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return <HomeCard isLoggedIn={isLoggedIn} />;
}