import { Switch } from "@headlessui/react";

interface IProps {
  checked: boolean;
  onChange: (c: boolean) => void;
  label: string;
}

const SwitchInput: React.FC<IProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500 font-medium">{label}</label>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? "bg-primary-brand-color" : "bg-primary-brand-color-light"
        }
    relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span
          aria-hidden="true"
          className={`${checked ? "translate-x-5" : "translate-x-0"}
      pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default SwitchInput;
