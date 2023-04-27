import { Inter } from "next/font/google";
import RenderMap from "../components/Map.js";
const inter = Inter({ subsets: ["latin"] });
import InitOverlay from "../components/InitOverlay.js";
import { useState } from "react";

export default function Home() {
  const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);

  return (
    <main className="">
      {/* {isWelcomeScreen ? (
        <InitOverlay handleInitOverlay={setIsWelcomeScreen} />
      ) : null} */}
      <RenderMap />
    </main>
  );
}
