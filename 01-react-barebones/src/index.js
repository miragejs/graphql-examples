import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider, createClient } from "urql";
import { makeServer } from "./mirage/server";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const client = createClient({
  url: "/graphql"
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
