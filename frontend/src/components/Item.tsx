import React from "react";

import "../styles/Item.scss";
interface Props {
  value: string;
}
const Item: React.FC<Props> = ({ value }) => {
  return <div className="item">{value}</div>;
};

export default Item;
