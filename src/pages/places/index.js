import List from "../../components/List";
import useSWR from "swr";
import Main from "../../components/layout/Main";

export default function AllPlaces() {
  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  if (isLoading) return <h2>this gonna take some time!</h2>;

  return (
    <>
      <Main>
        <List data={data} />
      </Main>
    </>
  );
}
