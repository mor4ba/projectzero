import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-row align-spaced bg-transparent px-2 py-4 border-b-2 pointer">
      <nav>
        <Link className="cursor-pointer" href="/">
          home
        </Link>
      </nav>
    </header>
  );
}
