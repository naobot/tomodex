import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function PeoplePage() {
  return (
    <AppShell>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-pixel uppercase"
        >
          ←
        </Link>
        <h1 className="mb-6 text-md text-pixel uppercase">Friends</h1>
      </div>
    </AppShell>
  );
}