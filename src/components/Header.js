import Link from "next/link";
import MenuButton from "./MenuButton";

export default function Header() {
  return (
    <header className="flex fixed top-0 flex-row align-spaced absolute top-0 left-0 z-10 bg-transparent px-2 py-4 pointer">
      <MenuButton />
      <nav>
        <Link className="cursor-pointer bg-black p-2" href="/">
          home
        </Link>
      </nav>
    </header>
  );
}
