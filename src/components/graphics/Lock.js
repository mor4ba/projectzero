export default function Lock({ state }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={state ? "fill-lime-300" : "fill-green-600"}
    >
      <title>lock</title>
      <path d="M13.875 10.5h-0.375v-4.5c0-2.481-2.019-4.5-4.5-4.5h-3c-2.481 0-4.5 2.019-4.5 4.5v4.5h-0.375c-0.619 0-1.125 0.506-1.125 1.125v11.25c0 0.619 0.506 1.125 1.125 1.125h12.75c0.619 0 1.125-0.506 1.125-1.125v-11.25c0-0.619-0.506-1.125-1.125-1.125zM4.5 6c0-0.827 0.673-1.5 1.5-1.5h3c0.827 0 1.5 0.673 1.5 1.5v4.5h-6v-4.5z"></path>
    </svg>
  );
}
