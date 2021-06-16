import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Delete } from "../hooks/useHttp";
import { editState } from "../state/editState";
import { progressPercentage } from "../state/progressState";
import { todoState } from "../state/todoState";
import "../styles/Dropdown.scss";
import { Data } from "../types";

interface Props {
  id: string;
}

const Dropdown: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editMode, setEditMode] = useRecoilState(editState);
  const [todos, setTodos] = useRecoilState(todoState);
  const setProgress = useSetRecoilState(progressPercentage);

  const handleClickEdit = () => {
    setIsOpen(false);
    setEditMode({ ...editMode, [id]: true });
  };

  const handleClickDelete = (): void => {
    const todoLists: Data[] = [...todos];
    const removed = todoLists.filter((o) => o.id !== id);
    setTodos(removed);
    setIsOpen(false);

    setProgress({
      visible: true,
      value: 0,
    });

    Delete(id, {
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
    });
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="action-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-icons">more_horiz</span>
      </button>
      {isOpen && (
        <div className="dropdown-list">
          <button
            type="button"
            className="dropdown-list-edit"
            onClick={handleClickEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="dropdown-list-del"
            onClick={handleClickDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
