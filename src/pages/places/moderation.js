import useSWR from "swr";
import Main from "../../components/layout/Main";
import List from "../../components/List";

export default function Moderation() {
  const places = useSWR("/api/places", {});
  const { data, isLoading } = places;

  async function validateEntry(id) {
    const response = await fetch(`/api/places/`, {
      method: "PATCH",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      places.mutate();
      //push("/");
      // handleClose();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  if (isLoading) return <h1>We gonna load this for a second!</h1>;

  const filteredData = data.filter((place) =>
    place.inModeration ? place : null
  );

  return (
    <Main>
      <List
        data={filteredData}
        moderation={true}
        handleValidateEntry={validateEntry}
      />
    </Main>
  );
}
