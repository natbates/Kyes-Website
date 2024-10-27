import ReactDOM from "react-dom/client";
import React from "react";
import App from "./comps/App";
import "dotenv";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);