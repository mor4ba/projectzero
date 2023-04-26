import styled from "styled-components";
import Link from "next/link";

export default function Offcanvas({ offCanvasState }) {
  return (
    <div
      className={`offcanvas offcanvas__container fixed top-0 right-0 z-20 bg-white h-full w-2/5 transition-transform duration-300 p-10 border-l-4 border-sky-500 ${
        offCanvasState ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <nav className="flex flex-col gap-2 mt-20">
        <Link className="cursor-pointer bg-black p-2" href="/">
          home
        </Link>
        <Link className="cursor-pointer bg-black p-2" href="/places">
          places
        </Link>
      </nav>
    </div>
  );
}
