import React from "react";
import { Platform } from "lib/enums";
import { IGameLink } from "lib/interfaces";
import SteamIcon from "assets/Icons/Platforms/steam.png";
import GameJoltIcon from "assets/Icons/Platforms/game-jolt.webp";
import GOGIcon from "assets/Icons/Platforms/gog.png";
import HumbleBundleIcon from "assets/Icons/Platforms/humble-bundle.png";
import ItchIoIcon from "assets/Icons/Platforms/itch.io.png";
import AmazonAppStoreIcon from "assets/Icons/Platforms/amazonappstore.webp";
import AppleStoreIcon from "assets/Icons/Platforms/applestore.png";
import GamersGateIcon from "assets/Icons/Platforms/gamersgate.png";
import GooglePlayIcon from "assets/Icons/Platforms/googleplay.png";

interface IProps {
  links: IGameLink[];
}

const getPlatformIcon = (platform: Platform) => {
  switch (platform) {
    case Platform.STEAM:
      return SteamIcon;
    case Platform.GAME_JOLT:
      return GameJoltIcon;
    case Platform.GOG:
      return GOGIcon;
    case Platform.HUMBLE_BUNDLE:
      return HumbleBundleIcon;
    case Platform.ITCH_IO:
      return ItchIoIcon;
    case Platform.AMAZON_APPSTORE:
      return AmazonAppStoreIcon;
    case Platform.APPLE_STORE:
      return AppleStoreIcon;
    case Platform.GAMERS_GATE:
      return GamersGateIcon;
    case Platform.GOOGLE_PLAY:
      return GooglePlayIcon;
    default:
      return null;
  }
};

const GameDetailLinks: React.FC<IProps> = ({ links }) => {
  return (
    <div className="flex flex-col w-1/4 gap-4 ml-8">
      {links.map(({ platform, url }) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-primary-brand-color hover:underline"
          key={`game-link-${platform}`}
        >
          {platform && (
            <div
              className="h-7 w-7 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${getPlatformIcon(platform)})`,
              }}
            />
          )}
          <span className="text-sm font-semibold">{platform}</span>
        </a>
      ))}
    </div>
  );
};

export default GameDetailLinks;
