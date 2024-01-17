import TextInput from "components/Inputs/Text";
import TextArea from "components/Inputs/TextArea";
import AutoCompleteInput from "components/Inputs/AutoComplete";
import Button from "components/Button";
import RadioInput from "components/Inputs/Radio";
import { IRadioButtonOption } from "lib/interfaces";
import { useContext } from "react";
import { GameFormContext } from "lib/contexts/GameForm.context";

const SECTION_CLASSNAMES = "w-1/2 flex flex-col gap-8";

const RADIO_BUTTON_OPTIONS: IRadioButtonOption[] = [
  { id: "free", value: "free", text: "Free" },
  { id: "paid", value: "paid", text: "Paid" },
  { id: "paid2", value: "paid2", text: "Paid (with a free trial or plan)" },
];

const MainInfoSection = () => {
  const { input, setInput } = useContext(GameFormContext);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  return (
    <div>
      <h6 className="font-bold text-2xl mb-8">Game information</h6>
      <section className={SECTION_CLASSNAMES}>
        <TextInput
          label="Name of the game"
          placeholder="Just the name of the game"
          value={input.name}
          onChange={handleInputChange}
          id="name"
          textSize="small"
          limit={40}
        />
        <TextInput
          label="Tagline"
          placeholder="Sum up your game in a tagline"
          value={input.tagline || ""}
          onChange={handleInputChange}
          id="tagline"
          textSize="small"
          limit={60}
        />
        <TextArea
          label="Description"
          limit={260}
          value={input.description || ""}
          placeholder="Write a quick overview of your game"
          onChange={handleInputChange}
          id="description"
        />
      </section>
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl">Genres</h6>
      <p className="mt-4 mb-8 text-gray-700">
        Select up to 3 genres that clearly define its purpose or the specific
        gaming experience it offers.
      </p>
      <section className={SECTION_CLASSNAMES}>
        <AutoCompleteInput
          textSize="small"
          placeholder="Search genres..."
        />
      </section>
      <hr className="border-t border-t-gray-200 my-8" />
      <h6 className="font-bold text-2xl mb-8">Pricing</h6>
      <RadioInput options={RADIO_BUTTON_OPTIONS} />
      <div className="w-2/12 my-8">
        <Button text="Next step: Links" textSize="small" />
      </div>
    </div>
  );
};

export default MainInfoSection;
