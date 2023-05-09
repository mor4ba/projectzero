export default function Spinner() {
  return (
    <>
      <div class="main-container">
        <div id="pinwheel-container">
          <div id="pin-1">
            <div class="pin-base"></div>
            <div class="pin-big-triangle"></div>
          </div>
          <div id="pin-2">
            <div class="pin-base"></div>
            <div class="pin-big-triangle"></div>
          </div>
          <div id="pin-3">
            <div class="pin-base"></div>
            <div class="pin-big-triangle"></div>
          </div>
          <div id="pin-4">
            <div class="pin-base"></div>
            <div class="pin-big-triangle"></div>
          </div>
          <div class="pinwheel-center-circle"></div>
        </div>
      </div>
      <div class="pinwheel-stick"></div>
    </>
  );
}
