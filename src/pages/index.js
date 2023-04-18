import { Inter } from "next/font/google";
import Form from "../components/Form.js";
import { SWRConfig } from "swr";
import List from "../components/List.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-sky-500 to-indigo-500">
        <h1 className="text-3xl">Hello World</h1>
        <Form />
        <List />
      </main>
    </SWRConfig>
  );
}
