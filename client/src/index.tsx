import React from "react";
import ReactDOM from "react-dom";
import "./sass/main.scss";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
