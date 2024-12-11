import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputField from "components/common/inputfield";
import { InputFieldProps } from "types";

const mockOnChange = jest.fn();

const renderInputField = (props: Partial<InputFieldProps> = {}) => {
    const defaultProps: InputFieldProps = {
        field: { id: "test", label: "Test Field", type: "text", required: false },
        value: "",
        onChange: mockOnChange,
        visible: true,
        error: "",
        ...props,
    };

    return render(<InputField {...defaultProps} />);
};

describe("InputField Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders an email input field", () => {
        renderInputField({ field: { id: "email", label: "Email", type: "email" } });
        const input = screen.getByLabelText(/Email/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "email");
    });

    it("renders an email input field", () => {
        renderInputField({ field: { id: "email", label: "Email", type: "email" } });
        const input = screen.getByLabelText(/Email/i);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "email");
    });

    it("renders a textarea", () => {
        renderInputField({ field: { id: "textarea", label: "Textarea", type: "textarea" } });
        const textarea = screen.getByLabelText(/Textarea/i);
        expect(textarea).toBeInTheDocument();
        expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("renders a checkbox", () => {
        renderInputField({ field: { id: "checkbox", label: "Checkbox", type: "checkbox" }, value: false });
        const checkbox = screen.getByLabelText(/Checkbox/i);
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith("checkbox", true);
    });

    it("renders a radio group", () => {
        renderInputField({
            field: { id: "radio", label: "Radio", type: "radio", options: ["Option 1", "Option 2"] },
        });
        expect(screen.getByText(/Radio/i)).toBeInTheDocument();
        fireEvent.click(screen.getByLabelText(/Option 1/i));
        expect(mockOnChange).toHaveBeenCalledWith("radio", "Option 1");
    });

    it("shows error messages", () => {
        renderInputField({ error: "This field is required" });
        expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
    });

    it("does not render when visible is false", () => {
        renderInputField({ visible: false });
        expect(screen.queryByLabelText(/Test Field/i)).not.toBeInTheDocument();
    });

    it("calls onChange with the correct value for text inputs", () => {
        renderInputField();
        const input = screen.getByLabelText(/Test Field/i);
        fireEvent.change(input, { target: { value: "New Value" } });
        expect(mockOnChange).toHaveBeenCalledWith("test", "New Value");
    });
});
