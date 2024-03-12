import TextInput from "components/Inputs/Text";
import TextArea from "components/Inputs/TextArea";
import Button from "components/Button";
import RadioInput from "components/Inputs/Radio";
import {
  IGame,
  IGameMode,
  IGenre,
  IPlatform,
  IRadioButtonOption,
  ISubgenre,
} from "lib/interfaces";
import { useContext, useEffect, useState } from "react";
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
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants";

const SECTION_CLASSNAMES = "w-1/2 flex flex-col gap-8";

const RADIO_BUTTON_OPTIONS: IRadioButtonOption[] = [
  { id: "free", value: GamePricing.FREE, text: "Free" },
  { id: "paid", value: GamePricing.PAID, text: "Paid" },
];

interface ISelected {
  genre: IGenre | null;
  subgenre: ISubgenre | null;
  platform: IPlatform | null;
  mode: IGameMode | null;
}

const MainInfoSection = () => {
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [modes, setModes] = useState<IGameMode[]>([]);
  const [loading, setLoading] = useState({ platforms: true, modes: true });
  const [selected, setSelected] = useState<ISelected>({
    genre: null,
    subgenre: null,
    platform: null,
    mode: null,
  });

  const { input, setInput, setSelectedSection, errors } =
    useContext(GameFormContext);
  const axiosAuth = useAxiosAuth();

  const genres = useAppSelector((state) => state.genres.genres);

  const INPUT_SUBGENRES = input.subgenres || [];
  const HAS_REACHED_SUBGENRES_LIMIT = INPUT_SUBGENRES.length >= SUBGENRES_LIMIT;
  const SUBGENRE_ALREADY_SELECTED = !!INPUT_SUBGENRES.find(
    (subgenre) => subgenre.name === selected.subgenre?.name
  );

  useEffect(() => {
    axiosAuth
      .get<IPlatform[]>(API_PATHS.GET_PLATFORMS)
      .then(({ data }) => setPlatforms(data))
      .catch((err) => console.error(err))
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, platforms: false }))
      );
  }, []);

  useEffect(() => {
    axiosAuth
      .get<IGameMode[]>(API_PATHS.GET_GAME_MODES)
      .then(({ data }) => setModes(data))
      .catch((err) => console.error(err))
      .finally(() =>
        setLoading((prevState) => ({ ...prevState, modes: false }))
      );
  }, []);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  const handleAddBtnClick = () => {
    const selectedSubgenre = selected.subgenre;
    if (
      selectedSubgenre &&
      !HAS_REACHED_SUBGENRES_LIMIT &&
      !SUBGENRE_ALREADY_SELECTED
    ) {
      setInput((prevInput) => ({
        ...prevInput,
        subgenres: [...(prevInput.subgenres || []), selectedSubgenre],
      }));
      setSelected({ ...selected, subgenre: null });
    }
  };

  const handleAddPlatformBtnClick = () => {
    const SELECTED_PLATFORM = selected.platform;
    const PLATFORM_ALREADY_SELECTED = !!input.platforms.find(
      (platform) => platform.id === selected.platform?.id
    );

    if (SELECTED_PLATFORM && !PLATFORM_ALREADY_SELECTED) {
      setInput((prevInput) => ({
        ...prevInput,
        platforms: [...(prevInput.platforms || []), SELECTED_PLATFORM],
      }));
      setSelected({ ...selected, platform: null });
    }
  };

  const handleAddModeBtnClick = () => {
    const SELECTED_GAME_MODE = selected.mode;
    const GAME_MODE_ALREADY_SELECTED = !!input.modes.find(
      (mode) => mode.id === selected.mode?.id
    );

    if (SELECTED_GAME_MODE && !GAME_MODE_ALREADY_SELECTED) {
      setInput((prevInput) => ({
        ...prevInput,
        modes: [...(prevInput.modes || []), SELECTED_GAME_MODE],
      }));
      setSelected({ ...selected, mode: null });
    }
  };

  const removeItemAtIndex = (index: number, arrayName: keyof IGame) => {
    setInput((prevInput) => {
      const newArray = [...((prevInput[arrayName] as any) || [])];
      newArray.splice(index, 1);
      return {
        ...prevInput,
        [arrayName]: newArray,
      };
    });
  };

  return (
    <div>
      <h6 className="font-bold text-2xl mb-8">Game information</h6>
      <section className={SECTION_CLASSNAMES}>
        <TextInput
          label="Name"
          placeholder="Just the name of the game"
          value={input.name}
          onChange={handleInputChange}
          id="name"
          textSize="small"
          limit={40}
          error={(errors.name || [])[0]}
        />
        <TextInput
          label="Tagline"
          placeholder="Sum up your game in a tagline (optional)"
          value={input.tagline || ""}
          onChange={handleInputChange}
          id="tagline"
          textSize="small"
          limit={60}
          error={(errors.tagline || [])[0]}
        />
        <TextArea
          label="Description"
          limit={260}
          value={input.description || ""}
          placeholder="Write a quick overview of your game"
          onChange={handleInputChange}
          id="description"
          error={(errors.description || [])[0]}
        />
        <TextArea
          label="Storyline"
          limit={520}
          value={input.storyline || ""}
          placeholder="Briefly outline the storyline of your game (optional)"
          onChange={handleInputChange}
          id="storyline"
          error={(errors.storyline || [])[0]}
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
          selected={selected.genre}
          setSelected={(g) =>
            setSelected({ ...selected, genre: g, subgenre: null })
          }
          displayKey="name"
          options={genres}
          textSize={TEXT_SIZE.SMALL}
          disabled={HAS_REACHED_SUBGENRES_LIMIT}
        />
        <SelectInput<ISubgenre>
          selected={selected.subgenre}
          setSelected={(sg) => setSelected({ ...selected, subgenre: sg })}
          displayKey="name"
          options={selected.genre?.subgenres || []}
          textSize={TEXT_SIZE.SMALL}
          disabled={selected.genre === null || HAS_REACHED_SUBGENRES_LIMIT}
        />
        <PlusButton
          onClick={handleAddBtnClick}
          disabled={
            selected.subgenre === null ||
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
            <button
              type="button"
              onClick={() => removeItemAtIndex(i, "subgenres")}
            >
              <IconX size={15} />
            </button>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </section>
      {errors.subgenres && (
        <span className="text-red-500 text-sm block capitalize-first mt-2">{errors.subgenres[0]}</span>
      )}
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl">Platforms</h6>
      <p className="mt-4 mb-8 text-gray-700">
        Select the platform(s) where your game can be played.
      </p>
      <section className="flex items-center gap-4 justify-between">
        <SelectInput<IPlatform>
          selected={selected.platform}
          setSelected={(p) => setSelected({ ...selected, platform: p })}
          displayKey="name"
          options={platforms}
          textSize={TEXT_SIZE.SMALL}
          disabled={loading.platforms}
        />
        <PlusButton
          onClick={handleAddPlatformBtnClick}
          disabled={loading.platforms}
        />
        <div className="w-full" />
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
            <button
              type="button"
              onClick={() => removeItemAtIndex(i, "platforms")}
            >
              <IconX size={15} />
            </button>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </section>
      {errors.platforms && (
        <span className="text-red-500 text-sm capitalize-first block mt-2">{errors.platforms[0]}</span>
      )}
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl">Modes</h6>
      <p className="mt-4 mb-8 text-gray-700">
        Choose the game mode(s) available for your game
      </p>
      <section className="flex items-center gap-4 justify-between">
        <SelectInput<IGameMode>
          selected={selected.mode}
          setSelected={(m) => setSelected({ ...selected, mode: m })}
          displayKey="name"
          options={modes}
          textSize={TEXT_SIZE.SMALL}
          disabled={loading.modes}
        />
        <PlusButton onClick={handleAddModeBtnClick} disabled={loading.modes} />
        <div className="w-full" />
      </section>
      <section
        className={`${
          input.modes.length ? "mt-4" : "mt-0"
        } flex items-center gap-4`}
      >
        {input.modes.map(({ name, id }, i) => (
          <div
            className="flex items-center gap-1 px-2 py-1 bg-primary-brand-color rounded-lg text-white"
            key={`selected-platform-${id}`}
          >
            <button type="button" onClick={() => removeItemAtIndex(i, "modes")}>
              <IconX size={15} />
            </button>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </section>
      {errors.modes && (
        <span className="text-red-500 text-sm capitalize-first block mt-2">{errors.modes[0]}</span>
      )}
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl mb-8">Pricing</h6>
      <RadioInput
        options={RADIO_BUTTON_OPTIONS}
        selectedValue={input.pricing}
        onChange={({ target }) =>
          setInput({ ...input, pricing: target.value as GamePricing })
        }
        error={(errors.pricing || [])[0]}
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
