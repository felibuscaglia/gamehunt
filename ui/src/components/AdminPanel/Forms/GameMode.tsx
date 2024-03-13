import TextInput from "components/Inputs/Text";
import AdminFormLayout from "layouts/AdminForm";
import { API_PATHS } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IAdminFormProps, IGameMode } from "lib/interfaces";
import { useState } from "react";

interface IInput {
  name: string;
}

const AdminPanelGameModeForm: React.FC<IAdminFormProps> = ({
  exitEditMode,
  appendNew,
  entityName,
}) => {
  const [input, setInput] = useState<IInput>({ name: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [K in keyof IInput]?: string[] }>({});

  const axiosAuth = useAxiosAuth();

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    axiosAuth
      .post<IGameMode>(API_PATHS.SAVE_GAME_MODE, input)
      .then(({ data }) => {
        appendNew(data);
        exitEditMode();
      })
      .catch((err) => {
        setErrors(err?.response?.data?.errors || {});
        setLoading(false);
      });
  };

  return (
    <AdminFormLayout
      onGoBackBtnClick={exitEditMode}
      onSubmit={handleFormSubmit}
      entityName={entityName}
      loading={loading}
    >
      <TextInput
        value={input.name}
        id="name"
        onChange={handleInputChange}
        label="Name"
        error={(errors.name || [])[0]}
      />
    </AdminFormLayout>
  );
};

export default AdminPanelGameModeForm;
