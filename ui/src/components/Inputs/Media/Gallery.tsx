import { IconPhotoScan } from "@tabler/icons-react";

const GalleryInput = () => {
  return (
      <div className="flex items-center justify-center flex-col gap-4 h-80 border-2 border-dashed rounded border-gray-300">
        <IconPhotoScan className="text-gray-400" size={50} />
        <section className="flex items-center gap-1">
          <button className="text-primary-brand-color">
            Browse your files
          </button>
          <span>or</span>
          <button className="text-primary-brand-color">paste a URL</button>
        </section>
        <span className="text-gray-500 text-sm">
          1270x760px or higher recommended
        </span>
      </div>
  );
};

export default GalleryInput;
