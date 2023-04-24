import { Inter } from "next/font/google";
import Form from "../components/Form.js";
import RenderMap from "../components/Map.js";
import List from "../components/List.js";
const inter = Inter({ subsets: ["latin"] });
import InitOverlay from "../components/InitOverlay.js";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-4xl m-auto">
      {/* <InitOverlay /> */}
      <RenderMap />
      <Form />
      <List />
    </main>
  );
}
