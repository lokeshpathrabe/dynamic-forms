import React from "react";
import { fields, config as rootConfig } from "./../form.config";

const FieldRenderer = ({ config, ...props }) => {
  return (
    <>
      {(config || rootConfig).map((cfg) => {
        const Component = fields[cfg.type];
        return <Component key={cfg.id} config={cfg} {...props} />;
      })}
    </>
  );
};

export default FieldRenderer;
