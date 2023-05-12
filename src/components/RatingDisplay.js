import { ratingClasses } from "@mui/material";
import ShowRating from "./ShowRating";
import { uid } from "uid";

export default function RatingDisplay({ data }) {
  return (
    <section className="rating_display flex flex-col gap-4 mt-10">
      {/* {ratings.map((entry) => {
        return (
          <ShowRating
            key={uid()}
            left={entry.left}
            right={entry.right}
            title={entry.title}
            count={entry.db}
            range="10"
          />
        );
      })} */}

      <ShowRating
        left="hip"
        right="quirky"
        title="dresscode"
        count={data.r_dresscode}
        range="10"
      />
      <ShowRating
        left="rather not"
        right="in best company"
        title="bring my weirdo friends?"
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
        right="bill murray"
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
        right="draconic prices"
        title="prices"
        count={data.r_prices}
        range="10"
      />
      <ShowRating
        left="want to be yelled at"
        right="lovely people"
        title="staff"
        count={data.r_staff}
        range="10"
      />
      <ShowRating
        left="siberia"
        right="oven"
        title="bring a sweater?"
        count={data.r_temperature}
        range="10"
      />
    </section>
  );
}
