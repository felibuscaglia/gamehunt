import TextInput from "components/Inputs/Text";
import AuthFormLayout from "layouts/AuthForm";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ChangePasswordScreen = () => {
  const [input, setInput] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const [searchParams] = useSearchParams();

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if(changingPassword) {
        return;
    }

    setChangingPassword(true);


  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput) => ({
      ...prevInput,
      [target.id]: target.value,
    }));
  };

  return (
    <AuthFormLayout
      onSubmit={changePassword}
      title="Reset your password"
      buttonText="Reset password"
      withSso={false}
      loading={changingPassword}
    >
      <p className="text-gray-500 text-sm text-center -mt-2">
        Enter a new password below to change your password.
      </p>
      <TextInput
        label="Password"
        value={input.newPassword}
        onChange={handleInputChange}
        id="newPassword"
        type="password"
        placeholder="Enter your new password..."
        required
      />
      <TextInput
        label="Password"
        value={input.newPassword}
        onChange={handleInputChange}
        id="newPassword"
        type="password"
        placeholder="Re-enter your new password..."
        required
      />
    </AuthFormLayout>
  );
};

export default ChangePasswordScreen;
