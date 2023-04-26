import Link from "next/link";
import MenuButton from "./MenuButton";

export default function Header() {
  return (
    <header className="flex fixed top-0 flex-row align-spaced absolute top-0 left-0 z-10 bg-transparent px-2 py-4 pointer">
      <MenuButton />
      <nav className="flex flex-row gap-2">
        <Link className="cursor-pointer bg-black p-2" href="/">
          home
        </Link>
        <Link className="cursor-pointer bg-black p-2" href="/places">
          places
        </Link>
      </nav>
    </header>
  );
}
