import Link from "next/link";
import Image from "next/image";

export default function List({ data }) {
  return (
    <ul className="grid grid-cols-2 gap-6 w-full mt-10" role="list">
      {data.map((place) => {
        const staticLocationUrl = `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-l+000(${place.longitude},${place.latitude})/${place.longitude},${place.latitude},14/800x400/?access_token=pk.eyJ1IjoibW9yNGJhIiwiYSI6ImNsZ2dsc2R6NjBjcWwzZXJyM2hqdGZrejEifQ.Tt-v3iroj4ffhu-uJ69Haw`;
        return (
          <Link
            href={`/places/${place._id}`}
            passHref
            className=" border-b-2 border-white relative inline-flex w-full h-40 self-center shadow-lg"
            key={place._id}
            id={place._id}
          >
            <Image
              src={staticLocationUrl}
              alt={`${place.name} location static image`}
              width={700}
              className="object-cover w-full absolute top-0 -z-10 h-full left-0"
              height="400"
            />
            <figcaption className="flex flex-col m-2">
              <p className="monospace text-tertiary-color"> {place.name}</p>
              <p className="monospace">{place.location}</p>
            </figcaption>
          </Link>
        );
      })}
    </ul>
  );
}
