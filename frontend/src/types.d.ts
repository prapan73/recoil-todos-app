import { type } from "os";

export type Status = "init" | "loading" | "loaded" | "error";

export type FilterKey = "all" | "done" | "undone";

export interface FilterProps {
  label: string;
}
export interface Data {
  id: string;
  title: string;
  completed: boolean;
}
export interface TodoResponse {
  status: Status;
  data?: Data[];
}
