import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gradient-to-r from-sky-500 to-indigo-500">
        <Main />
        <NextScript />
        <div className="fill-yellow-500"></div>
        <div className="fill-green-600"></div>
        <div className="fill-red-600"></div>
        <div className="fill-sky-600"></div>
      </body>
    </Html>
  );
}
