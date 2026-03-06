import Link from "next/link";
import Card from "@/components/ui/Card";
import type { PersonGridItem } from "@/lib/people";

type Props = {
  people: PersonGridItem[];
};

export default function PersonGrid({ people }: Props) {
  if (people.length === 0) {
    return <p className="text-sm text-gray-400">No friends yet.</p>;
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      {people.map((person) => {
        const location = [person.location?.city, person.location?.country]
          .filter(Boolean)
          .join(", ");

        return (
          <Link key={person.id} href={`/people/${person.id}`}>
            <Card className="w-full">
              <p className="text-2xl">{person.displayName}</p>
              {location && (
                <p className="text-sm">{location}</p>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}