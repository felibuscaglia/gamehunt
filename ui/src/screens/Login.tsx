import { HttpStatusCode } from "axios";
import TextInput from "components/Inputs/Text";
import AuthFormLayout from "layouts/AuthForm";
import { apiClient } from "lib/axios/apiClient";
import {
  API_PATHS,
  UI_PATHS,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "store";
import { loadUser } from "store/features/loadingSlice";

const LogInScreen = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);
    setLoading(true);

    apiClient
      .post(API_PATHS.LOGIN, input)
      .then(() => {
        dispatch(loadUser(true));
        navigate(searchParams.get("redirectUri") || UI_PATHS.HOME);
      })
      .catch((err) => {
        if (err?.response?.status === HttpStatusCode.Unauthorized) {
          setError(true);
        } else {
          toast.error(UNEXPECTED_ERROR_MSG);
        }

        setLoading(false);
      });
  };

  return (
    <AuthFormLayout
      title="Login"
      buttonText="Sign in"
      onSubmit={login}
      loading={loading}
      displayError={error}
      errorComponent={<p className="text-red-500">Invalid credentials.</p>}
      bottomComponent={
        <Link
          to={UI_PATHS.RECOVER_PASSWORD}
          className="text-sm text-primary-brand-color"
        >
          Forgot your password?
        </Link>
      }
    >
      <TextInput
        label="Email"
        value={input.email}
        onChange={handleInputChange}
        id="email"
        type="email"
        placeholder="Enter your email address..."
        required
      />
      <TextInput
        label="Password"
        value={input.password}
        onChange={handleInputChange}
        id="password"
        type="password"
        placeholder="Enter your password..."
        required
      />
    </AuthFormLayout>
  );
};

export default LogInScreen;
