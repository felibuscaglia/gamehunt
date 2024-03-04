import { GamePricing, Platform, USER_ROLES } from "lib/enums";

export interface IAuthUser {
  email: string;
  fullName: string;
  role: USER_ROLES;
}

interface IUser {}

export interface IGame {
  id: string;
  name: string;
  creator: IUser;
  tagline?: string;
  description?: string;
  subgenres?: ISubgenre[];
  pricing?: GamePricing;
  links?: IGameLink[];
  thumbnail?: IFile;
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

export interface IFile {
  id: string;
  url: string;
}
