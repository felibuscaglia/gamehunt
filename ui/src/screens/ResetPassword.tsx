import { IconMail } from "@tabler/icons-react";
import AuthButtons from "components/AuthButtons";
import Button from "components/Button";
import TextInput from "components/Inputs/Text";
import Logo from "components/Logo";
import AuthFormLayout from "layouts/AuthForm";
import { apiClient } from "lib/axios/apiClient";
import { API_PATHS, PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPasswordScreen = () => {
  const [input, setInput] = useState({ email: "" });
  const [userSubmitted, setUserSubmitted] = useState(false);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  const resetPassword = () => {
    if (!userSubmitted) {
      setUserSubmitted(true);
    }

    apiClient
      .post(API_PATHS.RESET_PASSWORD, input)
      .catch((err) => console.error(err));
  };

  if (userSubmitted) {
    return (
      <main className="h-screen flex flex-col">
        <nav className="w-10/12 mx-auto py-4 flex items-center justify-between">
          <Link to={UI_PATHS.HOME}>
            <Logo size={40} withName />
          </Link>
          <section className="flex items-center gap-6">
            <AuthButtons />
          </section>
        </nav>
        <div className="flex-grow w-10/12 mx-auto flex flex-col items-center justify-center gap-8">
          <IconMail color={PRIMARY_BRAND_COLOR} size={50} />
          <h2 className="text-2xl font-bold">Check Your Email</h2>
          <p className="text-gray-500">
            Please check the email address {input.email} for instructions to
            reset your password.
          </p>
          <div className="w-1/3">
            <Button text="Resend email" onClick={resetPassword} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <AuthFormLayout
      title="Reset your password"
      buttonText="Continue"
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword();
      }}
      bottomComponent={
        <Link className="text-sm text-primary-brand-color" to={UI_PATHS.LOGIN}>
          Back to login
        </Link>
      }
      withSso={false}
    >
      <p className="text-gray-500 text-sm text-center -mt-2">
        Enter your email address and we will send you instructions to reset your
        password.
      </p>
      <TextInput
        label="Email"
        value={input.email}
        onChange={handleInputChange}
        id="email"
        type="email"
        placeholder="Enter your email address..."
        required
      />
    </AuthFormLayout>
  );
};

export default ResetPasswordScreen;
