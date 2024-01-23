import { IGame } from "lib/interfaces";
import { createContext } from "react";

interface IGameFormContext {
  input: IGame;
  setInput: React.Dispatch<React.SetStateAction<IGame>>;
  setSelectedSection: React.Dispatch<React.SetStateAction<number>>;
}

export const GameFormContext = createContext<IGameFormContext>({
  input: {} as IGame,
  setInput: () => {},
  setSelectedSection: () => {},
});
