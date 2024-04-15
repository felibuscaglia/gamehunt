import { IImage, IUser } from "lib/interfaces";
import { useState } from "react";
import TextInput from "./Inputs/Text";
import TextArea from "./Inputs/TextArea";
import ThumbnailUploader from "./Inputs/Media/ThumbnailUploader";
import Button from "./Button";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS, VALIDATE_EMAIL_WARN } from "lib/constants";
import toast from "react-hot-toast";
import SwitchInput from "./Inputs/Switch";
import { useAppDispatch } from "store";
import { addUser } from "store/features/userSlice";

interface IProps {
  user: IUser;
}

interface IInput {
  fullName: string;
  username: string;
  tagline?: string;
  about?: string;
  profilePicture?: IImage;
  isSubscribedToNewsletter: boolean;
}

const UserSettingsForm: React.FC<IProps> = ({ user }) => {
  const [input, setInput] = useState<IInput>({
    fullName: user.fullName,
    username: user.username,
    tagline: user.tagline,
    about: user.about,
    profilePicture: user.profilePicture,
    isSubscribedToNewsletter: user.isSubscribedToNewsletter,
  });
  const [errors, setErrors] = useState<{ [K in keyof IInput]?: string[] }>({});
  const [saving, setSaving] = useState(false);

  const authApiClient = useAxiosAuth();
  const dispatch = useAppDispatch();

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    setErrors({});
    setSaving(true);

    authApiClient
      .patch<IUser>(API_PATHS.PATCH_ME, input)
      .then(() => {
        dispatch(addUser({ ...user, ...input }));
        if (input.isSubscribedToNewsletter && !user.emailConfirmed) {
          toast(VALIDATE_EMAIL_WARN);
        }

        toast.success("User settings saved successfully", { duration: 6000 });
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          setErrors({ username: ["Already taken"] });
        } else {
          setErrors(err?.response?.data?.errors || {});
        }
      })
      .finally(() => setSaving(false));
  };

  return (
    <form
      className="my-8 w-3/4 flex flex-col gap-4"
      onSubmit={handleFormSubmit}
    >
      <div>
        <label className="text-sm text-gray-500 font-medium mb-1 block">
          Profile picture
        </label>
        <ThumbnailUploader
          thumbnail={input.profilePicture}
          onFileUpload={(profilePicture) =>
            setInput({
              ...input,
              profilePicture,
            })
          }
        />
        <span className="text-sm text-red-500 capitalize-first">
          {(errors.profilePicture || [])[0]}
        </span>
      </div>
      <TextInput
        value={input.fullName}
        id="fullName"
        onChange={handleInputChange}
        label="Name"
        placeholder="Your name"
        textSize="small"
        error={(errors.fullName || [])[0]}
      />
      <TextInput
        value={input.username}
        id="username"
        onChange={handleInputChange}
        label="Username"
        placeholder="Your username"
        textSize="small"
        error={(errors.username || [])[0]}
      />
      <TextInput
        value={input.tagline || ""}
        id="tagline"
        onChange={handleInputChange}
        label="Tagline"
        placeholder="Share a brief headline capturing your essence"
        textSize="small"
        limit={50}
        error={(errors.tagline || [])[0]}
      />
      <TextArea
        label="About You"
        limit={300}
        value={input.about || ""}
        onChange={handleInputChange}
        id="about"
        placeholder="Share with the community a bit about who you are, what you aim for, and your aspirations."
        error={(errors.about || [])[0]}
      />

      <SwitchInput
        checked={input.isSubscribedToNewsletter}
        onChange={(checked: boolean) =>
          setInput((prevInput) => ({
            ...prevInput,
            isSubscribedToNewsletter: checked,
          }))
        }
        label="Subscribe to Daily Newsletter (Monday to Friday)"
      />
      <Button text="Save" type="submit" loading={saving} />
    </form>
  );
};

export default UserSettingsForm;
