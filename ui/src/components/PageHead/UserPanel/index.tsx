import { IconBell } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { IAuthUser } from "lib/interfaces";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Dropdown from './Dropdown';

interface IProps {
  loading: boolean;
  user?: IAuthUser;
}

const UserPanel: React.FC<IProps> = ({ loading, user }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to={UI_PATHS.SUBMIT_GAME}
        className="whitespace-nowrap text-primary-brand-color"
      >
        Submit
      </Link>
      <Link to={UI_PATHS.NOTIFICATIONS}>
        <IconBell color={PRIMARY_BRAND_COLOR} />
      </Link>
      {loading ? <Skeleton circle height={40} width={40} /> : <Dropdown />}
    </div>
  );
};

export default UserPanel;

// 53 34