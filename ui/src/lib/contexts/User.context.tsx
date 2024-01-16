import { IAuthUser, IGame } from "lib/interfaces";
import { createContext } from "react";

interface IUserContext {
  user: IAuthUser | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<IAuthUser | null | undefined>>;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});
