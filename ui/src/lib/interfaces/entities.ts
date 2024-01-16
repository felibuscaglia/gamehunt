import { USER_ROLES } from "lib/enums";

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
}

export interface ICategory {
  name: string;
}
