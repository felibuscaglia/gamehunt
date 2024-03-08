import { IGame } from "lib/interfaces";
import { useState } from "react";
import MainInfoSection from "./Sections/MainInfo";
import LinksSection from "./Sections/Links";
import MediaSection from "./Sections/Media";
import { GameFormContext } from "lib/contexts/GameForm.context";
import SidebarLayout from "layouts/Sidebar";
import {
  IconDeviceGamepad,
  IconLink,
  IconPhoto,
  IconUsersGroup,
} from "@tabler/icons-react";

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
  const [input, setInput] = useState<IGame>({
    ...game,
    gallery: [],
  });

  return (
    <SidebarLayout
      btnText="Publish"
      title={input.name}
      selectedSectionIndex={selectedSection}
      sections={SIDEBAR_SECTIONS}
      onSectionClick={(index: number) => setSelectedSection(index)}
    >
      <GameFormContext.Provider value={{ input, setInput, setSelectedSection }}>
        <form className="w-full">{sectionComponent(selectedSection)}</form>
      </GameFormContext.Provider>
    </SidebarLayout>
  );
};

export default GameSubmitForm;
