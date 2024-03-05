import { API_PATHS } from "lib/constants";
import { GameFormContext } from "lib/contexts/GameForm.context";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IImage } from "lib/interfaces";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import ThumbnailPreview from "./ThumbnailPreview";
import Placeholder from "./Placeholder";

const GalleryInput = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const axiosAuth = useAxiosAuth();

  const { input, setInput } = useContext(GameFormContext);

  const uploadFiles = (files: FileList) => {
    setUploading(true);

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    axiosAuth
      .post<IImage[]>(API_PATHS.BULK_UPLOAD_IMAGES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setInput({
          ...input,
          gallery: data,
        });
        setUploading(false);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message ||
            "Something unexpected happened when trying to upload the files."
        );
        setUploading(false);
      });
  };

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      uploadFiles(target.files);
    }
  };

  const removeImage = (index: number) => {
    setInput((prevInput) => {
      return {
        ...input,
        gallery: input.gallery.splice(index, 1),
      };
    });
  };

  const SELECTED_IMAGE = input.gallery[selectedImage];

  return (
    <div className="flex flex-col gap-8">
      {input.gallery.length ? (
        <img className="rounded w-1/2 h-1/2" src={SELECTED_IMAGE.url} />
      ) : (
        <Placeholder onFileChange={handleFileChange} uploading={uploading} />
      )}
      <ThumbnailPreview
        onThumbnailClick={(index: number) => setSelectedImage(index)}
        gallery={input.gallery}
        onRemoveBtnClick={removeImage}
      />
    </div>
  );
};

export default GalleryInput;
