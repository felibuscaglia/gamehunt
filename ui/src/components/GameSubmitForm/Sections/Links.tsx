import PlusButton from "components/Button/Plus";
import GameLinkInput from "components/Inputs/GameLink";
import { GameFormContext } from "lib/contexts/GameForm.context";
import { Platform } from "lib/enums";
import { IGameLink, IGameLinkSelectOption } from "lib/interfaces";
import { useContext } from "react";

const LinksSection = () => {
  const { input, setInput, errors } = useContext(GameFormContext);

  const LINKS = input.links || [];

  const handleSelectGameLinkChange = (
    selectedPlatform: IGameLinkSelectOption,
    linkIndex: number
  ) => {
    setInput((prevInput) => {
      const links = prevInput.links || [];
      let linkToUpdate = links[linkIndex];

      if (!linkToUpdate) {
        linkToUpdate = {
          url: "",
          platform: selectedPlatform.value as Platform,
        } as IGameLink;
      } else {
        linkToUpdate.platform = selectedPlatform.value as Platform;
      }

      links[linkIndex] = linkToUpdate;

      return {
        ...prevInput,
        links,
      };
    });
  };

  const handleTextInputGameLinkChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    linkIndex: number
  ) => {
    setInput((prevInput) => {
      const links = prevInput.links || [];
      let linkToUpdate = links[linkIndex];

      if (!linkToUpdate || !linkToUpdate.platform) {
        return prevInput;
      }

      linkToUpdate.url = target.value;

      links[linkIndex] = linkToUpdate;

      return {
        ...prevInput,
        links,
      };
    });
  };

  const addLink = () => {
    setInput((prevInput) => ({
      ...prevInput,
      links: LINKS.length
        ? (prevInput.links || []).concat({ url: "" } as IGameLink)
        : [{ url: "" } as IGameLink, { url: "" } as IGameLink],
    }));
  };

  const removeLink = (linkIndex: number) => {
    setInput((prevInput) => {
      const links = prevInput.links || [];

      links.splice(linkIndex, 1);

      return {
        ...prevInput,
        links,
      };
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h6 className="font-bold text-2xl">Where can users find your game?</h6>
      <section className="w-3/4 flex flex-col gap-4">
        {LINKS.length ? (
          LINKS.map(({ url, platform }, i) => (
            <GameLinkInput
              onChange={{
                select: (selectedPlatform) =>
                  handleSelectGameLinkChange(selectedPlatform, i),
                input: (e) => handleTextInputGameLinkChange(e, i),
              }}
              values={{
                select: platform ? { id: platform, value: platform } : null,
                input: url,
              }}
              inputId={`game-link-${i}`}
              onRemoveBtnClick={i > 0 ? () => removeLink(i) : undefined}
              key={`game-link-${i}`}
            />
          ))
        ) : (
          <GameLinkInput
            onChange={{
              select: (selectedPlatform) =>
                handleSelectGameLinkChange(selectedPlatform, 0),
              input: (e) => handleTextInputGameLinkChange(e, 0),
            }}
            values={{
              select: null,
              input: null,
            }}
            inputId="game-link-0"
          />
        )}
        <div>
          <PlusButton onClick={addLink} />
        </div>
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
