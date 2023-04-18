export default function Form() {
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
      //places.mutate();
      //push("/");
    } else {
      console.error(`"Error: ${response.status}`);
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="b-white border-2 p-10"
    >
      <fieldset>
        <label htmlFor="name" className="block">
          Tell us it&apos;s quirky name!
        </label>
        <input type="text" id="name" name="name" />
      </fieldset>
      <fieldset>
        <label htmlFor="location" className="block">
          Where the fun at?
        </label>
        <input type="text" id="location" name="location" />
      </fieldset>
      <button type="submit" className="px-4 py-2 b-white border-2 my-4">
        Submit!
      </button>
    </form>
  );
}
