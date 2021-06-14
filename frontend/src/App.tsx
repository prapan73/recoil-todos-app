/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { RecoilRoot } from "recoil";
import Wrapper from "./components/Wrapper";

import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col">
            <RecoilRoot>
              <Wrapper />
            </RecoilRoot>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
