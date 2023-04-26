import styled from "styled-components";
import Link from "next/link";

export default function Offcanvas({ offCanvasState, handleOffCanvasToggle }) {
  return (
    <div
      className={`offcanvas offcanvas__container flex flex-col justify-between fixed opacity-70 top-0 right-0 z-20 bg-white h-full w-2/5 transition-transform duration-300 p-10 border-l-4 border-sky-500 ${
        offCanvasState ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <nav className="flex flex-col gap-2 mt-20">
        <Link
          className="cursor-pointer bg-black p-2"
          href="/"
          onClick={() => handleOffCanvasToggle(false)}
        >
          home
        </Link>
        <Link
          className="cursor-pointer bg-black p-2"
          href="/places"
          onClick={() => handleOffCanvasToggle(false)}
        >
          places
        </Link>
      </nav>

      <button
        type="button"
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        onClick={() => push("/places")}
      >
        <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          log in
        </span>
      </button>
    </div>
  );
}
