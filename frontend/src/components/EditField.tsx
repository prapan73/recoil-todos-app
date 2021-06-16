import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editState } from "../state/editState";
import { progressPercentage } from "../state/progressState";
import { todoState } from "../state/todoState";
import { Patch } from "../hooks/useHttp";

import "../styles/EditField.scss";
import { Data } from "../types";

interface Props {
  id: string;
  value: string;
}

type Param = {
  title: string;
};

const EditField: React.FC<Props> = ({ id, value }) => {
  const [state, setState] = React.useState(value);
  const [todos, setTodos] = useRecoilState(todoState);
  const setProgress = useSetRecoilState(progressPercentage);
  const [editMode, setEditMode] = useRecoilState(editState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updateTodo: Data[] = [...todos];
    todos.forEach((element, index) => {
      if (element.id === id)
        updateTodo[index] = { ...element, title: e.target.value };
    });
    setTodos(updateTodo);
    setState(e.target.value);
  };

  const handleEdit = (): void => {
    const param: Param = { title: state };

    Patch<Param>(id, param, {
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress({
          value: percentCompleted,
          visible: true,
        });
      },
    }).then(() => {
      setProgress({
        visible: false,
        value: 0,
      });

      setEditMode({ ...editMode, [id]: false });
    });
  };

  return (
    <div className="edit-field">
      <input type="text" name={id} value={state} onChange={handleChange} />
      <button type="button" onClick={handleEdit}>
        Save
      </button>
    </div>
  );
};

export default EditField;
