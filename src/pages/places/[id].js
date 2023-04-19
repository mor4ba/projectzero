import useSWR from "swr";
import { useRouter } from "next/router";
import RatingForm from "../../components/RatingForm";
import ShowRating from "../../components/ShowRating";

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

  const ratingKeys = Object.keys(data).filter((key) => key.includes("r_"));
  console.log(ratingKeys);

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
      <ShowRating
        left="hip"
        right="quirky"
        title="dresscode"
        count={data.r_dresscode}
        range="3"
      />
      <ShowRating
        left="ok"
        right="cringe"
        title="should i bring my parents?"
        count={data.r_cringe}
        range="3"
      />
      <ShowRating
        left="empty"
        right="packed"
        title="people / squaremeter"
        count={data.r_amountOfPeople}
        range="3"
      />
      <ShowRating
        left="talkin"
        right="dancin"
        title="volume"
        count={data.r_volume}
        range="3"
      />
      <ShowRating
        left="high school"
        right="pension"
        title="age"
        count={data.r_age}
        range="3"
      />
      <ShowRating
        left="fresh laundry"
        right="smoked salmon"
        title="how we gonna smell next day"
        count={data.r_isSmoking}
        range="3"
      />
      <ShowRating
        left="darkroom"
        right="floodlight"
        title="lights"
        count={data.r_lights}
        range="3"
      />
      <ShowRating
        left="basically for free"
        right="monthly salary"
        title="prices"
        count={data.r_prices}
        range="3"
      />
      <ShowRating
        left="friendly"
        right="wanna be yelled at"
        title="staff"
        count={data.r_staff}
        range="3"
      />
      <ShowRating
        left="siberia"
        right="hell"
        title="bring a sweater?"
        count={data.r_temperature}
        range="3"
      />
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
