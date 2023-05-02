import Link from "next/link";
import MenuButton from "./MenuButton";
import { useState } from "react";
import OffCanvas from "../components/Offcanvas";
import Plus from "../components/graphics/Plus";
import Info from "../components/graphics/Info";
import Modal from "@mui/material/Modal";
import Form from "./Form";
import { useRouter } from "next/router";
import InfoContent from "./InfoContent";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { push, pathname } = router;
  const handleOpen = (modalContent) => {
    if (pathname != "/" && modalContent === "addPlace") {
      push("/");
    }
    setModalContent(modalContent);
    setOpen(true);
  };

  return (
    <>
      <header
        className={`flex fixed top-0 flex-row align-spaced absolute items-center top-0 right-0 z-40 bg-transparent gap-4 px-2 py-4 pointer ${
          visible ? "expanded" : "closed"
        }`}
      >
        <button type="button" onClick={() => handleOpen("pageInfo")}>
          <Info />
        </button>
        <button type="button" onClick={() => handleOpen("addPlace")}>
          <Plus />
        </button>
        <MenuButton
          handleOffCanvasToggle={setVisible}
          offCanvasState={visible}
        />
      </header>
      <OffCanvas offCanvasState={visible} handleOffCanvasToggle={setVisible} />
      <Modal
        open={open}
        className="overflow-scroll py-20"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent === "addPlace" ? (
          <div className="flex self-center items-center  justify-center">
            <Form
              classes="bg-gradient-to-r from-sky-500 to-indigo-500 max-w-2xl shadow-2xl"
              handleClose={handleClose}
            />
          </div>
        ) : (
          <div className="flex self-center items-center  justify-center">
            <InfoContent classes="bg-gradient-to-r from-sky-500 to-indigo-500 max-w-2xl shadow-2xl" />
          </div>
        )}
      </Modal>
    </>
  );
}
