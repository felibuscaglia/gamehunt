import { IconPlus, IconX } from "@tabler/icons-react";
import { IImage } from "lib/interfaces";

interface IProps {
  gallery: IImage[];
  onThumbnailClick: (index: number) => void;
  onRemoveBtnClick: (index: number) => void;
  onAddBtnClick: () => void;
}

const GalleryThumbnailPreview: React.FC<IProps> = ({
  gallery,
  onThumbnailClick,
  onRemoveBtnClick,
  onAddBtnClick,
}) => {
  return (
    <div className="flex items-center gap-4">
      {gallery.map(({ id, url }, index) => (
        <div className="relative" key={`thumbnail-preview-${id}`}>
          <div
            className="h-14 w-14 rounded bg-center bg-cover cursor-alias"
            onClick={() => onThumbnailClick(index)}
            style={{ backgroundImage: `url('${url}')` }}
          />
          <button
            key={`remove-button-${id}`}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full"
            onClick={() => onRemoveBtnClick(index)}
          >
            <IconX size={15} stroke={1} />
          </button>
        </div>
      ))}
      <button
        onClick={onAddBtnClick}
        type="button"
        className="h-14 w-14 flex items-center justify-center border-2 border-dashed rounded border-gray-300"
      >
        <IconPlus className="text-gray-500" />
      </button>
    </div>
  );
};

export default GalleryThumbnailPreview;
