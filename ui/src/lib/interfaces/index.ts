import { Icon } from "@tabler/icons-react";

export * from "./entities";

export interface IRadioButtonOption {
  id: string;
  value: string;
  text: string;
}

export interface ISidebarSection {
  text: string;
  icon: Icon;
  path?: string;
}
