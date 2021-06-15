import { atom, selector } from "recoil";
import { Data } from "../types";

export const todoState = atom({
  key: "todos",
  default: [] as Data[],
});

export const markAsDone = selector({
  key: "markAsDone",
  get: ({ get }) => get(todoState),
  set: ({ set, get }, id) => {
    const todos = get(todoState);
    const todoList: Data[] = [...todos];
    todos.forEach((element, index) => {
      if (element.id === id) {
        todoList[index] = { ...element, completed: !element.completed };
      }
    });
    set(todoState, todoList);
  },
});
