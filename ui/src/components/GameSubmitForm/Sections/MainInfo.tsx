import TextInput from "components/Inputs/Text";
import TextArea from "components/Inputs/TextArea";
import Button from "components/Button";
import RadioInput from "components/Inputs/Radio";
import {
  IGenre,
  IPlatform,
  IRadioButtonOption,
  ISubgenre,
} from "lib/interfaces";
import { useContext, useState } from "react";
import { GameFormContext } from "lib/contexts/GameForm.context";
import SelectInput from "components/Inputs/Select";
import { useAppSelector } from "store";
import { IconX } from "@tabler/icons-react";
import {
  GameCreationSidebarSectionIndexes,
  GamePricing,
  TEXT_SIZE,
} from "lib/enums";
import { SUBGENRES_LIMIT } from "lib/constants/game-creation";
import PlusButton from "components/Button/Plus";
import AutoCompleteInput from "components/Inputs/AutoComplete";
import { API_PATHS } from "lib/constants";

const SECTION_CLASSNAMES = "w-1/2 flex flex-col gap-8";

const RADIO_BUTTON_OPTIONS: IRadioButtonOption[] = [
  { id: "free", value: GamePricing.FREE, text: "Free" },
  { id: "paid", value: GamePricing.PAID, text: "Paid" },
];

const MainInfoSection = () => {
  const [selectedGenre, setSelectedGenre] = useState<IGenre | null>(null);
  const [selectedSubgenre, setSelectedSubgenre] = useState<ISubgenre | null>(
    null
  );

  const { input, setInput, setSelectedSection } = useContext(GameFormContext);
  const genres = useAppSelector((state) => state.genres.genres);

  const INPUT_SUBGENRES = input.subgenres || [];
  const HAS_REACHED_SUBGENRES_LIMIT = INPUT_SUBGENRES.length >= SUBGENRES_LIMIT;
  const SUBGENRE_ALREADY_SELECTED = !!INPUT_SUBGENRES.find(
    (subgenre) => subgenre.name === selectedSubgenre?.name
  );

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  const handleAddBtnClick = () => {
    if (
      selectedSubgenre &&
      !HAS_REACHED_SUBGENRES_LIMIT &&
      !SUBGENRE_ALREADY_SELECTED
    ) {
      setInput((prevInput) => ({
        ...prevInput,
        subgenres: [...(prevInput.subgenres || []), selectedSubgenre],
      }));
    }
  };

  const removeSubgenre = (subgenreIndex: number) => {
    setInput((prevInput) => {
      const newSubgenres = [...(prevInput.subgenres || [])];
      newSubgenres.splice(subgenreIndex, 1);
      return {
        ...prevInput,
        subgenres: newSubgenres,
      };
    });
  };

  const handlePlatformSelect = (selectedPlatform: IPlatform) => {
    if (
      !input.platforms.find((platform) => platform.id === selectedPlatform.id)
    ) {
      setInput((prevInput) => ({
        ...prevInput,
        platforms: prevInput.platforms.concat(selectedPlatform),
      }));
    }
  };

  const removePlatform = (platformIndex: number) => {
    setInput((prevInput) => {
      const newPlatforms = [...(prevInput.platforms || [])];
      newPlatforms.splice(platformIndex, 1);
      return {
        ...prevInput,
        platforms: newPlatforms,
      };
    });
  };

  return (
    <div>
      <h6 className="font-bold text-2xl mb-8">Game information</h6>
      <section className={SECTION_CLASSNAMES}>
        <TextInput
          label="Name of the game"
          placeholder="Just the name of the game"
          value={input.name}
          onChange={handleInputChange}
          id="name"
          textSize="small"
          limit={40}
        />
        <TextInput
          label="Tagline"
          placeholder="Sum up your game in a tagline"
          value={input.tagline || ""}
          onChange={handleInputChange}
          id="tagline"
          textSize="small"
          limit={60}
        />
        <TextArea
          label="Description"
          limit={260}
          value={input.description || ""}
          placeholder="Write a quick overview of your game"
          onChange={handleInputChange}
          id="description"
        />
      </section>
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl">Genres</h6>
      <p className="mt-4 mb-8 text-gray-700">
        Select up to {SUBGENRES_LIMIT} genres that clearly define its purpose or
        the specific gaming experience it offers.
      </p>
      <section className="flex items-center gap-4 justify-between">
        <SelectInput<IGenre>
          selected={selectedGenre}
          setSelected={(g) => setSelectedGenre(g)}
          displayKey="name"
          options={genres}
          textSize={TEXT_SIZE.SMALL}
          disabled={HAS_REACHED_SUBGENRES_LIMIT}
        />
        <SelectInput<ISubgenre>
          selected={selectedSubgenre}
          setSelected={(sg) => setSelectedSubgenre(sg)}
          displayKey="name"
          options={selectedGenre?.subgenres || []}
          textSize={TEXT_SIZE.SMALL}
          disabled={selectedGenre === null || HAS_REACHED_SUBGENRES_LIMIT}
        />
        <PlusButton
          onClick={handleAddBtnClick}
          disabled={
            selectedSubgenre === null ||
            HAS_REACHED_SUBGENRES_LIMIT ||
            SUBGENRE_ALREADY_SELECTED
          }
        />
      </section>
      <section
        className={`${
          INPUT_SUBGENRES.length ? "mt-4" : "mt-0"
        } flex items-center gap-4`}
      >
        {INPUT_SUBGENRES.map(({ name }, i) => (
          <div
            className="flex items-center gap-1 px-2 py-1 bg-primary-brand-color rounded-lg text-white"
            key={`selected-subgenre-${name}`}
          >
            <button type="button" onClick={() => removeSubgenre(i)}>
              <IconX size={15} />
            </button>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </section>
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl">Platforms</h6>
      <p className="mt-4 mb-8 text-gray-700">
        Select the platform(s) where your game can be played.
      </p>
      <section className="w-1/2">
        <AutoCompleteInput<IPlatform>
          searchApiPath={API_PATHS.GET_PLATFORMS}
          limit={6}
          displayKey="name"
          onSelect={handlePlatformSelect}
          placeholder="Search for the platform name..."
          textSize={TEXT_SIZE.SMALL}
        />
      </section>
      <section
        className={`${
          input.platforms.length ? "mt-4" : "mt-0"
        } flex items-center gap-4`}
      >
        {input.platforms.map(({ name, id }, i) => (
          <div
            className="flex items-center gap-1 px-2 py-1 bg-primary-brand-color rounded-lg text-white"
            key={`selected-platform-${id}`}
          >
            <button type="button" onClick={() => removePlatform(i)}>
              <IconX size={15} />
            </button>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </section>
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl mb-8">Pricing</h6>
      <RadioInput
        options={RADIO_BUTTON_OPTIONS}
        selectedValue={input.pricing}
        onChange={({ target }) =>
          setInput({ ...input, pricing: target.value as GamePricing })
        }
      />
      <div className="w-2/12 my-8">
        <Button
          onClick={() => {
            setSelectedSection(GameCreationSidebarSectionIndexes.LINKS);
            window.scrollTo(0, 0);
          }}
          text="Next step: Links"
          textSize="small"
        />
      </div>
    </div>
  );
};

export default MainInfoSection;
