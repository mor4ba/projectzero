import { ratingClasses } from "@mui/material";
import ShowRating from "./ShowRating";
import { uid } from "uid";

export default function RatingDisplay({ data }) {
  // const ratings = [
  //   { title: "dresscode", left: "hip", right: "quirky", db: data.r_dresscode },
  //   {
  //     title: "should i bring my parents?",
  //     left: "ok",
  //     right: "cringe",
  //     db: {data.r_light}
  //   },
  //   {
  //     title: "people/squaremeter",
  //     left: "empty",
  //     right: "packed",
  //     db: data.r_amountOfPeople,
  //   },
  //   { title: "volume", left: "talkin", right: "dancin", db: data.r_volume },
  //   { title: "age", left: "high school", right: "pension", db: data.r_age },
  //   {
  //     title: "how we smell afterwards",
  //     left: "fresh laundry",
  //     right: "ashtray",
  //     db: data.r_isSmoking,
  //   },
  //   {
  //     title: "light situation",
  //     left: "hip",
  //     right: "quirky",
  //     db: data.r_light,
  //   },
  //   {
  //     title: "bring the shmoneyz?",
  //     left: "hip",
  //     right: "quirky",
  //     db: data.r_prices,
  //   },
  //   {
  //     title: "cute staff?",
  //     left: "kind.",
  //     right: "yell at you",
  //     db: data.r_staff,
  //   },
  //   {
  //     title: "heated place?",
  //     left: "too much",
  //     right: "siberia",
  //     db: data.r_temperature,
  //   },
  // ];

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
