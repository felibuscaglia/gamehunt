import { IGame } from "lib/interfaces";
import Sections from "./SectionSelector";
import Button from "components/Button";
import { useState } from "react";
import MainInfoSection from "./Sections.tsx/MainInfo";

interface IProps {
  game: IGame;
}

const GameSubmitForm: React.FC<IProps> = ({ game }) => {
  const [selectedSection, setSelectedSection] = useState(0);

  return (
    <section className="w-10/12 mx-auto">
      <div className="border-b border-b-gray-200 py-5 flex items-center justify-between">
        <h2 className="text-center text-3xl font-bold">{game.name}</h2>
        <div className="w-1/12">
          <Button text="Publish" />
        </div>
      </div>
      <div className="flex mt-5">
        <Sections
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <form className="w-full">
          <MainInfoSection />
        </form>
      </div>
    </section>
  );
};

export default GameSubmitForm;
