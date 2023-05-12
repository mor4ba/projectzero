import List from "../../components/List";
import useSWR from "swr";
import Main from "../../components/layout/Main";
import Spinner from "../../components/Spinner";

export default function AllPlaces() {
  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  if (isLoading) return <Spinner />;

  return (
    <Main>
      <section className="py-10">
        <h1 className="text-2xl border-b-2 border-secondary-color py-2">
          places
        </h1>
        <List data={data} />
      </section>
    </Main>
  );
}
