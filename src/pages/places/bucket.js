import useSWR from "swr";
import { useSession } from "next-auth/react";
import Login from "../../components/Login";
import List from "../../components/List";
import Main from "../../components/layout/Main";

export default function BucketList() {
  const { data: session } = useSession();
  const { data, isLoading } = useSWR("/api/places", {});

  if (!session) {
    return (
      <div>
        <h2>You need to be logged in for this website !</h2>
        <Login />
      </div>
    );
  }

  const bucketlist = session.user.savedPlaces;
  const filteredData = data.filter((element) =>
    bucketlist.some((item) => element._id === item)
  );

  if (isLoading) return <>wait a second!</>;

  return (
    <Main>
      <h2>BUCKETLIST</h2>
      <List data={filteredData} />
    </Main>
  );
}
