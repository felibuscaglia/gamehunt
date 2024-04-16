import { AxiosResponse, HttpStatusCode } from "axios";
import TextInput from "components/Inputs/Text";
import AuthFormLayout from "layouts/AuthForm";
import { apiClient } from "lib/axios/apiClient";
import {
  API_PATHS,
  APP_NAME,
  UI_PATHS,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LINK_CLASSNAMES = "underline";

interface IInput {
  fullName: string;
  email: string;
  password: string;
}

const SignUpScreen = () => {
  const [input, setInput] = useState<IInput>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [K in keyof IInput]?: string[] }>({});
  const [emailConflictError, setEmailConflictError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    setEmailConflictError(false);

    apiClient
      .post(API_PATHS.SIGN_UP, input)
      .then<AxiosResponse>(() =>
        apiClient.post(API_PATHS.LOGIN, {
          email: input.email,
          password: input.password,
        })
      )
      .then(() => navigate(UI_PATHS.HOME))
      .catch((err) => {
        if (err?.response?.data?.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.status === HttpStatusCode.Conflict) {
          setEmailConflictError(true);
        } else {
          toast.error(UNEXPECTED_ERROR_MSG);
        }

        setLoading(false);
      });
  };

  return (
    <AuthFormLayout
      title="Sign up"
      buttonText="Create account"
      displayError={emailConflictError}
      errorComponent={
        <p className="text-red-500">
          Email already in use. Please, login from{" "}
          <Link className="underline" to={UI_PATHS.LOGIN}>
            here
          </Link>
          .
        </p>
      }
      onSubmit={handleFormSubmit}
      loading={loading}
      bottomComponent={
        <p className="text-xs sm:w-1/2 text-gray-400 text-center">
          By clicking “Create account” above, you acknowledge that you have read
          and understood, and agree to {APP_NAME}'s{" "}
          <Link className={LINK_CLASSNAMES} to={UI_PATHS.TERMS}>
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link className={LINK_CLASSNAMES} to={UI_PATHS.PRIVACY_POLICY}>
            Privacy Policy
          </Link>
          .
        </p>
      }
    >
      <TextInput
        label="Full name"
        placeholder="Enter your full name..."
        value={input.fullName}
        onChange={handleInputChange}
        id="fullName"
        error={(errors.fullName || [])[0]}
        required
      />
      <TextInput
        label="Email"
        placeholder="Enter your email address..."
        value={input.email}
        onChange={handleInputChange}
        id="email"
        type="email"
        error={(errors.email || [])[0]}
        required
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={input.password}
        onChange={handleInputChange}
        id="password"
        type="password"
        error={(errors.password || [])[0]}
        required
      />
    </AuthFormLayout>
  );
};

export default SignUpScreen;
