import React from "react";

import "../styles/Loading.scss";

const Loading: React.FC<{ items: number }> = ({ items }) => {
  const renderItems = (): JSX.Element[] => {
    let elements = [];
    for (let i = 0; i < items; i++) {
      elements.push(
        <div className="loading" key={i}>
          Loading...
        </div>
      );
    }
    return elements;
  };
  return <>{renderItems()}</>;
};

export default Loading;
