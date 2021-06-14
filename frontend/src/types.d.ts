export type Status = "init" | "loading" | "loaded" | "error";
export interface Data {
  id: string;
  title: string;
  completed: boolean;
}
export interface TodoResponse {
  status: Status;
  data?: Data[];
}
