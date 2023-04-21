import useSWR from "swr";
import Link from "next/link";

export default function List() {
  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  if (isLoading) return <h2>this gonna take some time!</h2>;

  return (
    <ul className="flex flex-col w-full mt-20" role="list">
      <h1 className="uppercase text-2xl">entries</h1>
      {data.map((place) => {
        return (
          <li
            className="border-b-2 border-white py-4"
            key={place._id}
            id={place._id}
          >
            <p>name: {place.name}</p>
            <p>location: {place.location}</p>
            <Link
              href={`places/${place._id}`}
              passHref
              legacyBehavior
              className="button"
            >
              more information
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
