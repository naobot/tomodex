import { auth } from "@/auth";
import HomeCard from "./HomeCard";
import FriendsCloud from "@/components/three/FriendsCloud";
import { getFriendsCloudForUser } from "@/lib/people";
import DbErrorToast from "@/components/toast/DbErrorToast";

export default async function HomePage() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  const result = session?.user?.id
    ? await getFriendsCloudForUser(session.user.id)
    : null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {result && (
        result.ok
          ? <FriendsCloud friends={result.data} />
          : <DbErrorToast error={result.error} />
      )}
      <div className="relative z-10 flex min-h-screen items-center justify-center pointer-events-none">
        <HomeCard isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}