import {
  IconDeviceGamepad,
  IconLink,
  IconPhoto,
  IconUsersGroup,
} from "@tabler/icons-react";
import Section from "./Section";

const SECTIONS = [
  { name: "Main info", icon: IconDeviceGamepad },
  { name: "Links", icon: IconLink },
  { name: "Media", icon: IconPhoto },
  { name: "Creators", icon: IconUsersGroup },
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
    <div className="w-3/12">
      <div className="flex flex-col gap-1 sticky top-[200px]">
        {SECTIONS.map((section, i) => (
          <Section
            {...section}
            selected={selectedSection === i}
            onClick={() => setSelectedSection(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameSubmitFormSectionSelector;
