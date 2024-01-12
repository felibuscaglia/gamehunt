import Button from "components/Button";
import Sidebar from "components/Sidebar";
import { ISidebarSection } from "lib/interfaces";

interface IProps {
  children: React.ReactNode;
  title: string;
  btnText?: string;
  selectedSectionIndex: number;
  sections: ISidebarSection[];
  onSectionClick: (index: number) => void;
}

const SidebarLayout: React.FC<IProps> = ({
  title,
  children,
  btnText,
  selectedSectionIndex,
  sections,
  onSectionClick,
}) => {
  return (
    <section className="w-10/12 mx-auto">
      <div className="border-b sticky top-20 bg-white border-b-gray-200 py-5 flex items-center justify-between">
        <h2 className="text-center text-3xl font-bold">{title}</h2>
        {btnText && (
          <div className="w-1/12">
            <Button text="Publish" />
          </div>
        )}
      </div>
      <div className="flex gap-8 mt-8 justify-space-between flex-1">
        <Sidebar
          selectedSection={selectedSectionIndex}
          onSectionClick={onSectionClick}
          sections={sections}
        />
        {children}
      </div>
    </section>
  );
};

export default SidebarLayout;
