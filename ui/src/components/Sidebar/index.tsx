import Section from "./Section";
import { ISidebarSection } from "lib/interfaces";

interface IProps {
  selectedSection: number;
  onSectionClick: (index: number) => void;
  sections: ISidebarSection[];
}

const Sidebar: React.FC<IProps> = ({ selectedSection, onSectionClick, sections }) => {
  return (
    <div className="w-3/12 hidden sm:block">
      <div className="flex flex-col gap-1 sticky top-[200px]">
        {sections.map((section, i) => (
          <Section
            {...section}
            selected={selectedSection === i}
            onClick={() => onSectionClick(i)}
            key={`sidebar-section-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
