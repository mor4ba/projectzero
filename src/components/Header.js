import MenuButton from "./MenuButton";
import { useState } from "react";
import OffCanvas from "../components/Offcanvas";
import Plus from "../components/graphics/Plus";
import Info from "../components/graphics/Info";
import Map from "../components/graphics/Map";
import Lock from "../components/graphics/Lock";
import Arrow from "../components/graphics/Arrow";
import Modal from "@mui/material/Modal";
import Form from "./Form";
import { useRouter } from "next/router";
import InfoContent from "./InfoContent";
import { useSession } from "next-auth/react";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { push, pathname } = router;
  const { data: session } = useSession();

  const handleOpen = (modalContent) => {
    if (pathname != "/" && modalContent === "addPlace") {
      push("/");
    }
    setModalContent(modalContent);
    setOpen(true);
  };

  const userIsLoggedIn = (
    <button
      type="button"
      onClick={() => handleOpen("addPlace")}
      className="self-start"
    >
      <Plus />
    </button>
  );
  const adminIsLoggedIn = (
    <>
      <button
        className="relative"
        type="button"
        onClick={() => {
          handleClose();
          router.push("/places/moderation");
        }}
      >
        <Lock />
      </button>
      <button type="button" onClick={() => handleOpen("addPlace")}>
        <Plus />
      </button>
    </>
  );

  return (
    <>
      <header
        className={`${
          router.pathname != "/" ? "w-full" : null
        } flex fixed top-0 flex-row align-spaced absolute items-center justify-end top-0 right-0 z-40 bg-transparent gap-6 px-2 py-4 pointer ${
          visible ? "expanded" : "closed"
        }`}
      >
        {pathname != "/" ? (
          <button
            className="absolute left-4 flex flex-row items-center"
            type="button"
            onClick={() => router.back()}
          >
            <Arrow /> <span className="monospace ml-3">back</span>
          </button>
        ) : null}
        {session && session.user.role === "user"
          ? userIsLoggedIn
          : session
          ? adminIsLoggedIn
          : null}

        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-darker-grey hover:text-secondary-color"
        >
          <Map />
        </button>
        <button type="button" onClick={() => handleOpen("pageInfo")}>
          <Info />
        </button>
        <MenuButton
          handleOffCanvasToggle={setVisible}
          offCanvasState={visible}
        />
      </header>
      <OffCanvas
        offCanvasState={visible}
        handleOffCanvasToggle={setVisible}
        session={session}
      />
      <Modal
        open={open}
        className="overflow-scroll py-20"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalContent === "addPlace" ? (
          <div className=" flex self-center items-center mx-40 bg-cover bg-no-repeat justify-center">
            <Form
              classes=" max-w-3/4 md:max-w-3xl shadow-2xl shadow-secondary-color bg-white p-20"
              handleClose={handleClose}
              session={session}
            />
          </div>
        ) : (
          <div className="flex self-center items-center  justify-center">
            <InfoContent classes="max-w-full mx-4 bg-white md:max-w-2xl shadow-xl shadow-secondary-color" />
          </div>
        )}
      </Modal>
    </>
  );
}
