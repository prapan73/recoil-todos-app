import React from "react";

import "../styles/Progress.scss";

interface Props {
  percenTage: number;
}

const Progress: React.FC<Props> = ({ percenTage }) => {
  return (
    <div className="progress">
      <h2>Progress</h2>
      <div className="bar">
        <div className="value" style={{ width: `${percenTage}%` }}></div>
      </div>
      <p>{percenTage} Completed</p>
    </div>
  );
};

export default Progress;
