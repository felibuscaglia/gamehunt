import Button from "components/Button";
import DialogLayout from "layouts/Dialog";
import { API_PATHS, UNEXPECTED_ERROR_MSG } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  gameId: string;
}

const ConfirmDeleteDialog: React.FC<IProps> = ({
  display,
  setDisplay,
  gameId,
}) => {
  const [deleting, setDeleting] = useState(false);

  const authApiClient = useAxiosAuth();
  const navigate = useNavigate();

  const deleteGame = () => {
    setDeleting(true);

    authApiClient
      .delete(API_PATHS.DELETE_GAME.replace(":gameId", gameId))
      .then(() => navigate(0))
      .catch((err) =>
        toast.error(err?.response?.data?.message || UNEXPECTED_ERROR_MSG)
      )
      .finally(() => setDeleting(false));
  };
  return (
    <DialogLayout display={display} setDisplay={setDisplay}>
      <h2 className="text-2xl font-bold text-left w-full">
        Are you sure you want to delete this draft game?
      </h2>
      <p className="text-gray-500 text-left w-full">
        You’ll lose all information related to it
      </p>
      <div className="w-1/4 mt-4 self-start">
        <Button
          text="Confirm"
          textSize="small"
          onClick={deleteGame}
          loading={deleting}
        />
      </div>
    </DialogLayout>
  );
};

export default ConfirmDeleteDialog;
