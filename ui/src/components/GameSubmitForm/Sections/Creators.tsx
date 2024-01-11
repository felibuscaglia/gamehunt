import TextInput from "components/Inputs/Text";
import { APP_NAME } from "lib/constants";

const CreatorsSection = () => {
  return (
    <div>
      <section>
        <h6 className="font-bold text-2xl">Who else worked on this game?</h6>
        <p className="mt-4 text-gray-700">
          Users will be notified and prompted to confirm their participation in
          this project.
        </p>
      </section>
      <div className="w-1/2 my-8">
        <TextInput label="Creators" placeholder={`Search for a ${APP_NAME} username...`} textSize="small" value="" id="" onChange={() => {}} />
      </div>
    </div>
  );
};

export default CreatorsSection;
