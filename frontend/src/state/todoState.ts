import { atom } from "recoil";
import { Data } from "../types";

export const todoState = atom({
  key: "todos",
  default: [] as Data[],
});
