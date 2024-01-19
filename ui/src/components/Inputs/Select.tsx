import { Listbox, Transition } from "@headlessui/react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { TEXT_SIZE } from "lib/enums";
import { Fragment } from "react";

interface IProps<T> {
  selected: T | null;
  setSelected: (s: T) => void;
  displayKey: keyof T;
  options: T[];
  textSize?: TEXT_SIZE;
  error?: string;
}

const SelectInput = <T,>({
  selected,
  setSelected,
  displayKey,
  options,
  textSize = TEXT_SIZE.BASE,
  error,
}: IProps<T>) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-full">
        <Listbox.Button
          className={`bg-gray-100 ${textSize} rounded px-3 py-2 flex items-center justify-between w-full`}
        >
          {selected ? (
            <span>{String(selected[displayKey])}</span>
          ) : (
            <span className="text-gray-400">Select one</span>
          )}
          <IconChevronDown size={15} />
        </Listbox.Button>
        {error && (
          <span className="mt-1 block text-sm text-red-500 capitalize-first">
            {error}
          </span>
        )}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
            {options.map((option, i) => (
              <Listbox.Option
                key={`listbox-option-${i}`}
                className={({ active }) =>
                  `relative cursor-pointer ${textSize} select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-primary-brand-color-light text-primary-brand-color"
                      : ""
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {String(option[displayKey])}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-brand-color">
                        <IconCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectInput;
