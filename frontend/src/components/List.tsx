import React from "react";
import { Data } from "../types";
import Item from "./Item";

interface Props {
  data: Data[] | undefined;
}

const List: React.FC<Props> = ({ data }) => {
  return (
    <div>
      {data?.map((o, index) => (
        <Item key={index} value={o.title} />
      ))}
    </div>
  );
};

export default List;
