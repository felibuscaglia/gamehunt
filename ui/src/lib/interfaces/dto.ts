import { IGame } from "./entities";

export interface ISaveGameDto extends Omit<IGame, "id" | "creator"> {}
