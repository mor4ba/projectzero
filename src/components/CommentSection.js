import Comment from "./Comment";

export default function CommentSection({
  data,
  onSubmit,
  session,
  handleUpdateComment,
}) {
  data.comment.sort((a, b) => {
    if (a.likedBy.length < b.likedBy.length) return 1;
    if (a.likedBy.length > b.likedBy.length) return -1;
    return 0;
  });

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
      <ul className="overflow-hidden">
        {data.comment.map((comment) => {
          return (
            <Comment
              comment={comment}
              handleUpdateComment={handleUpdateComment}
              key={comment._id}
              session={session}
            />
          );
        })}
      </ul>
    </section>
  );
}
