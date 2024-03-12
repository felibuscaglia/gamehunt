import Button from "components/Button";
import SavingIndicator from "components/SavingIndicator";
import Sidebar from "components/Sidebar";
import { ISidebarSection } from "lib/interfaces";

interface IProps {
  children: React.ReactNode;
  title: string;
  btnText?: string;
  onBtnClick?: () => void;
  btnLoading?: boolean;
  selectedSectionIndex: number;
  sections: ISidebarSection[];
  onSectionClick: (index: number) => void;
  savingIndicator?: {
    display?: boolean;
    saving?: boolean;
    lastSaved?: null | Date;
    error?: boolean;
  };
}

const SidebarLayout: React.FC<IProps> = ({
  title,
  children,
  btnText,
  selectedSectionIndex,
  sections,
  onSectionClick,
  onBtnClick,
  savingIndicator = {},
  btnLoading = false,
}) => {
  const DISPLAY_INDICATOR =
    savingIndicator.display &&
    (savingIndicator.saving || savingIndicator.lastSaved);

  return (
    <section className="w-10/12 mx-auto">
      <div className="grid grid-cols-5 grid-rows-1 gap-4 border-b sticky top-20 bg-white border-b-gray-200 py-5 z-40">
        <h2 className="text-3xl font-bold col-span-3">{title}</h2>
        {DISPLAY_INDICATOR && (
          <div className="col-start-4 w-full flex items-center">
            <SavingIndicator
              saving={savingIndicator.saving || false}
              lastSaved={savingIndicator.lastSaved || null}
              error={savingIndicator.error}
            />
          </div>
        )}
        {btnText && (
          <div className="w-full col-start-5">
            <Button text={btnText} onClick={onBtnClick} loading={btnLoading} />
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
