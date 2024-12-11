import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CommonSnackbar } from "./components/common/snackbar";
import { FormProvider } from "./contexts/formContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FormProvider>
      <CommonSnackbar />
      <App />
    </FormProvider>
  </React.StrictMode>
);


