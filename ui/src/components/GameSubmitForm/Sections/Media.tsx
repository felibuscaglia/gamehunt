import Button from "components/Button";
import GalleryInput from "components/Inputs/Media/Gallery";
import ThumbnailUploader from "components/Inputs/Media/ThumbnailUploader";
import TextInput from "components/Inputs/Text";
import { GameFormContext } from "lib/contexts/GameForm.context";
import { GameCreationSidebarSectionIndexes } from "lib/enums";
import { useContext } from "react";

const TITLE_CLASSNAMES = "font-bold text-2xl";

const MediaSection = () => {
  const { input, setInput, errors } = useContext(GameFormContext);

  return (
    <div className="flex flex-col gap-8">
      <h6 className={TITLE_CLASSNAMES}>Thumbnail</h6>
      <div className="w-3/4">
        <ThumbnailUploader />
        {errors.thumbnail && (
          <span className="text-red-500 text-sm capitalize-first">
            {errors.thumbnail[0]}
          </span>
        )}
      </div>
      <hr className="border-t border-t-gray-200" />
      <h6 className={TITLE_CLASSNAMES}>Gallery</h6>
      <div className="w-3/4">
        <GalleryInput />
      </div>
      <hr className="border-t border-t-gray-200" />
      <div>
        <h6 className={TITLE_CLASSNAMES}>Video</h6>
        <p className="mt-4 text-gray-700">
          Share a video trailer or gameplay of your game by providing a link
          from YouTube or Loom (optional).
        </p>
      </div>
      <div className="w-1/2 mb-8">
        <TextInput
          label="Link"
          value={input.videoUrl || ""}
          id="videoUrl"
          onChange={({ target }) =>
            setInput({ ...input, videoUrl: target.value })
          }
          textSize="small"
          placeholder="Enter your Loom/YouTube video URL here..."
          error={(errors.videoUrl || [])[0]}
        />
      </div>
    </div>
  );
};

export default MediaSection;
