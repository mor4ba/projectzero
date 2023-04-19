import RangeInput from "./RangeInput";

export default function RatingForm() {
  return (
    <>
      <hr />
      <h3>Initial rating</h3>
      <p>
        To help others to vibe with your place, its helpful to go to through
        some absurd criteria which will help us to put your quirky place in the
        right spotlight.
      </p>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="r_dresscode">
          lets talk outfits! certain dresscode?
        </label>
        <RangeInput
          id="r_dresscode"
          name="r_dresscode"
          min="1"
          max="3"
          step="0.5"
          left="hip"
          right="quirky"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="amountOfPeople">
          is the place usually packed?
        </label>
        <RangeInput
          id="amountOfPeople"
          name="r_amountOfPeople"
          min="1"
          max="3"
          step="0.5"
          left="tempelhofer feld"
          right="packed & sweaty"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="volume">
          Volume
        </label>
        <RangeInput
          id="volume"
          min="1"
          max="3"
          step="0.5"
          name="r_volume"
          left="talkin"
          right="dancin"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="isSmoking">
          are we gonna get smoked?
        </label>
        <RangeInput
          id="isSmoking"
          min="1"
          max="3"
          step="0.5"
          name="r_isSmoking"
          left="crisp fresh laundry"
          right="smoked salmon"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="temperature">
          bring a pullover?
        </label>
        <RangeInput
          id="temperature"
          min="1"
          max="3"
          step="0.5"
          name="r_temperature"
          left="siberia"
          right="devils kitchen"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="lights">
          Lights
        </label>
        <RangeInput
          id="lights"
          min="1"
          max="3"
          step="0.5"
          name="r_lights"
          left="darkroom"
          right="floodlight"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="cringe">
          Cringeness
        </label>
        <RangeInput
          id="cringe"
          min="1"
          max="3"
          step="0.5"
          name="r_cringe"
          left="not at all"
          right="cringealert"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="age">
          Average age
        </label>
        <RangeInput
          id="age"
          min="1"
          max="3"
          step="0.5"
          name="r_age"
          left="fresh outta high school"
          right="straight into pension"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="staff">
          how&apos;s staff doing?
        </label>
        <RangeInput
          id="staff"
          min="1"
          max="3"
          step="0.5"
          name="r_staff"
          left="want to be yelled at"
          right="would bring my parents"
        />
      </fieldset>
      <fieldset className="w-fit flex flex-col items-center">
        <label className="block" htmlFor="prices">
          how much money should i bring?
        </label>
        <RangeInput
          id="prices"
          min="1"
          max="3"
          step="0.5"
          name="r_prices"
          left="basically for free"
          right="monthly salary"
        />
      </fieldset>
    </>
  );
}