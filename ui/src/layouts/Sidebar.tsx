import Button from "components/Button";
import SavingIndicator from "components/SavingIndicator";
import Sidebar from "components/Sidebar";
import { PRIMARY_BRAND_COLOR } from "lib/constants";
import { ISidebarSection } from "lib/interfaces";
import { MoonLoader } from "react-spinners";

interface IProps {
  children: React.ReactNode;
  title: string;
  btnText?: string;
  onBtnClick?: () => void;
  selectedSectionIndex: number;
  sections: ISidebarSection[];
  onSectionClick: (index: number) => void;
  saving?: boolean;
  lastSaved?: null | Date;
  withSavingIndicator?: boolean;
  savingError?: boolean;
}

const SidebarLayout: React.FC<IProps> = ({
  title,
  children,
  btnText,
  selectedSectionIndex,
  sections,
  onSectionClick,
  onBtnClick,
  saving = false,
  lastSaved = null,
  withSavingIndicator = false,
  savingError = false
}) => {
  const DISPLAY_INDICATOR = withSavingIndicator && (saving || lastSaved);

  return (
    <section className="w-10/12 mx-auto">
      <div className="grid grid-cols-5 grid-rows-1 gap-4 border-b sticky top-20 bg-white border-b-gray-200 py-5 z-40">
        <h2 className="text-3xl font-bold col-span-3">{title}</h2>
        {DISPLAY_INDICATOR && (
          <div className="col-start-4 w-full flex items-center">
            <SavingIndicator saving={saving} lastSaved={lastSaved} error={savingError} />
          </div>
        )}
        {btnText && (
          <div className="w-full col-start-5">
            <Button text={btnText} onClick={onBtnClick} />
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
