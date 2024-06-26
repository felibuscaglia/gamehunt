import AuthButtons from "components/AuthButtons";
import Button from "components/Button";
import Logo from "components/Logo";
import SocialAuth from "components/SocialAuth";
import { UI_PATHS } from "lib/constants";
import { Link } from "react-router-dom";

interface IProps {
  displayError?: boolean;
  errorComponent?: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  loading?: boolean;
  children: React.ReactNode;
  bottomComponent?: React.ReactNode;
  title: string;
  buttonText: string;
  withSso?: boolean;
}

const AuthFormLayout: React.FC<IProps> = ({
  displayError = false,
  errorComponent = <></>,
  onSubmit,
  loading = false,
  children,
  bottomComponent = <></>,
  title,
  buttonText,
  withSso = true,
}) => {
  return (
    <main className="h-screen flex flex-col">
      <nav className="w-11/12 sm:w-10/12 mx-auto py-4 flex items-center justify-between">
        <Link to={UI_PATHS.HOME}>
          <Logo size={40} withName />
        </Link>
        <section className="flex items-center gap-3 sm:gap-6">
          <AuthButtons />
        </section>
      </nav>
      <div className="flex-grow w-11/12 sm:w-10/12 mx-auto flex flex-col items-center justify-center gap-8">
        <h2 className="text-2xl sm:text-5xl font-bold text-center">{title}</h2>
        {displayError && errorComponent}
        {withSso && <SocialAuth />}
        <form className="w-full sm:w-1/4 flex flex-col gap-4" onSubmit={onSubmit}>
          {children}
          <Button type="submit" text={buttonText} loading={loading} />
        </form>
        {bottomComponent}
      </div>
    </main>
  );
};

export default AuthFormLayout;
