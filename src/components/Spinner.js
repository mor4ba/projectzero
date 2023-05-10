export default function Spinner() {
  return (
    <>
      <div className="main-container">
        <div id="pinwheel-container">
          <div id="pin-1">
            <div className="pin-base"></div>
            <div className="pin-big-triangle"></div>
          </div>
          <div id="pin-2">
            <div className="pin-base"></div>
            <div className="pin-big-triangle"></div>
          </div>
          <div id="pin-3">
            <div className="pin-base"></div>
            <div className="pin-big-triangle"></div>
          </div>
          <div id="pin-4">
            <div className="pin-base"></div>
            <div className="pin-big-triangle"></div>
          </div>
          <div className="pinwheel-center-circle"></div>
        </div>
      </div>
      <div className="pinwheel-stick"></div>
    </>
  );
}
