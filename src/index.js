import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home/index";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<Home />, document.getElementById("root"));
registerServiceWorker();
