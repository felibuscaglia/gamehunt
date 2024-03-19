import { IconBrandFacebook, IconBrandX, IconShare2 } from "@tabler/icons-react";
import Thumbnail from "components/Thumbnail";
import Dialog from "layouts/Dialog";
import { useState } from "react";

interface IProps {
  gameThumbnailUrl: string;
  gameName: string;
  gameTagline?: string;
}

const SOCIAL_BTN_CLASSNAMES =
  "h-16 w-16 rounded-full flex items-center justify-center";

const ShareGameDialog: React.FC<IProps> = ({
  gameThumbnailUrl,
  gameName,
  gameTagline,
}) => {
  const [display, setDisplay] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setCopied(true));

    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <>
      <button
        onClick={() => setDisplay(true)}
        className="flex items-center gap-1 hover:text-primary-brand-color"
      >
        <IconShare2 size={15} />
        <span>Share</span>
      </button>
      <Dialog display={display} setDisplay={setDisplay}>
        <Thumbnail url={gameThumbnailUrl} />
        <h2 className="font-bold text-2xl mt-4">{gameName}</h2>
        {gameTagline && (
          <span className="font-light text-gray-400 text-lg italic">
            {gameTagline}
          </span>
        )}
        <div className="my-4 flex items-center gap-4">
          <button
            className={SOCIAL_BTN_CLASSNAMES + " bg-black/15 hover:bg-black/10"}
          >
            <IconBrandX />
          </button>
          <button
            className={SOCIAL_BTN_CLASSNAMES + " bg-blue-200 hover:bg-blue-100"}
          >
            <IconBrandFacebook />
          </button>
        </div>
        <div className="text-sm p-2 rounded border border-gray-200 bg-slate-200">
          <span className="text-gray-600">{window.location.href}</span>
          <button
            onClick={handleCopyLink}
            className="ml-1 font-semibold p-2 rounded bg-slate-300 hover:bg-slate-400"
          >
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default ShareGameDialog;
