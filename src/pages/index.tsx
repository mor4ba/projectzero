import { Inter } from "next/font/google";
import Form from "../components/Form.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-sky-500 to-indigo-500">
      <h1 className="text-3xl">Hello World</h1>
      <Form />
    </main>
  );
}
