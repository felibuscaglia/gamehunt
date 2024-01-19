import SelectInput from "components/Inputs/Select";
import TextInput from "components/Inputs/Text";
import AdminFormLayout from "layouts/AdminForm";
import { API_PATHS } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IAdminFormProps, IGenre, ISubgenre } from "lib/interfaces";
import { useState } from "react";
import { useAppSelector } from "store";

interface IInput {
  name: string;
  genre: IGenre | null;
}

interface IErrors {
  name?: string[];
  genreId?: string[];
}

const AdminPanelSubgenreForm: React.FC<IAdminFormProps> = ({
  exitEditMode,
  appendNew,
  entityName,
}) => {
  const [input, setInput] = useState<IInput>({ name: "", genre: null });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const genres = useAppSelector((state) => state.genres.genres);

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

    setLoading(false);
    setErrors({});

    const { genre: selectedGenre, ...dto } = input;

    axiosAuth
      .post<ISubgenre>(API_PATHS.CREATE_SUBGENRE, {
        ...dto,
        genreId: selectedGenre?.id,
      })
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
      <SelectInput<IGenre>
        selected={input.genre}
        setSelected={(selectedGenre) =>
          setInput({ ...input, genre: selectedGenre })
        }
        displayKey="name"
        options={genres}
        error={(errors.genreId || [])[0]}
      />
    </AdminFormLayout>
  );
};

export default AdminPanelSubgenreForm;
