export default function InitOverlay() {
  return (
    <div className="overlay-container absolute w-full justify-center h-full left-0 top-0 flex opacity-60 z-10 bg-black">
      <div className="overlay self-center">
        <h1 className="text-4xl pb-4 border-b-2 mb-2">Hi Stranger.</h1>
        <h2 className="text-lg">welcome to quirky places.</h2>
      </div>
    </div>
  );
}
