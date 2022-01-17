import React from "react";
import CheckBoxField from "./components/checkbox";

const FieldRenderer = ({ config, formik }) => {
  return (
    <>
      {config.map((cfg) => {
        switch (cfg.type) {
          case "checkbox":
            return <CheckBoxField key={cfg.id} config={cfg} formik={formik} />;
          default:
            return <div>Input</div>;
        }
      })}
    </>
  );
};

export default FieldRenderer;
