import { IconCaretUp, IconMessagePlus } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { NotificationType } from "lib/enums";
import { INotification } from "lib/interfaces";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IProps {
  notification: INotification;
}

const Notification: React.FC<IProps> = ({ notification }) => {
  const IS_UPVOTE = notification.type === NotificationType.UPVOTE;

  return (
    <div
      className="p-5 bg-white rounded h-[88px] flex items-center justify-between"
      style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)" }}
    >
      <section className="flex items-center gap-4 w-10/12">
        {IS_UPVOTE ? (
          <div className="flex flex-col items-center">
            <IconCaretUp
              color={PRIMARY_BRAND_COLOR}
              fill={PRIMARY_BRAND_COLOR}
            />
            <span className="font-semibold text-primary-brand-color">+1</span>
          </div>
        ) : (
          <IconMessagePlus color={PRIMARY_BRAND_COLOR} />
        )}
        <p>
          <Link
            to={UI_PATHS.USER_PROFILE.replace(
              ":username",
              notification.sender.username
            )}
            className="font-semibold text-primary-brand-color"
          >
            @{notification.sender.username}
          </Link>
          &nbsp;{IS_UPVOTE ? "upvoted" : "left a comment on"}&nbsp;
          {notification.game && (
            <Link
              to={UI_PATHS.GAME_DETAIL.replace(
                ":gameUrlSlug",
                notification.game.urlSlug || ""
              )}
              className="font-semibold"
            >
              {notification.game?.name}
            </Link>
          )}
        </p>
      </section>
      <span className="text-sm text-gray-500 whitespace-nowrap w-2/12 text-right">
        {dayjs(notification.createdAt).fromNow()}
      </span>
    </div>
  );
};

export default Notification;
