import { GamePricing, USER_ROLES } from "lib/enums";

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
