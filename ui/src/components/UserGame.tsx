import { IGame } from "lib/interfaces";
import { IconDeviceGamepad3, IconTrash } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { GameStatus } from "lib/enums";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";

dayjs.extend(advancedFormat);

interface IProps {
  game: IGame;
}

const BTN_CLASSNAMES =
  "flex items-center justify-center font-semibold text-sm h-10 px-4 rounded border border-gray-300 hover:border-primary-brand-color";

const UserGame: React.FC<IProps> = ({ game }) => {
  const IS_DRAFT = game.status === GameStatus.DRAFT;
  return (
    <div className="flex items-center justify-between py-8 border-b border-b-gray-200">
      <section className="flex items-center gap-2">
        {game.thumbnail?.url ? (
          <div
            className="h-16 w-16 rounded bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${game.thumbnail.url}')` }}
          />
        ) : (
          <div className="h-16 w-16 rounded bg-primary-brand-color-extra-light p-4">
            <IconDeviceGamepad3
              height={"100%"}
              width={"100%"}
              color={PRIMARY_BRAND_COLOR}
            />
          </div>
        )}
        <div>
          <p className="font-semibold">{game.name}</p>
          <p className="text-sm text-gray-400">
            {IS_DRAFT ? "Drafted" : "Posted"} on{" "}
            {dayjs(IS_DRAFT ? game.createdAt : game.postedAt).format(
              "MMMM Do, YYYY"
            )}
          </p>
        </div>
      </section>
      <section className="flex items-center gap-2">
        <Link
          to={
            IS_DRAFT
              ? UI_PATHS.EDIT_USER_GAME.replace(":gameId", game.id)
              : UI_PATHS.GAME_DETAIL.replace(":gameUrlSlug", game.urlSlug || "")
          }
          className={BTN_CLASSNAMES}
        >
          {IS_DRAFT ? "Continue editing" : "View"}
        </Link>
        {IS_DRAFT && (
          <button className={BTN_CLASSNAMES}>
            <IconTrash className="text-gray-400" />
          </button>
        )}
      </section>
    </div>
  );
};

export default UserGame;
