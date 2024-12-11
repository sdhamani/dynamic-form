import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { FormProvider } from "contexts/formContext";

const renderWithProvider = (ui) => {
  return render(
    <FormProvider>
      {ui}
    </FormProvider>
  );
};

test("renders the app without crashing", () => {
  renderWithProvider(<App />);
  const formElement = screen.getByTestId("form-element");
  expect(formElement).toBeInTheDocument();
});
