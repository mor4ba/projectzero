import { Html, Head, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white">
        <NextScript />
        <div className="fill-yellow-500"></div>
        <div className="fill-green-600"></div>
        <div className="fill-red-600"></div>
        <div className="fill-sky-600"></div>
      </body>
    </Html>
  );
}
