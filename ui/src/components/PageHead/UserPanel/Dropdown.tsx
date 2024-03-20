import { Menu, Transition } from "@headlessui/react";
import { IconLogout, IconUser, IconUserPentagon } from "@tabler/icons-react";
import {
  API_PATHS,
  PRIMARY_BRAND_COLOR,
  UI_PATHS,
} from "lib/constants";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { Fragment } from "react";
import { Link } from "react-router-dom";

interface IProps {
  isAdmin: boolean;
}

const ICON_SIZE = 15;

const UserPanelDropdown: React.FC<IProps> = ({ isAdmin }) => {
  const authApiClient = useAxiosAuth();

  const logout = () => {
    authApiClient.post(API_PATHS.SIGN_OUT);
    window.location.reload();
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="p-2 rounded-full bg-primary-brand-color-light">
          <IconUser color={PRIMARY_BRAND_COLOR} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-1 py-1">
            {isAdmin && (
              <Menu.Item>
                <Link
                  to={UI_PATHS.EDIT_GENRES}
                  className="px-2 flex items-center gap-2 py-2 hover:underline hover:text-primary-brand-color"
                >
                  <IconUserPentagon size={ICON_SIZE} />
                  <span>Admin panel</span>
                </Link>
              </Menu.Item>
            )}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-2 py-2 hover:underline hover:text-primary-brand-color"
              >
                <IconLogout size={ICON_SIZE} />
                <span>Logout</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserPanelDropdown;
