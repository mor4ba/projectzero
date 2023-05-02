import styled from "styled-components";
import Link from "next/link";
import Login from "./Login";
import { useSession } from "next-auth/react";

export default function Offcanvas({ offCanvasState, handleOffCanvasToggle }) {
  const { data: session } = useSession();
  console.log(session);

  const userIsLoggedIn = (
    <Link
      className="cursor-pointer bg-black p-2"
      href="/places/bucket"
      onClick={() => handleOffCanvasToggle(false)}
    >
      bucket list
    </Link>
  );
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
        {session ? userIsLoggedIn : null}
      </nav>

      <Login session={session} />
    </div>
  );
}
