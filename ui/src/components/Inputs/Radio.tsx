import { IRadioButtonOption } from "lib/interfaces";

interface IProps {
  options: IRadioButtonOption[];
}

const RadioInput: React.FC<IProps> = ({ options }) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map(({ id, value, text }) => (
        <div className="flex items-center gap-2" key={`radio-input-option-${id}`}>
          <input type="radio" id={id} value={value} />
          <label className="font-semibold text-sm" htmlFor="contactChoice1">{text}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
