import React from "react";
import { useRecoilState } from "recoil";
import { filterType } from "../state/todoState";
import "../styles/Filter.scss";
import { FilterProps, FilterKey } from "../types";

const MappingFilter: Record<FilterKey, FilterProps> = {
  all: { label: "All" },
  done: { label: "Done" },
  undone: { label: "Undone" },
};

const Filter = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [filter, setFilter] = useRecoilState(filterType);
  const handleFilter = (status: FilterKey) => {
    setFilter(status);
    setIsOpen(false);
  };

  return (
    <div className="filter">
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
        {MappingFilter[filter].label}
        <span className="material-icons">expand_more</span>
      </button>
      {isOpen && (
        <div className="toggle-dropdown">
          <button onClick={() => handleFilter("all")}>
            {MappingFilter["all"].label}
          </button>
          <button onClick={() => handleFilter("done")}>
            {MappingFilter["done"].label}
          </button>
          <button onClick={() => handleFilter("undone")}>
            {MappingFilter["undone"].label}
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
