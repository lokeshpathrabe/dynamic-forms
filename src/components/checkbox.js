import { Formik } from "formik";
import React from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";

const CheckBoxField = ({ config, formik }) => {
  const disabled = Boolean(config.dependsOn)
    ? !Boolean(formik.values[config.dependsOn])
    : false;
  const value = Boolean(config.deriveFrom)
    ? formik.values[config.deriveFrom]
    : formik.values[config.id];
  return (
    <FormGroup row>
      <Label sm={4}>{config.label}</Label>
      <Col sm={6}>
        <Input
          name={config.id}
          type="checkbox"
          onChange={formik.handleChange}
          checked={value}
          disabled={disabled}
        />
      </Col>
    </FormGroup>
  );
};

export default CheckBoxField;
