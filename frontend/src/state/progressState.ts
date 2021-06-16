import { atom } from "recoil";

export const progressPercentage = atom({
  key: "progressPercentage",
  default: {
    value: 0,
    visible: false,
  },
});
