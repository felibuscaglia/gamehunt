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
  loading: boolean;
  children: React.ReactNode;
  bottomComponent: React.ReactNode;
  title: string;
  buttonText: string;
}

const AuthFormLayout: React.FC<IProps> = ({
  displayError = false,
  errorComponent = <></>,
  onSubmit,
  loading,
  children,
  bottomComponent,
  title,
  buttonText,
}) => {
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
        <h2 className="text-5xl font-bold">{title}</h2>
        {displayError && errorComponent}
        <SocialAuth />
        <form className="w-1/4 flex flex-col gap-4" onSubmit={onSubmit}>
          {children}
          <Button type="submit" text={buttonText} loading={loading} />
        </form>
        {bottomComponent}
      </div>
    </main>
  );
};

export default AuthFormLayout;
