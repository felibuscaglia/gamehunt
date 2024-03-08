import RadioInput from "components/Inputs/Radio";
import TextInput from "components/Inputs/Text";
import { APP_NAME } from "lib/constants";
import { GameFormContext } from "lib/contexts/GameForm.context";
import { IRadioButtonOption } from "lib/interfaces";
import { useContext } from "react";
import { useAppSelector } from "store";

const RADIO_BUTTON_OPTIONS: IRadioButtonOption[] = [
  { id: "yes", value: "true", text: "Yes" },
  { id: "no", value: "false", text: "No" },
];

const CreatorsSection = () => {
  const { input, setInput } = useContext(GameFormContext);

  const user = useAppSelector((state) => state.user.user);

  const isInvolvedInDevelopment = !!input.creators.find(
    (creator) => creator.user.email === user?.email
  )?.involvedInDevelopment;

  const changeUserInvolvement = (value: string) => {
    setInput((prevInput) => {
      const updatedCreators = [...prevInput.creators];
      const userIndex = prevInput.creators.findIndex(
        (creator) => creator.user.email === user?.email
      );

      updatedCreators[userIndex].involvedInDevelopment =
        value === "true" ? true : false;

      return {
        ...prevInput,
        creators: updatedCreators,
      };
    });
  };

  return (
    <div>
      <section>
        <h6 className="font-bold text-2xl mb-8">
          Have you been involved in the development of this game?
        </h6>
        <RadioInput
          options={RADIO_BUTTON_OPTIONS}
          selectedValue={String(isInvolvedInDevelopment)}
          onChange={({ target }) => changeUserInvolvement(target.value)}
        />
      </section>
      {isInvolvedInDevelopment && (
        <>
          <hr className="border-t border-t-gray-200 my-8" />
          <section>
            <h6 className="font-bold text-2xl">
              Has anyone else worked on this game?
            </h6>
            <p className="mt-4 text-gray-700">
              Users will be notified and prompted to confirm their participation
              in this project.
            </p>
          </section>
          <div className="w-1/2 my-8">
            <TextInput
              label="Creators"
              placeholder={`Search for a ${APP_NAME} username...`}
              textSize="small"
              value=""
              id=""
              onChange={() => {}}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CreatorsSection;
