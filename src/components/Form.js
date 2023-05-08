import useSWR from "swr";
import RatingForm from "./RatingForm";
import FindLocationInput from "./FindLocationInput";

export default function Form({ classes, handleClose, session }) {
  const places = useSWR("/api/places");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const features = formData.getAll("features");
    const data = Object.fromEntries(formData);
    data.features = features;
    data.ratedBy = session.user.id;
    data.inModeration = true;
    data.images = [];
    event.target.reset();
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
      handleClose();
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      autoComplete="off"
      className={`p-6 flex align-center flex-col gap-6 items-center ${classes} ratingform`}
    >
      <h2 className="text-2xl p-2 border-b border-tertiary-color mb-10">
        Create a new Location
      </h2>
      <fieldset className="w-full flex flex-col relative justify-center">
        <input
          className="w-full text-black bg-transparent rounded-lg border-primary-grey p-2 text-sm border-2 my-2 order-2"
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="name" className="block order-1 ml-2">
          Tell us it&apos;s quirky name!
        </label>
      </fieldset>

      <FindLocationInput />

      <fieldset className="w-full relative flex mb-1 flex-row radio-group gap-4">
        <input
          type="radio"
          name="typeOf"
          id="bar"
          value="bar"
          className="hidden"
        />
        <label
          htmlFor="bar"
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
        >
          #Bar
        </label>
        <input
          type="radio"
          name="typeOf"
          id="club"
          value="club"
          className="hidden"
        />
        <label
          htmlFor="club"
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
        >
          #Club
        </label>
        <input
          type="radio"
          name="typeOf"
          id="restaurant"
          value="restaurant"
          className="hidden"
        />
        <label
          htmlFor="restaurant"
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
        >
          #Restaurant
        </label>
        <input
          type="radio"
          name="typeOf"
          id="other"
          value="other"
          className="hidden"
        />
        <label
          className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
          htmlFor="other"
        >
          #Other
        </label>
      </fieldset>

      <fieldset className="w-full flex flex-col relative mb-1 checked-group">
        <legend className="ml-2 monospace mb-2">features</legend>
        <div className="wrapper flex flex-row gap-4">
          <input
            type="checkbox"
            name="features"
            id="kicker"
            value="kicker"
            className="hidden"
          />
          <label
            htmlFor="kicker"
            className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
          >
            #kicker
          </label>
          <input
            type="checkbox"
            name="features"
            id="pool"
            value="pool"
            className="hidden"
          />
          <label
            htmlFor="pool"
            className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
          >
            #pool table
          </label>
          <input
            type="checkbox"
            name="features"
            id="darts"
            value="darts"
            className="hidden"
          />
          <label
            htmlFor="darts"
            className="rounded-lg p-1 px-3 border-primary-grey border-2 w-fit h-fit cursor-pointer"
          >
            #darts
          </label>
        </div>
      </fieldset>

      <fieldset className="w-full flex flex-col relative">
        <textarea
          className="w-full text-black bg-transparent rounded-lg border-primary-grey p-2 text-sm border-2 my-2 order-2"
          type="text"
          id="comment"
          name="body"
        />
        <label htmlFor="comment" className="block order-1 ml-3">
          what makes this place so special?
        </label>
      </fieldset>
      <RatingForm />
      <button
        className="relative inline-flex items-center text-xl bg-secondary-color text-white p-1.5 px-6 mb-6 font-medium rounded-lg hover:bg-secondary-darker"
        type="submit"
      >
        submit
      </button>
    </form>
  );
}
