import { Icon } from "@tabler/icons-react";
import { IGenre, ISubgenre } from "./entities";

export * from "./entities";

export interface IRadioButtonOption {
  id: string;
  value: string | number;
  text: string;
}

export interface ISidebarSection {
  text: string;
  icon: Icon;
  error?: boolean;
  path?: string;
}

export interface IInfiniteScrollListElement {
  name: string;
}

export interface IAdminFormProps {
  exitEditMode: () => void;
  appendNew: (newElement: IGenre | ISubgenre) => void;
  entityName: string;
}

export interface IGameLinkSelectOption {
  id: string;
  value: string;
}
