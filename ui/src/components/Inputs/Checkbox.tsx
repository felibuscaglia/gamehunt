import { useState } from "react";
import TextInput from "./Text";

interface IProps {
  label: string;
}

const CheckboxInput: React.FC<IProps> = ({ label }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <section className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label>{label}</label>
      </section>
      {checked && (
        <TextInput
          textSize="small"
          value=""
          onChange={() => {}}
          id=""
          placeholder={`Enter ${label} link here...`}
        />
      )}
    </div>
  );
};

export default CheckboxInput;
