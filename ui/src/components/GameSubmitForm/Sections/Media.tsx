import Button from "components/Button";
import GalleryInput from "components/Inputs/Media/Gallery";
import ThumbnailUploader from "components/Inputs/Media/ThumbnailUploader";
import TextInput from "components/Inputs/Text";

const TITLE_CLASSNAMES = "font-bold text-2xl";

const MediaSection = () => {
  return (
    <div className="flex flex-col gap-8">
      <h6 className={TITLE_CLASSNAMES}>Thumbnail</h6>
      <div className="w-3/4">
        <ThumbnailUploader />
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
      <div className="w-1/2">
        <TextInput
          label="Link"
          value=""
          id=""
          onChange={() => {}}
          textSize="small"
          placeholder="Enter your Loom/YouTube video URL here..."
        />
      </div>
      <div className="w-1/5 mb-8">
        <Button text="Next step: Creators" textSize="small" />
      </div>
    </div>
  );
};

export default MediaSection;
