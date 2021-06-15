import React from "react";
import Checkbox from "./Checkbox";
import SvgLoading from "./SvgLoading";
import "../styles/Item.scss";
import { Data } from "../types";

interface Props {
  data: Data;
  onChange: (id: string) => void;
}
const Item: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="item">
      <Checkbox
        value={data.id}
        label={data.title}
        checked={data.completed}
        onChange={(e) => onChange(e.target.value)}
      />
      <SvgLoading />
    </div>
  );
};

export default Item;
