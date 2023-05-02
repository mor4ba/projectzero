import { signIn, signOut } from "next-auth/react";

export default function Login({ session }) {
  if (session) {
    return (
      <div className="p-4 bg-black">
        signed in as {session.user.email} <br />
        <button
          type="button"
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={() => signOut()}
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            sign out
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black">
      not signed in <br />
      <button
        type="button"
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        onClick={() => signIn()}
      >
        <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          sign in
        </span>
      </button>{" "}
    </div>
  );
}
