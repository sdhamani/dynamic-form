# Dynamic Survey Form Application

This project is a dynamic survey form built using React, Material-UI, and TypeScript. The application provides a customizable form structure based on a JSON configuration, making it easy to adapt to various survey requirements without modifying the underlying code.

## Features

- Dynamic rendering of form fields based on the provided JSON configuration.
- Support for various input types, including text, email, dropdown, textarea, radio buttons, and checkboxes.
- Validation rules, including regex patterns and conditional visibility for fields.
- Displays user-friendly error messages for invalid inputs.
- Integration with a custom state management solution using React Context and Reducers.
- Unit testing using Jest and React Testing Library.

---

## Sample JSON Configuration

Below is an example JSON configuration for an insurance products survey:

```json
{
  "title": "Insurance Products Survey",
  "fields": [
    {
      "type": "text",
      "label": "Full Name",
      "id": "fullName",
      "required": true,
      "regex": "^[a-zA-Z ]{2,50}$",
      "errorMessage": "Full Name must only contain letters and be 2-50 characters long."
    },
    {
      "type": "email",
      "label": "Email Address",
      "id": "email",
      "required": true,
      "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      "errorMessage": "Please enter a valid email address."
    },
    {
      "type": "dropdown",
      "label": "Which type of insurance product are you most interested in?",
      "id": "insuranceType",
      "options": [
        "Health Insurance",
        "Car Insurance",
        "Life Insurance",
        "Home Insurance"
      ],
      "required": true
    },
    {
      "type": "dropdown",
      "label": "Do you currently have an active insurance policy?",
      "id": "activePolicy",
      "options": ["Yes", "No"],
      "required": true
    },
    {
      "type": "text",
      "label": "If yes, please specify your current insurance provider:",
      "id": "currentProvider",
      "required": false,
      "regex": "^[a-zA-Z0-9 ]{2,50}$",
      "errorMessage": "Provider name must only contain alphanumeric characters and be 2-50 characters long.",
      "visibleIf": {
        "field": "activePolicy",
        "value": ["Yes"]
      }
    },
    {
      "type": "textarea",
      "label": "What features do you look for when choosing an insurance policy?",
      "id": "policyFeatures",
      "required": true,
      "regex": "^.{10,500}$",
      "errorMessage": "Please provide at least 10 characters describing the features you look for."
    },
    {
      "type": "dropdown",
      "label": "How would you rate your overall satisfaction with your current insurance provider?",
      "id": "satisfaction",
      "options": [
        "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very Dissatisfied"
      ],
      "required": true,
      "visibleIf": {
        "field": "activePolicy",
        "value": ["Yes"]
      }
    },
    {
      "type": "radio",
      "label": "What is your preferred contact method?",
      "id": "contactMethod",
      "options": ["Email", "Phone", "SMS"],
      "required": true
    },
    {
      "type": "textarea",
      "label": "Please provide any additional comments or feedback:",
      "id": "additionalComments",
      "required": false,
      "regex": "^.{0,1000}$",
      "errorMessage": "Feedback must not exceed 1000 characters."
    },
    {
      "type": "checkbox",
      "label": "Do you agree to the terms and conditions?",
      "id": "agreeTerms",
      "required": true,
      "errorMessage": "You must accept the terms and conditions to proceed."
    }
  ]
}
```

## Installation

### Prerequisites

- **Node.js** (>=16.x.x)
- **npm** or **yarn**

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/dynamic-survey-form.git
   cd dynamic-survey-form
   ```

2. **Install dependencies:**:

   ```bash
   npm install

   or

   yarn install
   ```

3. **Start the development server::**:

   ```bash
   npm start

   Or

   yarn start
   ```

4. **Access the application: Open your browser and navigate to:::**:

   ```bash
   http://localhost:3000
   ```

## Running Tests

This project includes unit tests for components and utilities.

## Run all tests

```bash
npm test

or

yarn test
```
