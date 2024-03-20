import { IconMessage } from "@tabler/icons-react";
import { IComment } from "lib/interfaces";
import Form from "./Form";
import { useState } from "react";

interface IProps {
  isReply?: boolean;
  comment: IComment;
  onReplySubmit?: (reply: string, comment?: IComment) => void;
}

const Comment: React.FC<IProps> = ({
  isReply = false,
  comment,
  onReplySubmit = () => {},
}) => {
  const [displayForm, setDisplayForm] = useState(false);

  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article
      className={`text-base ${
        isReply ? "ml-6 lg:ml-12 pt-3" : "pt-6"
      }`}
    >
      <footer className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt={comment.author?.fullName}
            />
            {comment.author?.fullName}
            <span className="text-gray-400 ml-1 font-normal">
              @felibuscaglia
            </span>
          </p>
          <p className="text-sm text-gray-600">
            <time dateTime={formattedDate}>{formattedDate}</time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500">{comment.content}</p>
      <div className="flex items-center my-4 space-x-4">
        {!isReply && (
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-gray-500 hover:underline font-medium"
            onClick={() => setDisplayForm(true)}
          >
            <IconMessage size={15} />
            Reply
          </button>
        )}
        {/* <button
          type="button"
          className="flex items-center gap-px text-sm text-gray-500 hover:text-primary-brand-color font-medium"
        >
          <IconThumbUp size={15} />3
        </button> */}
      </div>
      {displayForm && (
        <Form
          isReply
          onCancelClick={() => setDisplayForm(false)}
          onSubmit={(reply) => onReplySubmit(reply, comment)}
          loading={false}
        />
      )}
      {
        (comment.replies || []).map((reply) => (
          <Comment
            key={`reply-${comment.id}-${reply.id}`}
            comment={reply}
            isReply
            onReplySubmit={onReplySubmit}
          />
        ))}
    </article>
  );
};

export default Comment;
