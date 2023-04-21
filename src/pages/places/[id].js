import useSWR from "swr";
import { useRouter } from "next/router";
import RatingForm from "../../components/RatingForm";
import RatingDisplay from "../../components/RatingDisplay";
import CommentSection from "../../components/CommentSection";

export default function Singleplace() {
  const router = useRouter();
  const { id } = router.query;
  const place = useSWR(`/api/places/${id}`);
  const { data, isLoading } = place;

  async function handleAddComment(data) {
    const response = await fetch(`/api/places/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
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

  async function handleUpdateRating(data) {
    const response = await fetch(`/api/places/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      place.mutate();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  function handleSubmit(event, formKey = "") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    event.target.reset();

    formKey === "rating" ? handleUpdateRating(data) : handleAddComment(data);
  }

  if (isLoading) return <div>We are currently loading this place.</div>;

  return (
    <div className="flex flex-col p-20 px-10">
      <h1 className="text-2xl mb-2 py-4 border-b border-white">{data.name}</h1>
      <p className="text-xl mb-10">location: {data.location}</p>
      <RatingDisplay data={data} />
      <CommentSection data={data} onSubmit={handleSubmit} />
      <p className="text-xl mb-10 mt-10">Help us rate this place!</p>
      <form onSubmit={(event) => handleSubmit(event, "rating")}>
        <RatingForm />
        <button
          className="relative inline-flex mt-4 items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          type="submit"
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            submit
          </span>
        </button>{" "}
      </form>
    </div>
  );
}
