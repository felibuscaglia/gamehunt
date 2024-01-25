import { Platform, TEXT_SIZE } from "lib/enums";
import SelectInput from "./Select";
import TextInput from "./Text";
import { IGameLinkSelectOption } from "lib/interfaces";

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
}

const PLATFORM_OPTIONS: IGameLinkSelectOption[] = Object.entries(Platform).map(
  ([id, value]) => ({
    id,
    value,
  })
);

const GameLinkInput: React.FC<IProps> = ({ onChange, values, inputId }) => {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="w-2/5">
        <SelectInput<IGameLinkSelectOption>
          selected={values.select}
          setSelected={onChange.select}
          displayKey="value"
          options={PLATFORM_OPTIONS}
          textSize={TEXT_SIZE.SMALL}
        />
      </div>
      <div className="w-3/5">
        <TextInput
          value={values.input || ""}
          onChange={onChange.input}
          id={inputId}
          textSize="small"
          placeholder="Enter your link here..."
          disabled={!!values.select}
        />
      </div>
    </div>
  );
};

export default GameLinkInput;
