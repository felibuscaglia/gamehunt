import Button from "components/Button";
import Input from "components/Input";
import Logo from "components/Logo";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, APP_NAME, UI_PATHS } from "lib/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const LINK_CLASSNAMES = "underline";

const SignUpScreen = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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

    apiClient
      .post(API_PATHS.SIGN_UP, {})
      .then(() => {})
      .catch((err) => {
        console.log({ err });
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
          />
          <Input
            label="Email"
            placeholder="Enter your email address..."
            value={input.email}
            onChange={handleInputChange}
            id="email"
            type="email"
          />
          <Input
            label="Password"
            placeholder="Enter your password..."
            value={input.password}
            onChange={handleInputChange}
            id="password"
            type="password"
          />
          <Button type="submit" text="Create account" />
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
