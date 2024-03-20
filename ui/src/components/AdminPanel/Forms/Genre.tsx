import TextInput from "components/Inputs/Text";
import AdminFormLayout from "layouts/AdminForm";
import { API_PATHS } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IAdminFormProps, IGenre, ISubgenre } from "lib/interfaces";
import { useState } from "react";

interface IInput {
  name: string;
}

const AdminPanelGenreForm: React.FC<IAdminFormProps> = ({
  exitEditMode,
  appendNew,
  entityName,
}) => {
  const [input, setInput] = useState<IInput>({ name: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [K in keyof IInput]?: string[] }>({});

  const authApiClient = useAxiosAuth();

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

    setLoading(false);
    setErrors({});

    authApiClient
      .post<IGenre | ISubgenre>(API_PATHS.CREATE_GENRE, input)
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

export default AdminPanelGenreForm;
