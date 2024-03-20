import { IComment } from "lib/interfaces";
import { forwardRef, useState } from "react";
import Comment from "./Comment";
import { API_PATHS, UNEXPECTED_ERROR_MSG } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import toast from "react-hot-toast";
import Form from "./Form";

interface IProps {
  comments: IComment[];
  gameId: string;
}

const GameDetailCommentsSection = forwardRef<HTMLElement, IProps>(
  ({ comments, gameId }, ref) => {
    const [posting, setPosting] = useState(false);

    const authApiClient = useAxiosAuth();

    const handleFormSubmit = (content: string) => {
      if (posting) {
        return;
      }

      setPosting(true);

      authApiClient
        .post(API_PATHS.SAVE_COMMENT, { gameId, content })
        .then(() => {})
        .catch(() =>
          toast.error(
            content.trim().length
              ? UNEXPECTED_ERROR_MSG
              : "The comment must not be empty"
          )
        )
        .finally(() => setPosting(false));
    };

    console.log({ comments });

    return (
      <section className="py-8 lg:py-16 antialiased" ref={ref}>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Discussion ({comments.length})
            </h2>
          </div>
          <Form onSubmit={handleFormSubmit} loading={posting} />
          {comments.map((comment) => (
            <Comment comment={comment} key={`comment-${comment.id}`} />
          ))}
        </div>
      </section>
    );
  }
);

export default GameDetailCommentsSection;
