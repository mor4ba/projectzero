import List from "../../components/List";
import useSWR from "swr";

export default function AllPlaces() {
  const { data, isLoading } = useSWR("/api/places", {
    fallbackData: [],
  });

  if (isLoading) return <h2>this gonna take some time!</h2>;

  return (
    <>
      <List data={data} />
    </>
  );
}
