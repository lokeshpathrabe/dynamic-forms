import CheckBoxField from "./components/Checkbox";
import EmailField from "./components/EmailField";
import PasswordField from "./components/PasswordField";
import RadioField from "./components/RadioField";
import SelectField from "./components/SelectField";
import TextField from "./components/TextField";

const fields = {
  checkbox: CheckBoxField,
  email: EmailField,
  password: PasswordField,
  radio: RadioField,
  select: SelectField,
  text: TextField,
};

const config = [
  {
    id: "indian-citizen",
    type: "checkbox",
    label: "Indian Citizen",
    required: false,
    initialValue: true,
    deriveFrom: "!usa-citizen",
    enableIf: "",
  },
  {
    id: "usa-citizen",
    type: "checkbox",
    label: "USA Citizen",
    required: false,
    initialValue: false,
    deriveFrom: "!indian-citizen",
    enableIf: "",
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    required: false,
    initialValue: "",
    deriveFrom: "",
    enableIf: [
      { name: "indian-citizen", value: true },
      { name: "usa-citizen", value: true },
    ],
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    required: false,
    initialValue: "",
    deriveFrom: "",
    enableIf: [
      { name: "indian-citizen", value: true },
      { name: "usa-citizen", value: true },
    ],
  },
  {
    id: "confirm-password",
    type: "text",
    label: "Confirm Password",
    required: false,
    initialValue: "",
    deriveFrom: "password",
    enableIf: false,
  },
  {
    id: "indian-state",
    type: "select",
    label: "Indian State",
    required: false,
    initialValue: "kerala",
    options: ["gujarat", "maharastra", "kerala", "utar pradesh", "tamilnadu"],
    deriveFrom: "",
    enableIf: [{ name: "indian-citizen", value: true }],
  },
  {
    id: "uda-state",
    type: "select",
    label: "USA State",
    required: false,
    initialValue: "ohio",
    options: ["texas", "ohio", "florida", "california", "new jursey"],
    deriveFrom: "",
    enableIf: [{ name: "usa-citizen", value: true }],
  },
];

export { fields, config };
