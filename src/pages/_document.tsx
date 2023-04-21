import { Html, Head, Main, NextScript } from "next/document";
import Header from "../components/Header";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gradient-to-r from-sky-500 to-indigo-500">
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
