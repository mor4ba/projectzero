import useSWR from "swr";
import Main from "../../components/layout/Main";
import List from "../../components/List";
import Spinner from "../../components/Spinner";

export default function Moderation() {
  const places = useSWR("/api/places", {});
  const { data, isLoading } = places;

  if (isLoading) return <Spinner />;

  const filteredData = data.filter((place) =>
    place.inModeration ? place : null
  );

  return (
    <Main>
      <section className="">
        <h1 className="text-2xl border-b-2 border-secondary-color py-2">
          places in moderation
        </h1>
        <List data={filteredData} moderation={true} />
      </section>
    </Main>
  );
}

export async function validateEntry(id) {
  const response = await fetch(`/api/places/`, {
    method: "PATCH",
    body: JSON.stringify(id),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    await response.json();
    place.mutate();
  } else {
    console.error(`"Error: ${response.status}`);
  }
}
