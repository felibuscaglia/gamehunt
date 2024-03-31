import { IGame, ISidebarSection } from "lib/interfaces";
import { useEffect, useState } from "react";
import MainInfoSection from "./Sections/MainInfo";
import LinksSection from "./Sections/Links";
import MediaSection from "./Sections/Media";
import { GameFormContext } from "lib/contexts/GameForm.context";
import SidebarLayout from "layouts/Sidebar";
import { IconDeviceGamepad, IconLink, IconPhoto } from "@tabler/icons-react";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS, UI_PATHS } from "lib/constants";
import { useNavigate } from "react-router-dom";

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

const formatSectionErrors = (
  errors: { [K in keyof IGame]?: string[] },
  sections: ISidebarSection[]
) => {
  let sectionOneHasError = false;
  let sectionTwoHasError = false;
  let sectionThreeHasError = false;

  if (!errors) {
    return sections;
  }

  for (const key in errors) {
    if (!["links", "videoUrl", "gallery", "thumbnail"].includes(key)) {
      sectionOneHasError = true;
      break;
    }
  }

  if ("links" in errors) {
    sectionTwoHasError = true;
  }

  if ("videoUrl" in errors || "gallery" in errors || "thumbnail" in errors) {
    sectionThreeHasError = true;
  }

  sections[0].error = sectionOneHasError;
  sections[1].error = sectionTwoHasError;
  sections[2].error = sectionThreeHasError;

  return sections;
};

interface IProps {
  game: IGame;
}

const GameForm: React.FC<IProps> = ({ game }) => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [sections, setSections] = useState<ISidebarSection[]>([
    { text: "Main info", icon: IconDeviceGamepad, error: false },
    { text: "Links", icon: IconLink, error: false },
    { text: "Media", icon: IconPhoto, error: false },
  ]);
  const [loading, setLoading] = useState({ saving: false, publishing: false });
  const [errors, setErrors] = useState<{ [K in keyof IGame]?: string[] }>({});
  const [savingError, setSavingError] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [input, setInput] = useState<IGame>({
    ...game,
    gallery: game.gallery || [],
    platforms: game.platforms || [],
    modes: game.modes || [],
    subgenres: game.subgenres || [],
    links: game.links || [],
  });

  const authApiClient = useAxiosAuth();
  const navigate = useNavigate();

  const resetSectionErrors = () => {
    setSections((prevSections) => {
      return prevSections.map((section) => ({ ...section, error: false }));
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading.saving) return;

      setLoading({ ...loading, saving: true });
      setSavingError(false);
      setErrors({});
      resetSectionErrors();

      const { id, creator, upvotes, ...saveGameDto } = input;

      authApiClient
        .patch(API_PATHS.SAVE_GAME.replace(":gameId", id), saveGameDto)
        .then(() => setLastSaved(new Date()))
        .catch((err) => {
          setSavingError(true);
          setErrors(err?.response?.data?.errors || {});
          setSections(
            formatSectionErrors(err?.response?.data?.errors, sections)
          );
        })
        .finally(() => setLoading({ ...loading, saving: false }));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const publishGame = () => {
    setLoading({ ...loading, publishing: true });
    resetSectionErrors();

    authApiClient
      .post(API_PATHS.PUBLISH_GAME.replace(":gameId", input.id))
      .then(() => navigate(UI_PATHS.HOME))
      .catch((err) => {
        console.error(err);
        setErrors(err?.response?.data?.errors || {});
        setLoading({ ...loading, publishing: false });
        setSections(formatSectionErrors(err?.response?.data?.errors, sections));
      });
  };

  return (
    <SidebarLayout
      btnText="Publish"
      title={input.name}
      selectedSectionIndex={selectedSection}
      sections={sections}
      onSectionClick={(index: number) => setSelectedSection(index)}
      onBtnClick={publishGame}
      btnLoading={loading.publishing}
      savingIndicator={{
        saving: loading.saving,
        lastSaved,
        error: savingError,
        display: true,
      }}
    >
      <GameFormContext.Provider
        value={{ input, setInput, setSelectedSection, errors }}
      >
        <form className="w-full">{sectionComponent(selectedSection)}</form>
      </GameFormContext.Provider>
    </SidebarLayout>
  );
};

export default GameForm;
