import useSWR from "swr";
import RatingForm from "./RatingForm";
import FindLocationInput from "./FindLocationInput";

export default function Form({ classes }) {
  const places = useSWR("/api/places");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    event.target.reset();

    console.log(data);
    handleAddPlace(data);
  }

  async function handleAddPlace(data) {
    const response = await fetch(`/api/places/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      places.mutate();
      //push("/");
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      autoComplete="off"
      className={`p-6 flex align-center flex-col gap-6 items-center ${classes}`}
    >
      <fieldset className="w-full">
        <label htmlFor="name" className="block">
          Tell us it&apos;s quirky name!
        </label>
        <input
          className="text-white bg-transparent rounded-lg border-2 my-2"
          type="text"
          id="name"
          name="name"
        />
      </fieldset>

      <fieldset className="w-full">
        <legend htmlFor="location" className="block">
          Where the fun at?
        </legend>
        <FindLocationInput />
      </fieldset>
      <fieldset>
        <legend htmlFor="typeOf">What kind of place?</legend>
        <label htmlFor="bar">Bar</label>
        <input type="radio" name="typeOf" id="bar" value="bar" />
        <label htmlFor="club">Club</label>
        <input type="radio" name="typeOf" id="club" value="club" />
        <label htmlFor="restaurant">Restaurant</label>
        <input type="radio" name="typeOf" id="restaurant" value="restaurant" />
        <label htmlFor="other">Other</label>
        <input type="radio" name="typeOf" id="other" value="other" />
      </fieldset>
      <fieldset className="w-full">
        <label htmlFor="comment" className="block">
          Want to leave an initial comment to tell people about the sunny sides
          of this quirky place?
        </label>
        <textarea
          className="text-white w-full bg-transparent border-2 border-white rounded-lg my-4"
          type="text"
          id="comment"
          name="body"
        />
      </fieldset>
      <RatingForm />
      <button
        className="relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        type="submit"
      >
        <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          submit
        </span>
      </button>
    </form>
  );
}
