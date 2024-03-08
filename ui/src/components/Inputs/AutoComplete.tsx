import { Combobox, Transition } from "@headlessui/react";
import { IconSearch } from "@tabler/icons-react";
import { apiClient } from "lib/axios/apiClient";
import { TEXT_SIZE } from "lib/enums";
import { Fragment, useEffect, useState } from "react";

interface IProps<T> {
  withIcon?: boolean;
  textSize?: TEXT_SIZE;
  placeholder?: string;
  searchApiPath: string;
  limit: number;
  displayKey: keyof T;
  onSelect: (selectedOption: T) => void;
}

const AutoCompleteInput = <T,>({
  textSize = TEXT_SIZE.BASE,
  withIcon = false,
  placeholder,
  searchApiPath,
  limit,
  displayKey,
  onSelect
}: IProps<T>) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [nothingFound, setNothingFound] = useState(false);

  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    const fetchData = () => {
      apiClient
        .get<T[]>(`${searchApiPath}?q=${input}&limit=${limit}`)
        .then(({ data }) => {
          setResults(data);
          setNothingFound(!data.length);
        })
        .catch((err) => console.error(err));
    };

    const debounceFetch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchData, 500);
    };

    if (input !== "") {
      debounceFetch();
    } else {
      setResults([]);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input, searchApiPath, limit]);

  return (
    <Combobox onChange={onSelect}>
      <div className="flex w-full items-center gap-2 bg-gray-100 rounded px-3 py-2 placeholder:text-gray-400">
        {withIcon && <IconSearch size={20} className="text-gray-400" />}
        <Combobox.Input
          className={`${textSize} bg-transparent w-full`}
          placeholder={placeholder}
          displayValue={(el: T) => (el ? (el[displayKey] as string) : "")}
          onChange={({ target }) => setInput(target.value)}
        />
      </div>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setInput("")}
      >
        <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {nothingFound ? (
            <div className="w-full px-3 py-2 text-gray-400 italic">
              Nothing found.
            </div>
          ) : (
            results.map((result, i) => (
              <Combobox.Option
                key={`result-${i}`}
                className={({ active }) =>
                  `relative cursor-pointer px-3 py-2 ${
                    active ? "bg-primary-brand-color text-white" : "text-black"
                  }`
                }
                value={result}
              >
                <span className={`block truncate`}>
                  {result[displayKey] as string}
                </span>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default AutoCompleteInput;
