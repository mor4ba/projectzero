export default function Map({ state }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={state ? "fill-green-500" : "fill-green-600"}
    >
      <title>map1</title>
      <path d="M0 4.5l7.5-3v18l-7.5 3z"></path>
      <path d="M9 0.75l7.5 4.5v17.25l-7.5-3.75z"></path>
      <path d="M18 5.25l6-4.5v18l-6 4.5z"></path>
    </svg>
  );
}
