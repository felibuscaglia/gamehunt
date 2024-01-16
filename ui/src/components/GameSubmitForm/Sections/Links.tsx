import CheckboxInput from "components/Inputs/Checkbox";

const LINK_OPTIONS = [
  "Steam",
  "Itch.io",
  "Game Jolt",
  "Gog",
  "Humble Bundle",
  "Kongregate",
  "Games Gate",
  "Game House",
  "Google Play",
  "Apple Store",
  "Amazon Appstore",
  "Other",
];

const LinksSection = () => {
  return (
    <div className="flex flex-col gap-8">
        <h6 className="font-bold text-2xl">Where can users find your game?</h6>
      <section className="w-1/2 flex flex-col gap-4">
        {LINK_OPTIONS.map((linkOption) => (
          <CheckboxInput key={`checkbox-input-option-${linkOption}`} label={linkOption} />
        ))}
      </section>
      <hr className="border-t border-t-gray-200 my-8" />
      <section className="w-1/2 flex flex-col gap-8">
      <h6 className="font-bold text-2xl">Main distribution platform</h6>
      </section>
    </div>
  );
};

export default LinksSection;
