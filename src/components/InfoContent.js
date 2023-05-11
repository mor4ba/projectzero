import { useRouter } from "next/router";

export default function InfoContent({ classes }) {
  const router = useRouter();
  const { pathname } = router;

  switch (pathname) {
    case "/":
      return (
        <div className={`p-6  ${classes}`}>
          <h1 className="text-2xl mb-4 p-2 border-b-2">Hi lost souls!</h1>
          <p className="mb-4">
            This is quirky places. You are welcomed to answer some absurd
            questions to find places around matching your current vibe.{" "}
          </p>
          <h2 className="text-xl pb-4 ">
            Do not gatekeep the cool spots. share with us!
          </h2>
          <p className="mb-4">
            If you feel like contributing to the community, we encourage you to
            submit youre favorite places to our quirky databse by hitting the
            &apos;Plus&apos; sign on the top-right corner.
          </p>
          <p className="mb-4">
            For you feeling less bamboozled by all the flags in your area, we
            marked them to describe different types of venues.
          </p>
          <p className="mb-4">
            Blue flags mark the quirky bars while red ones mark clubs.
            Restaurants are marked green while any other quirky place - could be
            your most favourite bench at the park - are marked by yellow flags.
          </p>
        </div>
      );

    case "/places":
      return <div className={`p-4 ${classes}`}>all Places</div>;

    case `/places/[id]`:
      return (
        <div className={`p-4 ${classes}`}>
          <h1 className="text-2xl mb-4 border-b-2 p-4">
            congratulations stranger!
          </h1>
          <h2 className="p-4 text-xl mb-4 pb-0">
            You made it to a quirky place.
          </h2>
          <p className="mb-4 px-4">
            On this page you can learn more about the place and check it&apos;s
            rating aggregated by all users who&apos;ve been here.
          </p>
          <p className="mb-4 px-4">
            If you&apos;ve also been to this place before, give the community a
            hand and hit the white flag on the top-right. You&apos;re now
            enabled to also rate this place, which helps us to make our
            quirky-search more precise.
          </p>
          <h2 className="text-xl mb-4 p-4 pb-0">Your time to shine!</h2>
          <p className="mb-4 px-4">
            You can check out what other people liked most about this place in
            the comments and eventually leave your own. If you feel like a
            comment simply hits what this place is all about, give it a like.
            The most liked comments will be displayed further above so other
            people searching for some more in-depth information about this place
            get some valuable and precise first-hand opinion.
          </p>
          <h2 className="p-4 pb-0 text-xl mb-4">You like what you see?</h2>
          <p className="mb-4 px-4">
            Hit the bucket and save the place to your bucketlist. And if you
            really want to go but still missing company, invite some friends via
            SMS by hitting the invite-icon.
          </p>
        </div>
      );
  }
}
