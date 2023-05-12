import { uid } from "uid";
import Heart from "./graphics/Heart";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";

export default function Comment({ comment, handleUpdateComment, session }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(entry.isIntersecting);
          observer.unobserve(ref.current);
        }
      });
    });
    observer.observe(ref.current);
  }, []);

  return (
    <li
      className={`p-4 text-md border-b-2 mb-4 shadow-md rounded-lg effect_on ${
        isVisible ? "visible" : ""
      }`}
      ref={ref}
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
            onClick={
              session
                ? () =>
                    handleUpdateComment(comment._id, data._id, session.user.id)
                : null
            }
          >
            <Heart
              state={
                session
                  ? comment.likedBy.includes(session.user.id)
                    ? true
                    : null
                  : null
              }
            />
          </button>
        </span>
      </div>
      <p>{comment.body}</p>
    </li>
  );
}
