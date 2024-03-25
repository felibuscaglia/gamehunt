import { APP_NAME } from "lib/constants";
import Button from "./Button";

const NewsletterSignup = () => {
  return (
    <div className="mb-8 w-full bg-primary-brand-color-extra-light rounded px-3 py-5 flex items-center justify-center gap-2 flex-col">
      <p className="font-semibold">
      ✉️ Receive top-notch {APP_NAME} games delivered straight to your
        email inbox.
      </p>
      <div className="w-2/12">
        <Button text="Sign me up" textSize="small" />
      </div>
    </div>
  );
};

export default NewsletterSignup;
