import { handle } from "express/lib/router";
import Link from "next/link";

export default function List({ data, moderation, handleValidateEntry }) {
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
              href={`/places/${place._id}`}
              passHref
              legacyBehavior
              className="button p-2 py-1 m-4 border-2 inline-block"
            >
              more information
            </Link>

            {moderation ? (
              <button
                className="p-2 py-1 m-4 border-2"
                type="button"
                onClick={() => handleValidateEntry(place._id)}
              >
                validate
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
