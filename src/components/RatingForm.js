import RangeInput from "./RangeInput";

export default function RatingForm() {
  return (
    <div className="ratingWrapper flex flex-col gap-4">
      <p className="mb-6">
        To help others to vibe with your place, its helpful to go to through
        some absurd criteria which will help us to put your quirky place in the
        right spotlight.
      </p>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="self-center text-lg" htmlFor="r_dresscode">
          lets talk outfits! certain dresscode?
        </label>
        <RangeInput
          id="r_dresscode"
          name="r_dresscode"
          min="0"
          max="10"
          start="5"
          step="0.5"
          left="hip"
          right="quirky"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="amountOfPeople">
          is the place usually packed?
        </label>
        <RangeInput
          id="amountOfPeople"
          name="r_amountOfPeople"
          min="0"
          max="10"
          step="0.5"
          start="5"
          left="tempelhofer feld"
          right="packed & sweaty"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="volume">
          Volume
        </label>
        <RangeInput
          id="volume"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_volume"
          left="talkin"
          right="dancin"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="isSmoking">
          are we gonna get smoked?
        </label>
        <RangeInput
          id="isSmoking"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_isSmoking"
          left="crisp fresh laundry"
          right="smoked salmon"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="temperature">
          bring a pullover?
        </label>
        <RangeInput
          id="temperature"
          min="0"
          max="10"
          step="0.5"
          start="5"
          name="r_temperature"
          left="siberia"
          right="devils kitchen"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="lights">
          Lights
        </label>
        <RangeInput
          id="lights"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_lights"
          left="darkroom"
          right="floodlight"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="cringe">
          Cringeness
        </label>
        <RangeInput
          id="cringe"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_cringe"
          left="not at all"
          right="cringealert"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="age">
          Average age
        </label>
        <RangeInput
          id="age"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_age"
          left="fresh outta high school"
          right="straight into pension"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="staff">
          how&apos;s staff doing?
        </label>
        <RangeInput
          id="staff"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_staff"
          left="want to be yelled at"
          right="would bring my parents"
        />
      </fieldset>
      <fieldset className="w-full flex flex-col gap-4 border-b-2 pb-4 items-center">
        <label className="block" htmlFor="prices">
          how much money should i bring?
        </label>
        <RangeInput
          id="prices"
          min="0"
          max="10"
          start="5"
          step="0.5"
          name="r_prices"
          left="basically for free"
          right="monthly salary"
        />
      </fieldset>
    </div>
  );
}
