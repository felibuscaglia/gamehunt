import { IconPhotoScan } from "@tabler/icons-react";
import { PRIMARY_BRAND_COLOR } from "lib/constants";
import { useRef } from "react";
import { PacmanLoader } from "react-spinners";

interface IProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

const GalleryPlaceholder: React.FC<IProps> = ({ onFileChange, uploading }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <section className="flex items-center justify-center flex-col gap-4 h-80 border-2 border-dashed rounded border-gray-300">
      {uploading ? (
        <PacmanLoader color={PRIMARY_BRAND_COLOR} />
      ) : (
        <>
          <IconPhotoScan className="text-gray-400" size={50} />
          <button
            className="text-primary-brand-color"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            Browse your files
          </button>
          <span className="text-gray-500 text-sm">
            1270x760px or higher recommended
          </span>
          <input
            type="file"
            id="file"
            ref={inputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
            multiple
          />
        </>
      )}
    </section>
  );
};

export default GalleryPlaceholder;
