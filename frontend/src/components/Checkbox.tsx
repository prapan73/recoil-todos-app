import React from "react";

import "../styles/Checkbox.scss";

interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value: string;
}

const Checkbox: React.FC<Props> = ({
  label,
  onChange,
  checked = false,
  value,
}) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        onChange={onChange}
        checked={checked}
        value={value}
      />
      <span className="checkmark" />
      <span className="text-label">{label}</span>
    </label>
  );
};

export default Checkbox;
