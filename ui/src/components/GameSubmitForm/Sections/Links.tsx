import PlusButton from "components/Button/Plus";
import GameLinkInput from "components/Inputs/GameLink";
import { API_PATHS, UNEXPECTED_ERROR_MSG } from "lib/constants";
import { GameFormContext } from "lib/contexts/GameForm.context";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IGameLink } from "lib/interfaces";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const LINK_AMOUNT_LIMIT = 11;

const LinksSection = () => {
  const [loading, setLoading] = useState(false);

  const { input, setInput, errors } = useContext(GameFormContext);

  const axiosAuth = useAxiosAuth();

  const LINKS = input.links || [];

  useEffect(() => {
    if (!LINKS.length) {
      createLink();
    }
  }, []);

  const createLink = (platform?: string) => {
    if (loading || LINKS.length >= LINK_AMOUNT_LIMIT) {
      return;
    }

    setLoading(true);

    axiosAuth
      .post<IGameLink>(API_PATHS.CREATE_GAME_LINK, {
        platform,
      })
      .then(({ data }) => {
        setInput((prevInput) => ({
          ...prevInput,
          links: (prevInput.links || []).concat(data),
        }));
      })
      .catch((err) => toast.error(UNEXPECTED_ERROR_MSG + err))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (
    value: string,
    gameLinkIndex: number,
    key: keyof IGameLink
  ) => {
    setInput((prevInput) => {
      const UPDATED_LINKS = [...(prevInput.links || [])];

      UPDATED_LINKS[gameLinkIndex][key] = value as any;

      return {
        ...prevInput,
        links: UPDATED_LINKS,
      };
    });
  };

  const deleteLink = (linkIndex: number, linkId: string) => {
    setInput((prevInput) => {
      const UPDATED_LINKS = [...(prevInput.links || [])];

      UPDATED_LINKS.splice(linkIndex, 1);

      return {
        ...prevInput,
        links: UPDATED_LINKS,
      };
    });

    axiosAuth
      .delete(API_PATHS.DELETE_GAME_LINK.replace(":gameLinkId", linkId))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-8">
      <h6 className="font-bold text-2xl">Where can users find your game?</h6>
      <section className="w-3/4 flex flex-col gap-4">
        {LINKS.length ? (
          LINKS.map(({ url, platform, id }, i) => (
            <GameLinkInput
              onChange={{
                select: (selectedPlatform) =>
                  handleInputChange(selectedPlatform.value, i, "platform"),
                input: ({ target }) =>
                  handleInputChange(target.value, i, "url"),
              }}
              values={{
                select: platform ? { id: platform, value: platform } : null,
                input: url || null,
              }}
              inputId={`game-link-${i}`}
              onRemoveBtnClick={i > 0 ? () => deleteLink(i, id) : undefined}
              key={`game-link-${i}`}
            />
          ))
        ) : (
          <GameLinkInput
            onChange={{
              select: (selectedPlatform) => createLink(selectedPlatform.value),
              input: () => {},
            }}
            values={{
              select: null,
              input: null,
            }}
            inputId="game-link-0"
          />
        )}
        {LINKS.length < LINK_AMOUNT_LIMIT && (
          <div>
            <PlusButton disabled={loading} onClick={() => createLink()} />
          </div>
        )}
      </section>
      {errors.links && (
        <span className="text-red-500 text-sm capitalize-first block">
          {errors.links[0]}
        </span>
      )}
    </div>
  );
};

export default LinksSection;
