import RenderMap from "../components/Map.js";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
// import InitOverlay from "../components/InitOverlay.js";
// import { useState } from "react";
import useSWR from "swr";
import Spinner from "@/components/Spinner.js";

export default function Home() {
  const places = useSWR("/api/places", { fallbackData: [] });
  // const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);

  if (places.isLoading) return <Spinner />;

  return (
    <main className="">
      {/* {isWelcomeScreen ? (
        <InitOverlay handleInitOverlay={setIsWelcomeScreen} />
      ) : null} */}
      <RenderMap places={places} />
    </main>
  );
}
