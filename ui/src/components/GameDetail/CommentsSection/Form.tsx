import Button from "components/Button";
import { UI_PATHS } from "lib/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store";

interface IProps {
  onSubmit: (input: string) => void;
  loading: boolean;
  isReply?: boolean;
  onCancelClick?: () => void;
}

const CommentsSectionForm: React.FC<IProps> = ({
  loading,
  onSubmit,
  isReply = false,
  onCancelClick = () => {},
}) => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  const id = isReply ? "reply" : "comment";

  return (
    <form className="flex flex-col" onSubmit={handleFormSubmit}>
      <div className="py-2 px-4 mb-4 bg-transparent rounded-lg border border-gray-200">
        <label htmlFor={id} className="sr-only">
          Your {id}
        </label>
        <textarea
          id={id}
          rows={6}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
          placeholder={`Write a ${id}...`}
          value={input}
          onChange={({ target }) => setInput(target.value)}
          required
        />
      </div>
      <div className="self-end w-1/2 flex flex-row-reverse items-center gap-4">
        <div className="w-1/2">
          {user ? (
            <Button
              text={`Post a ${id}`}
              textSize="small"
              disabled={input.trim().length <= 0}
              loading={loading}
              type="submit"
            />
          ) : (
            <Button
              text="Login to comment"
              textSize="small"
              onClick={() =>
                navigate(
                  `${UI_PATHS.LOGIN}?redirectUri=${window.location.pathname}`
                )
              }
              type="button"
            />
          )}
        </div>
        {isReply && (
          <button
            onClick={onCancelClick}
            className="text-primary-brand-color text-sm hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentsSectionForm;
