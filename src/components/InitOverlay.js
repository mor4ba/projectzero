import { useRouter } from "next/router";
import { unmountComponentAtNode } from "react-dom";

export default function InitOverlay({ handleInitOverlay }) {
  const router = useRouter();
  const { data, push } = router;

  return (
    <div className="overlay-container absolute w-full justify-center h-full left-0 top-0 flex z-10">
      <div className="overlay  absolute w-full h-full backdrop-invert-0"></div>
      <div className="overlay absolute left-0 top-0 w-full h-full bg-black opacity-70 z-0"></div>
      <div className="overlay-content self-center z-10 flex flex-col content-center items-center">
        <h1 className="text-4xl pb-4 border-b-2 mb-2">Hi Stranger.</h1>
        <h2 className="text-lg mb-10">welcome to quirky places.</h2>
        <button
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={() => push("/places")}
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            log in
          </span>
        </button>
        <button
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={() => handleInitOverlay(false)}
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            browse
          </span>
        </button>
        <button
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={() => push("/")}
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            add new place
          </span>
        </button>
      </div>
    </div>
  );
}
