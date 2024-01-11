import { IconPhotoScan } from "@tabler/icons-react";
import Button from "components/Button";

const ThumbnailUploader = () => {
  return (
    <div className="flex items-center gap-8 w-full">
      <div className="flex items-center justify-center border-2 border-dashed rounded h-20 w-20 border-gray-300 p-5">
        <IconPhotoScan className="text-gray-400" size={40} />
      </div>
      <div className="w-full h-20 justify-between flex flex-col">
        <div className="w-1/4">
          <Button text="Upload an image" textSize="small" />
        </div>
        <span className="text-xs text-gray-500">
          or <button className="text-primary-brand-color">Paste a URL</button>
        </span>
        <p className="text-xs text-gray-500">Recommended size: 240x240 | JPG, PNG, GIF. Max size: 2MB</p>
      </div>
    </div>
  );
};

export default ThumbnailUploader;
