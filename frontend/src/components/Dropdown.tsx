import React from "react";
import { useRecoilState } from "recoil";
import { editState } from "../state/editState";
import "../styles/Dropdown.scss";

interface Props {
  id: string;
}

const Dropdown: React.FC<Props> = ({ id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editMode, setEditMode] = useRecoilState(editState);

  const handleClickEdit = () => {
    setIsOpen(false);
    setEditMode({ ...editMode, [id]: true });
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
          <button className="dropdown-list-del">Delete</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
