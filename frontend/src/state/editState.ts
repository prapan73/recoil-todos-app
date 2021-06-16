/* eslint-disable no-useless-computed-key */
import { atom } from "recoil";

type State = {
  [key in string | number]: boolean;
};

export const editState = atom<State>({
  key: "editState",
  default: {} as State,
});
