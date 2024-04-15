import { API_PATHS, APP_NAME, VALIDATE_EMAIL_WARN } from "lib/constants";
import Button from "./Button";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IAuthUser } from "lib/interfaces";
import { useAppDispatch } from "store";
import { addUser } from "store/features/userSlice";
import toast from "react-hot-toast";

interface IProps {
  user: IAuthUser;
}

const NewsletterSignup: React.FC<IProps> = ({ user }) => {
  const authApiClient = useAxiosAuth();
  const dispatch = useAppDispatch();

  const subscribeToNewsletter = () => {
    if (!user.emailConfirmed) {
      toast(VALIDATE_EMAIL_WARN, { duration: 4000 });
    }
    
    dispatch(addUser({ ...user, isSubscribedToNewsletter: true }));
    authApiClient
      .patch(API_PATHS.PATCH_ME, { isSubscribedToNewsletter: true })
      .catch((err) => console.error(err));
  };
  return (
    <div className="mb-8 w-full bg-primary-brand-color-extra-light rounded px-3 py-5 flex items-center justify-center gap-2 flex-col">
      <p className="font-semibold text-center sm:text-left">
        ✉️ Receive top-notch {APP_NAME} games delivered straight to your email
        inbox.
      </p>
      <div className="w-full sm:w-2/12">
        <Button
          onClick={subscribeToNewsletter}
          text="Sign me up"
          textSize="small"
        />
      </div>
    </div>
  );
};

export default NewsletterSignup;
