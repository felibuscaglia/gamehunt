import { IGame } from "lib/interfaces";
import { useEffect, useState } from "react";
import MainInfoSection from "./Sections/MainInfo";
import LinksSection from "./Sections/Links";
import MediaSection from "./Sections/Media";
import { GameFormContext } from "lib/contexts/GameForm.context";
import SidebarLayout from "layouts/Sidebar";
import { IconDeviceGamepad, IconLink, IconPhoto } from "@tabler/icons-react";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants";

const sectionComponent = (selectedSection: number) => {
  let component: React.ReactNode;

  switch (selectedSection) {
    case 0:
      component = <MainInfoSection />;
      break;
    case 1:
      component = <LinksSection />;
      break;
    case 2:
      component = <MediaSection />;
      break;
  }

  return component;
};

const SIDEBAR_SECTIONS = [
  { text: "Main info", icon: IconDeviceGamepad },
  { text: "Links", icon: IconLink },
  { text: "Media", icon: IconPhoto },
];

interface IProps {
  game: IGame;
}

const GameSubmitForm: React.FC<IProps> = ({ game }) => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [K in keyof IGame]?: string[] }>({});
  const [savingError, setSavingError] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [input, setInput] = useState<IGame>({
    ...game,
    gallery: game.gallery || [],
    platforms: game.platforms || [],
    modes: game.modes || [],
    links: game.links || [],
    subgenres: game.subgenres || [],
  });

  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaving(true);
      setSavingError(false);
      setErrors({});

      const { id, creator, ...saveGameDto } = input;

      axiosAuth
        .patch(API_PATHS.SAVE_GAME.replace(":gameId", id), saveGameDto)
        .then(() => setLastSaved(new Date()))
        .catch((err) => {
          setSavingError(true);
          setErrors(err?.response?.data?.errors || {});
        })
        .finally(() => setSaving(false));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <SidebarLayout
      btnText="Publish"
      title={input.name}
      selectedSectionIndex={selectedSection}
      sections={SIDEBAR_SECTIONS}
      onSectionClick={(index: number) => setSelectedSection(index)}
      withSavingIndicator
      saving={saving}
      lastSaved={lastSaved}
      savingError={savingError}
    >
      <GameFormContext.Provider
        value={{ input, setInput, setSelectedSection, errors }}
      >
        <form className="w-full">{sectionComponent(selectedSection)}</form>
      </GameFormContext.Provider>
    </SidebarLayout>
  );
};

export default GameSubmitForm;
