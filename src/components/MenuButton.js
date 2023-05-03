export default function MenuButton({ handleOffCanvasToggle, offCanvasState }) {
  const spans = [];
  for (let i = 0; i < 9; i++) {
    spans.push(
      <span
        key={i}
        className="col-span-1 self-center bg-secondary-darker"
      ></span>
    );
  }

  return (
    <button
      className="burger inline-block flex w-max lg:mr-4"
      onClick={() => handleOffCanvasToggle(!offCanvasState)}
    >
      <label
        htmlFor="burger-menu-button"
        className="inline-grid grid-cols-3 justify-items-center self-center"
        aria-haspopup="true"
        aria-controls="menu-burger"
        tabIndex="0"
      >
        {spans}
      </label>
    </button>
  );
}
