import { auth } from "@/auth";
import HomeCard from "./HomeCard";
import FriendsCloud from "@/components/three/FriendsCloud";
import { getFriendsCloudForUser } from "@/lib/people";

export default async function HomePage() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  const friends = session?.user?.id
    ? await getFriendsCloudForUser(session.user.id)
    : [];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {isLoggedIn && <FriendsCloud friends={friends} />}
      <div className="relative z-10 flex min-h-screen items-center justify-center pointer-events-none">
        <HomeCard isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}