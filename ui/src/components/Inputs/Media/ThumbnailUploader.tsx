import { IconPhotoScan } from "@tabler/icons-react";
import { HttpStatusCode } from "axios";
import Button from "components/Button";
import {
  API_PATHS,
  INVALID_FILE_TYPE_ERROR_MSG,
  MAX_FILE_SIZE_EXCEEDED_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants";
import { GameFormContext } from "lib/contexts/GameForm.context";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IFile } from "lib/interfaces";
import { useContext, useRef, useState } from "react";

const MAX_FILE_SIZE = 2097152;

const ThumbnailUploader = () => {
  const { setInput, input } = useContext(GameFormContext);

  const [file, setFile] = useState<null | IFile>(input.thumbnail || null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const axiosAuth = useAxiosAuth();

  const inputRef = useRef<HTMLInputElement | null>(null);


  const uploadFile = (file: File) => {
    setUploadingFile(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    axiosAuth
      .post<IFile>(API_PATHS.UPLOAD_FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setFile(data);
        setInput({
          ...input,
          thumbnail: data,
        });
        setUploadingFile(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || UNEXPECTED_ERROR_MSG);
        setUploadingFile(false);
      });
  };

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files && target.files[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(MAX_FILE_SIZE_EXCEEDED_ERROR_MSG);
      return;
    }

    if (!uploadingFile) {
      uploadFile(file);
    }
  };

  return (
    <div className="flex items-center gap-8 w-full">
      {file === null ? (
        <div className="flex items-center justify-center border-2 border-dashed rounded h-20 w-20 border-gray-300 p-5">
          <IconPhotoScan className="text-gray-400" size={40} />
        </div>
      ) : (
        <div
          className="bg-center bg-contain rounded h-20 w-20"
          style={{ backgroundImage: `url('${file.url}')` }}
        />
      )}
      <div className="h-20 grow justify-center gap-2 flex flex-col">
        <div className="flex items-center gap-4">
          <div className="w-1/4">
            <Button
              text="Upload an image"
              textSize="small"
              onClick={() => inputRef.current?.click()}
              loading={uploadingFile}
            />
          </div>
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <input
            type="file"
            id="file"
            ref={inputRef}
            // accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <p className="text-xs text-gray-500">
          Recommended size: 240x240 | JPG, PNG, GIF. Max size: 2MB
        </p>
      </div>
    </div>
  );
};

export default ThumbnailUploader;
