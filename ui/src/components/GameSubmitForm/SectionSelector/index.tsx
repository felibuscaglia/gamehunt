import {
  IconDeviceGamepad,
  IconPhoto,
  IconPlus,
  IconUsersGroup,
} from "@tabler/icons-react";
import Section from "./Section";

const SECTIONS = [
  { name: "Main info", icon: IconDeviceGamepad },
  { name: "Media", icon: IconPhoto },
  { name: "Creators", icon: IconUsersGroup },
  { name: "Extras", icon: IconPlus },
];

interface IProps {
  selectedSection: number;
  setSelectedSection: React.Dispatch<React.SetStateAction<number>>;
}

const GameSubmitFormSectionSelector: React.FC<IProps> = ({
  selectedSection,
  setSelectedSection,
}) => {
  return (
    <div className="flex flex-col w-3/12 gap-1">
      {SECTIONS.map((section, i) => (
        <Section
          {...section}
          selected={selectedSection === i}
          onClick={() => setSelectedSection(i)}
        />
      ))}
    </div>
  );
};

export default GameSubmitFormSectionSelector;
