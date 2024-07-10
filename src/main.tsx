import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs)
const existingConfig = Amplify.getConfig();

// Add existing resource to the existing configuration.
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      Dassie: {
        endpoint:
          'https://p5cgnlejzk.execute-api.eu-west-1.amazonaws.com/prod',
        region: 'eu-west-1' // Optional
      }
    }
  }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
