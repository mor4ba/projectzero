import useSWR from "swr";

export default function List() {
  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  if (isLoading) return <h2>this gonna take some time!</h2>;

  return (
    <ul role="list">
      <h2>entries</h2>
      {data.map((place) => {
        return (
          <li
            className="border-b-2 border-white py-4"
            key={place._id}
            id={place._id}
          >
            <p>name: {place.name}</p>
            <p>location: {place.location}</p>
          </li>
        );
      })}
    </ul>
  );
}
