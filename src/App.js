import "./styles.css";
import Form from "./Form";

export default function App() {
  return (
    <div className="App">
      <Form
        config={[
          {
            id: "endpoints",
            type: "checkbox",
            label: "Endpoints",
            initialValue: false,
            required: false,
            deriveFrom: "",
            dependsOn: ""
          },
          {
            id: "endpoints-ransomware",
            type: "checkbox",
            label: "Ransomware (Endpoints)",
            initialValue: false,
            required: false,
            deriveFrom: "",
            dependsOn: "endpoints"
          },
          {
            id: "endpoints-analytics",
            type: "checkbox",
            label: "Analytics (Endpoints)",
            initialValue: false,
            required: false,
            deriveFrom: "",
            dependsOn: "endpoints"
          },
          {
            id: "servers",
            type: "checkbox",
            label: "Servers",
            initialValue: false,
            required: false,
            deriveFrom: "",
            dependsOn: ""
          },
          {
            id: "servers-ransomware",
            type: "checkbox",
            label: "Ransomware (Servers)",
            initialValue: false,
            required: false,
            deriveFrom: "endpoints-ransomware",
            dependsOn: "servers"
          },
          {
            id: "servers-analytics",
            type: "checkbox",
            label: "Analytics (Servers)",
            initialValue: false,
            required: false,
            deriveFrom: "",
            dependsOn: "servers"
          }
        ]}
      />
    </div>
  );
}
