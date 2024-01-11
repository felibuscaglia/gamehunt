import { IGame } from "lib/interfaces";
import SectionsSelector from "./SectionSelector";
import Button from "components/Button";
import { useState } from "react";
import MainInfoSection from "./Sections/MainInfo";
import LinksSection from "./Sections/Links";
import MediaSection from "./Sections/Media";
import CreatorsSection from "./Sections/Creators";
import { GameFormContext } from "lib/contexts/GameForm.context";

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
    case 3:
      component = <CreatorsSection />;
      break;
  }

  return component;
};

interface IProps {
  game: IGame;
}

const GameSubmitForm: React.FC<IProps> = ({ game }) => {
  const [selectedSection, setSelectedSection] = useState(0);
  const [input, setInput] = useState({ ...game });

  return (
    <section className="w-10/12 mx-auto">
      <div className="border-b sticky top-20 bg-white border-b-gray-200 py-5 flex items-center justify-between">
        <h2 className="text-center text-3xl font-bold">{input.name}</h2>
        <div className="w-1/12">
          <Button text="Publish" />
        </div>
      </div>
      <div className="flex gap-8 mt-8 justify-space-between flex-1">
        <SectionsSelector
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <GameFormContext.Provider value={{ input, setInput }}>
          <form className="w-full">{sectionComponent(selectedSection)}</form>
        </GameFormContext.Provider>
      </div>
    </section>
  );
};

export default GameSubmitForm;
