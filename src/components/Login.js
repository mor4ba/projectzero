import { signIn, signOut } from "next-auth/react";
import UserIcon from "../components/graphics/User";

export default function Login({ session }) {
  if (session) {
    return (
      <div className="lg:p-4 mb-10 flex flex-col gap-4 justify-center items-center z-10">
        <div className="wrapper flex flex-row gap-4">
          <UserIcon />
          <span className="monospace text-lg">{session.user.email}</span>
        </div>
        <button
          className="p-1 px-4 bg-secondary-color rounded-lg cursor-pointer hover:bg-secondary-darker"
          type="button"
          onClick={() => signOut()}
        >
          sign out
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 justify-center items-center z-10">
      <span className="monospace text-lg">not signed in</span>
      <button
        type="button"
        className="p-1 px-4 bg-secondary-color rounded-lg cursor-pointer hover:bg-secondary-darker"
        onClick={() => signIn()}
      >
        <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          sign in
        </span>
      </button>
    </div>
  );
}
