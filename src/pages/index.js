import { Inter } from "next/font/google";
import Form from "../components/Form.js";

import List from "../components/List.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Hello World</h1>
      <Form />
      <List />
    </main>
  );
}
