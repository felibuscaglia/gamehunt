import Button from "components/Button";
import TextInput from "components/Inputs/Text";
import { API_PATHS } from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { ICategory } from "lib/interfaces";
import { useState } from "react";

interface IProps {
  exitEditMode: () => void;
  appendNewCategory: (newCategory: ICategory) => void;
}

interface IInput {
  name: string;
}

const AdminPanelForm: React.FC<IProps> = ({
  exitEditMode,
  appendNewCategory,
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

    setLoading(false);
    setErrors({});

    axiosAuth
      .post<ICategory>(API_PATHS.CREATE_CATEGORY, input)
      .then(({ data: newCategory }) => {
        appendNewCategory(newCategory);
        exitEditMode();
      })
      .catch((err) => {
        setErrors(err?.response?.data?.errors);
        setLoading(false);
      });
  };

  return (
    <div>
      <button
        className="underline text-primary-brand-color"
        onClick={exitEditMode}
      >
        &#8592; Go back
      </button>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-8"
      >
        <h3 className="text-2xl font-bold text-center">New category</h3>
        <TextInput
          value={input.name}
          id="name"
          onChange={handleInputChange}
          label="Name"
          error={(errors.name || [])[0]}
        />
        <div className="w-1/2">
          <Button type="submit" text="Create" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default AdminPanelForm;
