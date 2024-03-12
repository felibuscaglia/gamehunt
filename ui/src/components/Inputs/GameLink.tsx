import { Platform, TEXT_SIZE } from "lib/enums";
import SelectInput from "./Select";
import TextInput from "./Text";
import { IGameLinkSelectOption } from "lib/interfaces";
import { IconMinus } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR } from "lib/constants";

interface IProps {
  onChange: {
    select: (selectedOption: IGameLinkSelectOption) => void;
    input: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  values: {
    select: IGameLinkSelectOption | null;
    input: string | null;
  };
  inputId: string;
  onRemoveBtnClick?: () => void;
}

const PLATFORM_OPTIONS: IGameLinkSelectOption[] = Object.entries(Platform).map(
  ([id, value]) => ({
    id,
    value,
  })
);

const GameLinkInput: React.FC<IProps> = ({
  onChange,
  values,
  inputId,
  onRemoveBtnClick,
}) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-2/5 flex items-center gap-4">
        <SelectInput<IGameLinkSelectOption>
          selected={values.select}
          setSelected={onChange.select}
          displayKey="value"
          options={PLATFORM_OPTIONS}
          textSize={TEXT_SIZE.SMALL}
        />
      </div>
      <div className="w-3/5 flex items-center gap-4">
        <TextInput
          value={values.input || ""}
          onChange={onChange.input}
          id={inputId}
          textSize="small"
          placeholder="Enter your link here..."
          disabled={!values.select?.value}
        />
        {onRemoveBtnClick && (
          <button
            type="button"
            onClick={onRemoveBtnClick}
            className="bg-primary-brand-color text-white font-medium p-2 rounded border border-primary-brand-color hover:bg-transparent hover:text-primary-brand-color"
          >
            <IconMinus size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default GameLinkInput;
