import { IconChevronUp, IconMessage, IconShare2 } from "@tabler/icons-react";
import Thumbnail from "components/Thumbnail";
import { IGame, IPlatform, ISubgenre } from "lib/interfaces";
import Tags from "./Tags";
import Links from "./Links";

interface IProps {
  game: IGame;
}

const GameDetail: React.FC<IProps> = ({ game }) => {
  return (
    <div className="w-1/2 mx-auto">
      <section className="py-5 flex items-center gap-8">
        <Thumbnail url={game.thumbnail?.url || ""} />
        <div>
          <h1 className="text-2xl font-bold">{game.name}</h1>
          {true && (
            <span className="font-light text-gray-400 text-lg italic">
              Modernizing the 'modern' data stack with Zero-ETL
            </span>
          )}
        </div>
      </section>
      <section className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4 w-1/4">
          <div className="flex items-center gap-2">
            <div
              className="rounded-full bg-center bg-contain bg-no-repeat h-10 w-10"
              style={{
                backgroundImage:
                  "url('https://ph-avatars.imgix.net/3270302/3c99cac9-9bd4-46c1-bfdd-f7d4189bc21c.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2')",
              }}
            />
            <span className="font-semibold">Felipe Buscaglia</span>
          </div>
        </div>
        <div className="flex items-center gap-4 w-1/2">
          <button className="flex items-center gap-1 hover:text-primary-brand-color">
            <IconMessage size={15} />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-1 hover:text-primary-brand-color">
            <IconShare2 size={15} />
            <span>Share</span>
          </button>
          <button className="text-sm flex items-center gap-2 justify-center border border-primary-brand-color bg-primary-brand-color text-white w-full hover:bg-primary-brand-color-reduced rounded font-medium py-4">
            <IconChevronUp />
            <span>UPVOTE (109)</span>
          </button>
        </div>
      </section>
      <section className="flex items-start mt-8">
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
          <section className="mt-4">
            <h6 className="font-semibold mb-2 underline">Storyline</h6>
            <p>{game.storyline}</p>
          </section>
        </div>
        <Links links={game.links || []} />
      </section>
    </div>
  );
};

export default GameDetail;
