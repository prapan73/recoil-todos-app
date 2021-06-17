import { atom, selector } from "recoil";
import { Data, FilterKey } from "../types";

export const todoState = atom({
  key: "todos",
  default: [] as Data[],
});

export const filterType = atom<FilterKey>({
  key: "filterState",
  default: "all",
});

export const filterState = selector({
  key: "filter",
  get: ({ get }) => {
    const todoList = get(todoState);
    const filter = get(filterType);
    switch (filter) {
      case "done":
        return todoList.filter((item) => item.completed);
      case "undone":
        return todoList.filter((item) => !item.completed);
      default:
        return todoList;
    }
  },
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
