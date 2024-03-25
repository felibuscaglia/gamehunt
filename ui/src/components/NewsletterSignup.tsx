import { API_PATHS, APP_NAME } from "lib/constants";
import Button from "./Button";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IAuthUser } from "lib/interfaces";
import { useAppDispatch } from "store";
import { addUser } from "store/features/userSlice";

interface IProps {
  user: IAuthUser;
}

const NewsletterSignup: React.FC<IProps> = ({ user }) => {
  const authApiClient = useAxiosAuth();
  const dispatch = useAppDispatch();

  const subscribeToNewsletter = () => {
    dispatch(addUser({ ...user, isSubscribedToNewsletter: true }));
    authApiClient
      .patch(API_PATHS.PATCH_ME, { isSubscribedToNewsletter: true })
      .catch(() => {});
  };
  return (
    <div className="mb-8 w-full bg-primary-brand-color-extra-light rounded px-3 py-5 flex items-center justify-center gap-2 flex-col">
      <p className="font-semibold">
        ✉️ Receive top-notch {APP_NAME} games delivered straight to your email
        inbox.
      </p>
      <div className="w-2/12">
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
