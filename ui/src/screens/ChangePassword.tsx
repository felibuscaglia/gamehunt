import { IconCircleCheck } from "@tabler/icons-react";
import TextInput from "components/Inputs/Text";
import AuthFormLayout from "layouts/AuthForm";
import { apiClient } from "lib/axios/apiClient";
import {
  API_PATHS,
  PRIMARY_BRAND_COLOR,
  UI_PATHS,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IErrors {
  newPassword?: string[];
  newPasswordConfirmation?: string[];
}

const ChangePasswordScreen = () => {
  const [input, setInput] = useState({
    newPassword: "",
    newPasswordConfirmation: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [errors, setErrors] = useState<IErrors>({});

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (changingPassword) {
      return;
    }

    setChangingPassword(true);

    apiClient
      .post(API_PATHS.CHANGE_PASSWORD, {
        ...input,
        userId: searchParams.get("id"),
        token: searchParams.get("token"),
      })
      .then(() => setPasswordChanged(true))
      .catch((err) => {
        console.error(err);
        const API_ERRORS = err?.response?.data;

        if (!API_ERRORS || "token" in API_ERRORS || "userId" in API_ERRORS) {
          toast.error(UNEXPECTED_ERROR_MSG);
        } else if (API_ERRORS.message) {
          toast.error(API_ERRORS.message);
        } else {
          setErrors(API_ERRORS.errors || {});
        }
      })
      .finally(() => setChangingPassword(false));
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
      onSubmit={
        passwordChanged ? () => navigate(UI_PATHS.LOGIN) : changePassword
      }
      title={
        passwordChanged
          ? "Password changed successfully"
          : "Reset your password"
      }
      buttonText={passwordChanged ? "Login" : "Reset password"}
      withSso={false}
      loading={changingPassword}
    >
      {passwordChanged ? (
        <>
          <IconCircleCheck
            className="self-center"
            color={PRIMARY_BRAND_COLOR}
            size={50}
          />
        </>
      ) : (
        <>
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
            error={(errors.newPassword || [])[0]}
          />
          <TextInput
            label="Password"
            value={input.newPasswordConfirmation}
            onChange={handleInputChange}
            id="newPasswordConfirmation"
            type="password"
            placeholder="Re-enter your new password..."
            error={(errors.newPasswordConfirmation || [])[0]}
          />
        </>
      )}
    </AuthFormLayout>
  );
};

export default ChangePasswordScreen;
