export default function MenuButton() {
  const spans = [];
  for (let i = 0; i < 9; i++) {
    spans.push(<span class="col-span-1 self-center"></span>);
  }

  return (
    <div class="burger inline-block flex w-max lg:mr-9 lg:ml-4">
      <label
        htmlFor="burger-menu-button"
        class="inline-grid grid-cols-3 justify-items-center self-center"
        aria-haspopup="true"
        aria-controls="menu-burger"
        tabIndex="0"
      >
        <input type="checkbox" id="burger-menu-button" />
        {spans}
      </label>
    </div>
  );
}
