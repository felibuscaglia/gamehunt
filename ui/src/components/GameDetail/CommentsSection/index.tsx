import { IComment } from "lib/interfaces";
import { forwardRef, useState } from "react";
import Comment from "./Comment";
import { API_PATHS, UNEXPECTED_ERROR_MSG } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import toast from "react-hot-toast";
import Form from "./Form";

interface ISaveCommentDto {
  gameId: string;
  content: string;
  parentCommentId?: number;
}

interface IProps {
  comments: IComment[];
  gameId: string;
}

const GameDetailCommentsSection = forwardRef<HTMLElement, IProps>(
  ({ comments: _comments, gameId }, ref) => {
    const [posting, setPosting] = useState(false);
    const [comments, setComments] = useState(_comments);

    const authApiClient = useAxiosAuth();

    const handleFormSubmit = (content: string, comment?: IComment) => {
      if (posting) {
        return;
      }

      setPosting(true);

      const DTO: ISaveCommentDto = { gameId, content };

      if (comment) {
        DTO.parentCommentId = comment.id;
      }

      authApiClient
        .post<IComment>(API_PATHS.SAVE_COMMENT, DTO)
        .then(({ data }) => {
          if (comment) {
            setComments((prevComments) => {
              const UPDATED_COMMENTS = [...prevComments];
              const COMMENT_INDEX = prevComments.findIndex(
                (c) => c.id === comment.id
              );

              UPDATED_COMMENTS[COMMENT_INDEX] = {
                ...comment,
                replies: [data, ...comment.replies],
              };

              return UPDATED_COMMENTS;
            });
          } else {
            setComments((prevComments) => [data, ...prevComments]);
          }
        })
        .catch((err) =>
          toast.error(err.response?.data?.message || UNEXPECTED_ERROR_MSG)
        )
        .finally(() => setPosting(false));
    };

    return (
      <section className="py-8 lg:py-16 antialiased" ref={ref}>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Discussion ({comments.length})
            </h2>
          </div>
          <Form onSubmit={handleFormSubmit} loading={posting} />
          <div className="divide-y divide-y-gray-500">
            {comments.map((comment) => {
              if (!comment.parent) {
                return (
                  <Comment
                    onReplySubmit={handleFormSubmit}
                    comment={comment}
                    key={`comment-${comment.id}`}
                  />
                );
              }
            })}
          </div>
        </div>
      </section>
    );
  }
);

export default GameDetailCommentsSection;
