import React from "react";
import { useRecoilState } from "recoil";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";
import EditField from "./EditField";
import "../styles/Item.scss";
import { Data } from "../types";
import { editState } from "../state/editState";

interface Props {
  data: Data;
  onChange: (id: string, isChecked: boolean) => void;
  isEdit: boolean;
}
const Item: React.FC<Props> = ({ data, onChange, isEdit }) => {
  const [editMode] = useRecoilState(editState);
  return (
    <div className="item">
      {!isEdit ? (
        <Checkbox
          value={data.id}
          label={data.title}
          checked={data.completed}
          onChange={(e) => onChange(e.target.value, e.target.checked)}
        />
      ) : (
        <EditField id={data.id} value={data.title} />
      )}
      {!editMode[data.id] && <Dropdown id={data.id} />}
    </div>
  );
};

export default Item;
