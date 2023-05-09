// import styled from "styled-components";
// import { useSession } from "next-auth/react";
import Link from "next/link";
import Login from "./Login";
import Chevron from "../components/graphics/Chevron";

export default function Offcanvas({
  offCanvasState,
  handleOffCanvasToggle,
  session,
}) {
  const userIsLoggedIn = (
    <Link
      className="cursor-pointer text-2xl p-2 flex flex-row no-wrap items-center p-4"
      href="/places/bucket"
      onClick={() => handleOffCanvasToggle(false)}
    >
      <Chevron className="text-tertiary-color" />
      <span className="text-secondary-darker">bucketlist</span>
    </Link>
  );
  return (
    <div
      className={`offcanvas offcanvas__container flex flex-col justify-between fixed top-0 bg-transparent right-0 z-20 h-full w-2/5 transition-transform duration-300 p-10 border-l-4 ${
        offCanvasState ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="offcanvas__background absolute -z-1 top-0 left-0 w-full h-full opacity-50 bg-primary-grey"></div>
      <nav className="flex flex-col gap-2 mt-20 z-10">
        <Link
          className="cursor-pointer text-2xl text-secondary-darker p-2 flex flex-row no-wrap items-center p-4"
          href="/"
          onClick={() => handleOffCanvasToggle(false)}
        >
          <Chevron className="text-tertiary-color" />
          <span className="text-secondary-darker">home</span>
        </Link>
        <Link
          className="cursor-pointer text-2xl text-secondary-darker p-2 flex flex-row no-wrap items-center p-4"
          href="/places"
          onClick={() => handleOffCanvasToggle(false)}
        >
          <Chevron className="text-tertiary-color" />
          <span className="text-secondary-darker">places</span>
        </Link>
        {session ? userIsLoggedIn : null}
      </nav>

      <Login session={session} />
    </div>
  );
}
