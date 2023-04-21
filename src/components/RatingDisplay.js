import ShowRating from "./ShowRating";

export default function RatingDisplay({ data }) {
  return (
    <section className="rating_display flex flex-col gap-4">
      <h2 className="self-center text-xl uppercase">ratings</h2>
      <ShowRating
        left="hip"
        right="quirky"
        title="dresscode"
        count={data.r_dresscode}
        range="10"
      />
      <ShowRating
        left="ok"
        right="cringe"
        title="should i bring my parents?"
        count={data.r_cringe}
        range="10"
      />
      <ShowRating
        left="empty"
        right="packed"
        title="people / squaremeter"
        count={data.r_amountOfPeople}
        range="10"
      />
      <ShowRating
        left="talkin"
        right="dancin"
        title="volume"
        count={data.r_volume}
        range="10"
      />
      <ShowRating
        left="high school"
        right="pension"
        title="age"
        count={data.r_age}
        range="10"
      />
      <ShowRating
        left="fresh laundry"
        right="smoked salmon"
        title="how we gonna smell next day"
        count={data.r_isSmoking}
        range="10"
      />
      <ShowRating
        left="darkroom"
        right="floodlight"
        title="lights"
        count={data.r_lights}
        range="10"
      />
      <ShowRating
        left="basically for free"
        right="monthly salary"
        title="prices"
        count={data.r_prices}
        range="10"
      />
      <ShowRating
        left="want to be yelled at"
        right="friendly"
        title="staff"
        count={data.r_staff}
        range="10"
      />
      <ShowRating
        left="siberia"
        right="hell"
        title="bring a sweater?"
        count={data.r_temperature}
        range="10"
      />
    </section>
  );
}