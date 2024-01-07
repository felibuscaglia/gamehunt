import Button from "components/Button";
import Input from "components/Input";
import Logo from "components/Logo";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, APP_NAME, UI_PATHS } from "lib/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);

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

    apiClient
      .post(API_PATHS.SIGN_UP, {})
      .then(() => {})
      .catch((err) => {
        setErrors(err);
        setLoading(false);
      });
  };

  return (
    <main className="h-screen flex flex-col">
      <nav className="w-10/12 mx-auto py-4">
        <Link to={UI_PATHS.HOME}>
          <Logo size={40} withName />
        </Link>
      </nav>
      <div className="flex-grow w-10/12 mx-auto flex flex-col items-center justify-center gap-8">
        <h2 className="text-5xl font-bold">Sign up</h2>
        <form className="w-1/4 flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <Input
            label="Full name"
            placeholder="Enter your full name..."
            value={input.fullName}
            onChange={handleInputChange}
            id="fullName"
            error={(errors.fullName || [])[0]}
            required
          />
          <Input
            label="Email"
            placeholder="Enter your email address..."
            value={input.email}
            onChange={handleInputChange}
            id="email"
            type="email"
            error={(errors.email || [])[0]}
            required
          />
          <Input
            label="Password"
            placeholder="Enter your password..."
            value={input.password}
            onChange={handleInputChange}
            id="password"
            type="password"
            error={(errors.password || [])[0]}
            required
          />
          <Button type="submit" text="Create account" loading={loading} />
        </form>
        <p className="text-xs w-1/2 text-gray-400 text-center">
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
      </div>
    </main>
  );
};

export default SignUpScreen;
