import { IRadioButtonOption } from "lib/interfaces";

interface IProps {
  options: IRadioButtonOption[];
  selectedValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<IProps> = ({ options, selectedValue = '', onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map(({ id, value, text }) => (
        <div
          className="flex items-center gap-2"
          key={`radio-input-option-${id}`}
        >
          <input
            type="radio"
            id={id}
            value={value}
            checked={selectedValue === value}
            onChange={onChange}
          />
          <label className="font-semibold text-sm" htmlFor="contactChoice1">
            {text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
