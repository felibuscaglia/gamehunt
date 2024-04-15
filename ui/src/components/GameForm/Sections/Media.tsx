import GalleryInput from "components/Inputs/Media/Gallery";
import ThumbnailUploader from "components/Inputs/Media/ThumbnailUploader";
import TextInput from "components/Inputs/Text";
import { GameFormContext } from "lib/contexts/GameForm.context";
import { useContext } from "react";

const TITLE_CLASSNAMES = "font-bold text-2xl";

const MediaSection = () => {
  const { input, setInput, errors } = useContext(GameFormContext);

  return (
    <div className="flex flex-col gap-8">
      <h6 className={TITLE_CLASSNAMES}>Thumbnail</h6>
      <div className="w-3/4">
        <ThumbnailUploader
          thumbnail={input.thumbnail}
          onFileUpload={(thumbnail) =>
            setInput({
              ...input,
              thumbnail,
            })
          }
        />
        {errors.thumbnail && (
          <span className="text-red-500 text-sm capitalize-first">
            {errors.thumbnail[0]}
          </span>
        )}
      </div>
      <hr className="border-t border-t-gray-200" />
      <h6 className={TITLE_CLASSNAMES}>Gallery</h6>
      <div className="w-3/4 mb-8">
        <GalleryInput />
        {errors.gallery && (
          <span className="text-red-500 text-sm block mt-2 capitalize-first">
            {errors.gallery[0]}
          </span>
        )}
      </div>
    </div>
  );
};

export default MediaSection;
