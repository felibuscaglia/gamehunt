import { GamePricing, Platform, USER_ROLES } from "lib/enums";

export interface IAuthUser {
  email: string;
  fullName: string;
  role: USER_ROLES;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  games: IGame[];
  role: USER_ROLES;
}

export interface IGame {
  id: string;
  name: string;
  creator: IGame;
  creatorInvolvedInDevelopment: boolean;
  tagline?: string;
  description?: string;
  subgenres?: ISubgenre[];
  pricing?: GamePricing;
  links?: IGameLink[];
  thumbnail?: IImage;
  gallery: IImage[];
  videoUrl?: string;
  platforms: IPlatform[];
}

export interface IGenre {
  id: number;
  name: string;
  subgenres?: ISubgenre[];
}

export interface ISubgenre {
  id: number;
  name: string;
  genre: IGenre;
}

export interface IGameLink {
  id: string;
  url: string;
  platform: Platform;
  game: IGame;
}

export interface IImage {
  id: string;
  url: string;
  externalId: string;
}

export interface IPlatform {
  id: number;
  name: string;
}
