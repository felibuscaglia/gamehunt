import { IconBell } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { IAuthUser } from "lib/interfaces";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { USER_ROLES } from "lib/enums";

interface IProps {
  loading: boolean;
  user?: IAuthUser | null;
}

const UserPanel: React.FC<IProps> = ({ loading, user }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to={UI_PATHS.SUBMIT_GAME}
        className="whitespace-nowrap text-primary-brand-color bg-primary-brand-color-extra-light py-2 px-4 rounded"
      >
        Submit
      </Link>
      <Link to={UI_PATHS.NOTIFICATIONS} aria-label="Notifications">
        <IconBell color={PRIMARY_BRAND_COLOR} />
      </Link>
      {loading ? (
        <Skeleton circle height={40} width={40} />
      ) : (
        <Dropdown
          username={user?.username}
          isAdmin={user?.role === USER_ROLES.ADMIN}
        />
      )}
    </div>
  );
};

export default UserPanel;
