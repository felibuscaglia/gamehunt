import {
  GamePricing,
  GameStatus,
  NotificationType,
  Platform,
  USER_ROLES,
} from "lib/enums";

export interface IAuthUser {
  email: string;
  fullName: string;
  role: USER_ROLES;
  username: string;
  isSubscribedToNewsletter: boolean;
  emailConfirmed: boolean;
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  games: IGame[];
  role: USER_ROLES;
  comments: IComment[];
  username: string;
  tagline?: string;
  profilePicture: IImage;
  about?: string;
  isSubscribedToNewsletter: boolean;
  emailConfirmed: boolean;
}

export interface IGameMode {
  id: number;
  name: string;
}

export interface IGame {
  id: string;
  name: string;
  creator: IUser;
  creatorInvolvedInDevelopment: boolean;
  tagline?: string;
  description?: string;
  subgenres?: ISubgenre[];
  pricing?: GamePricing;
  links?: IGameLink[];
  thumbnail?: IImage;
  gallery: IImage[];
  platforms: IPlatform[];
  modes: IGameMode[];
  storyline?: string;
  urlSlug?: string;
  upvotes?: IUser[];
  comments?: IComment[];
  status: GameStatus;
  createdAt: string;
  postedAt?: Date;
}

export interface IGenre {
  id: number;
  name: string;
  urlSlug: string;
  subgenres?: ISubgenre[];
}

export interface ISubgenre {
  id: number;
  name: string;
  urlSlug: string;
  genre: IGenre;
  description: string;
  games?: IGame[];
}

export interface IGameLink {
  id: string;
  url?: string;
  platform?: Platform;
  game?: IGame;
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

export interface IComment {
  id: number;
  content: string;
  author: IUser;
  replies: IComment[];
  parent?: IComment;
  game: IGame[];
  createdAt: string;
}

export interface INotification {
  id: string;
  sender: IUser;
  recipient: IUser;
  type: NotificationType;
  game?: IGame;
  createdAt: Date;
}
