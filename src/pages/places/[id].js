import useSWR from "swr";
import { useRouter } from "next/router";
import RatingForm from "../../components/RatingForm";

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
    <div className="flex flex-col ">
      <h1>{data.name}</h1>
      <p>location: {data.location}</p>
      <p>Initial Comment: </p>
      <ul>
        {data.comment.map((comment) => {
          return (
            <li key={comment._id}>
              <p>- {comment}</p>
            </li>
          );
        })}
      </ul>
      <h2>ratings:</h2>
      dresscode: {data.r_dresscode}; <br />
      amountOfPeople: {data.r_amountOfPeople};<br />
      age: {data.r_age};<br />
      smoking?: {data.r_isSmoking};<br />
      lights: {data.r_lights};<br />
      prices: {data.r_prices};<br />
      staff: {data.r_staff};<br />
      temperature: {data.r_temperature};<br />
      volume: {data.r_volume};<br />
      <hr />
      <h3 className="py-10">wanna do comments? you should.</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <fieldset>
          <label className="block" htmlFor="comment">
            Tell us about this quirky place.
          </label>
          <textarea
            className="block text-black"
            type="text"
            name="comment"
            id="comment"
          ></textarea>
        </fieldset>
        <button type="submit">submit</button>
      </form>
      <h3 className="my-20">Update Rating</h3>
      <form onSubmit={(event) => handleSubmit(event, "rating")}>
        <RatingForm />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
