import { IconUser } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR } from "lib/constants";

const UserPanelDropdown = () => {
    return <div className="p-2 rounded-full bg-primary-brand-color-light"><IconUser color={PRIMARY_BRAND_COLOR} /></div>
}

export default UserPanelDropdown;