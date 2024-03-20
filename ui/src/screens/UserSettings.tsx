import UserSettingsForm from "components/UserSettingsForm";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants";
import { IUser } from "lib/interfaces";

const UserSettingsScreen = () => {
  return (
    <AuthGuard<IUser> apiPath={API_PATHS.GET_ME_WITH_DETAILS}>
      {(user) => (
        <main className="w-10/12 mx-auto">
          <h2 className="text-3xl font-bold col-span-3">
            User Settings
            <span className="text-gray-400 font-normal ml-2">
              @{user.username}
            </span>
          </h2>
          <UserSettingsForm user={user} />
        </main>
      )}
    </AuthGuard>
  );
};

export default UserSettingsScreen;
