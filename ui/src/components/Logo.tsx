import { IconDeviceGamepad } from "@tabler/icons-react";
import { APP_NAME, PRIMARY_BRAND_COLOR } from "lib/constants";

interface IProps {
  size?: number;
  withName?: boolean;
}

const Logo: React.FC<IProps> = ({ size = 30, withName = false }) => {
  return (
    <div className="flex items-center gap-3">
      <IconDeviceGamepad
        color={PRIMARY_BRAND_COLOR}
        size={size}
        strokeWidth={1.5}
      />
      {withName && <h1 className="font-bold text-xl">{APP_NAME}</h1>}
    </div>
  );
};

export default Logo;
