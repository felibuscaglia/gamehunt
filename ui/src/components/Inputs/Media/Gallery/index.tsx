import { API_PATHS } from "lib/constants";
import { GameFormContext } from "lib/contexts/GameForm.context";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IImage } from "lib/interfaces";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import ThumbnailPreview from "./ThumbnailPreview";
import Placeholder from "./Placeholder";

const GalleryInput = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const axiosAuth = useAxiosAuth();

  const inputRef = useRef<HTMLInputElement | null>(null);

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
        setInput((prevInput) => ({
          ...prevInput,
          gallery: prevInput.gallery.concat(data),
        }));
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
    const prevGallery = [...input.gallery];

    axiosAuth
      .delete(
        API_PATHS.DELETE_IMAGE.replace(
          ":imageExternalId",
          prevGallery[selectedImage].externalId
        )
      )
      .catch((err) => console.error(err));

    setInput((prevInput) => {
      const updatedGallery = prevInput.gallery;

      updatedGallery.splice(index, 1);

      return {
        ...prevInput,
        gallery: updatedGallery,
      };
    });
  };

  const SELECTED_IMAGE = input.gallery[selectedImage];

  return (
    <div className="flex flex-col gap-8">
      {input.gallery.length ? (
        <>
          <div
            className="w-full h-80 bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url('${SELECTED_IMAGE.url}')` }}
          />
          <ThumbnailPreview
            onThumbnailClick={(index: number) => setSelectedImage(index)}
            gallery={input.gallery}
            onRemoveBtnClick={removeImage}
            onAddBtnClick={() => inputRef.current?.click()}
          />
        </>
      ) : (
        <Placeholder
          onClick={() => inputRef.current?.click()}
          uploading={uploading}
        />
      )}
      <input
        type="file"
        id="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        multiple
      />
    </div>
  );
};

export default GalleryInput;
