import { uid } from "uid";

export default function CommentSection({ data, onSubmit }) {
  return (
    <section className="comment__wrapper flex flex-col">
      <h3 className="py-10 text-xl self-center">
        wanna do comments? you should.
      </h3>
      <form onSubmit={(event) => onSubmit(event)}>
        <fieldset>
          <label className="block mb-4" htmlFor="comment">
            What do you like most about this place?
          </label>
          <textarea
            className="block text-white p-2 mb-4 bg-transparent border-2 rounded-lg w-full"
            type="text"
            name="comment"
            id="comment"
          ></textarea>
        </fieldset>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-6 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          type="submit"
        >
          <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            submit
          </span>
        </button>
      </form>
      <ul>
        {data.comment.map((comment) => {
          return (
            <li key={comment._id} className="p-2 text-md border-b-2 mb-4">
              <p className="mb-2">{comment.date}</p>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
