import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DynamicForm from "components/dynamicForm";
import { FormContext } from "contexts/formContext";

const sampleConfig = {
    title: "Test Form",
    fields: [
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
    ],
};

const renderWithProvider = (ui: React.ReactElement, mockState: any, mockDispatch: any) => {
    const mockValue = {
        state: mockState,
        dispatch: mockDispatch,
    };

    return render(
        <FormContext.Provider value={mockValue}>
            {ui}
        </FormContext.Provider>
    );
};

describe("DynamicForm Component", () => {
    let mockDispatch: jest.Mock;
    let mockState: any;

    beforeEach(() => {
        mockState = {
            values: { name: "", email: "" },
            errors: {},
        };
        mockDispatch = jest.fn();
        (window as any).showSnackbar = jest.fn();
    });

    it("renders the form title", () => {
        renderWithProvider(<DynamicForm config={sampleConfig} />, mockState, mockDispatch);
        expect(screen.getByText("Test Form")).toBeInTheDocument();
    });

    it("renders all fields", () => {
        renderWithProvider(<DynamicForm config={sampleConfig} />, mockState, mockDispatch);
        expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    });

    it("handles form submission successfully", () => {
        mockState.values.name = "John Doe";
        mockState.values.email = "john.doe@example.com";

        renderWithProvider(<DynamicForm config={sampleConfig} />, mockState, mockDispatch);

        fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

        expect((window as any).showSnackbar).toHaveBeenCalledWith(
            "Form submitted successfully!",
            "success"
        );

        sampleConfig.fields.forEach((field) => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_FIELD_VALUE",
                payload: { fieldId: field.id, value: "" },
            });
        });
    });
});
