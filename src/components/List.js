import { handle } from "express/lib/router";
import Link from "next/link";

export default function List({ data, moderation, handleValidateEntry }) {
  return (
    <ul className="flex flex-col w-full mt-20" role="list">
      <h1 className="uppercase text-2xl py-4 border-b border-primary-grey">
        entries
      </h1>
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
              className="relative inline-flex w-fit items-center mt-10 self-center text-xl bg-secondary-color text-white p-1.5 px-6 mb-6 font-medium rounded-lg hover:bg-secondary-darker"
            >
              more information
            </Link>

            {moderation ? (
              <button
                className="relative inline-flex w-fit items-center mt-10 self-center text-xl bg-secondary-color text-white p-1.5 px-6 mb-6 font-medium rounded-lg hover:bg-secondary-darker"
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
