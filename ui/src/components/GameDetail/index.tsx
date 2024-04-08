import {
  IconChevronUp,
  IconCircleCheck,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import Thumbnail from "components/Thumbnail";
import { IGame, IGameMode, IPlatform, ISubgenre } from "lib/interfaces";
import Tags from "./Tags";
import Links from "./Links";
import ImageGallery from "react-image-gallery";
import { PRIMARY_BRAND_COLOR, UI_PATHS } from "lib/constants";
import { Tooltip } from "react-tooltip";
import CommentsSection from "./CommentsSection";
import "react-tooltip/dist/react-tooltip.css";
import { createRef } from "react";
import ShareGameDialog from "components/Dialog/ShareGameDialog";
import { Link } from "react-router-dom";

interface IProps {
  game: IGame;
  onUpvoteBtnClick: () => void;
  userUpvoted: boolean;
  upvoteCount: number;
}

const GameDetail: React.FC<IProps> = ({
  game,
  onUpvoteBtnClick,
  userUpvoted,
  upvoteCount,
}) => {
  const commentSectionRef = createRef<HTMLElement>();

  const navigateToCommentsSection = () => {
    const ELEMENT = commentSectionRef.current;

    if (ELEMENT) {
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: ELEMENT.offsetTop - 20,
      });
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <section className="py-5 flex items-center gap-8">
        <Thumbnail url={game.thumbnail?.url || ""} />
        <div>
          <h1 className="text-2xl font-bold">{game.name}</h1>
          {game.tagline && (
            <span className="font-light text-gray-400 text-lg italic">
              {game.tagline}
            </span>
          )}
        </div>
      </section>
      <section className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <Link
            to={UI_PATHS.USER_PROFILE.replace(
              ":username",
              game.creator.username
            )}
            className="flex items-center gap-2"
          >
            {game.creator?.profilePicture?.url ? (
              <div
                className="rounded-full bg-center bg-contain bg-no-repeat h-10 w-10"
                style={{
                  backgroundImage: `url('${game.creator.profilePicture.url}')`,
                }}
              />
            ) : (
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-brand-color-light">
                <IconUser color={PRIMARY_BRAND_COLOR} />
              </div>
            )}
            <span className="font-semibold whitespace-nowrap">
              {game.creator?.fullName}
            </span>
            {game.creatorInvolvedInDevelopment && (
              <IconCircleCheck
                data-tooltip-id="user-involved-in-development"
                data-tooltip-content="This user was involved in the development of this game."
                size={15}
                color={PRIMARY_BRAND_COLOR}
                className="cursor-pointer"
              />
            )}
            <Tooltip id="user-involved-in-development" />
          </Link>
        </div>
        <div className="flex items-center gap-4 w-1/2">
          <button
            className="flex items-center gap-1 hover:text-primary-brand-color"
            onClick={navigateToCommentsSection}
          >
            <IconMessage size={15} />
            <span>Comment</span>
          </button>
          <ShareGameDialog
            gameThumbnailUrl={game.thumbnail?.url || ""}
            gameName={game.name}
            gameTagline={game.tagline}
          />
          <button
            onClick={onUpvoteBtnClick}
            className={`text-sm flex items-center gap-2 justify-center border border-primary-brand-color w-[170px] ${
              userUpvoted
                ? "text-primary-brand-color"
                : "bg-primary-brand-color text-white hover:bg-primary-brand-color-reduced"
            } rounded font-medium py-4`}
          >
            <IconChevronUp />
            <span>
              UPVOTE{userUpvoted ? "D" : ""} ({upvoteCount})
            </span>
          </button>
        </div>
      </section>
      <section className="flex items-start my-8">
        <div className="flex flex-col gap-4 w-3/4">
          <p className="mb-4">{game.description}</p>
          <Tags<ISubgenre>
            elements={game.subgenres}
            title="Genres"
            displayKey="name"
            baseUrl="subgenres"
          />
          <Tags<IPlatform>
            elements={game.platforms}
            title="Platforms"
            displayKey="name"
            baseUrl="platforms"
          />
          <Tags<IGameMode>
            elements={game.modes}
            title="Modes"
            displayKey="name"
            baseUrl="modes"
          />
          {game.storyline && (
            <section className="mt-4">
              <h6 className="font-semibold mb-2 underline">Storyline</h6>
              <p>{game.storyline}</p>
            </section>
          )}
        </div>
        <Links links={game.links || []} />
      </section>
      <ImageGallery
        lazyLoad
        showPlayButton={false}
        items={(game.gallery || []).map(({ url }) => ({
          original: url,
          thumbnail: url,
        }))}
      />
      <CommentsSection
        gameId={game.id}
        comments={game.comments || []}
        ref={commentSectionRef}
      />
    </div>
  );
};

export default GameDetail;
