import {Skill} from "./skill";

export interface Position {
  id: number;
  title: string;
  description: string;
  skills: Skill[];
}
