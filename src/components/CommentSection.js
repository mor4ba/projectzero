import { uid } from "uid";
import Heart from "./graphics/Heart";
import { useSession } from "next-auth/react";

export default function CommentSection({
  data,
  onSubmit,
  session,
  handleUpdateComment,
}) {
  return (
    <section className="comment__wrapper flex flex-col p-1.5">
      <form onSubmit={(event) => onSubmit(event)} className="commentform">
        <fieldset className="flex relative flex-col mb-4">
          <textarea
            className="block p-2 my-2 bg-transparent border-2 rounded-lg w-full order-2"
            type="text"
            name="comment"
            id="comment"
          ></textarea>
          <label className="block order-1 ml-2 monospace" htmlFor="comment">
            tell us the best thing about this place.
          </label>
        </fieldset>
        <button
          className="relative inline-flex items-center text-xl bg-secondary-color text-white p-1.5 px-6 mb-6 font-medium rounded-lg hover:bg-secondary-darker"
          type="submit"
        >
          submit
        </button>
      </form>
      <ul>
        {data.comment.map((comment) => {
          return (
            <li
              key={comment._id}
              className="p-4 text-md border-b-2 mb-4 shadow-md rounded-lg"
            >
              <div className="mb-4 pb-2 border-b border-primary-grey monospace flex flex-row nowrap justify-between">
                <p className="">{comment.date}</p>
                <span className="flex items-center align-center">
                  {comment.likedBy.length == "1"
                    ? `1 person liked this.`
                    : `${comment.likedBy.length} people liked this`}

                  <button
                    className="ml-2"
                    type="button"
                    onClick={() =>
                      handleUpdateComment(
                        comment._id,
                        data._id,
                        session.user.id
                      )
                    }
                  >
                    <Heart
                      state={
                        comment.likedBy.includes(session.user.id) ? true : null
                      }
                    />
                  </button>
                </span>
              </div>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
