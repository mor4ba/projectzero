import Link from "next/link";
import MenuButton from "./MenuButton";
import { useState } from "react";
import OffCanvas from "../components/Offcanvas";

export default function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <header
        className={`flex fixed top-0 flex-row align-spaced absolute top-0 right-0 z-40 bg-transparent px-2 py-4 pointer ${
          visible ? "expanded" : "closed"
        }`}
      >
        <MenuButton
          handleOffCanvasToggle={setVisible}
          offCanvasState={visible}
        />
      </header>
      <OffCanvas offCanvasState={visible} />
    </>
  );
}
