import { Formik } from "formik";
import React, { useEffect } from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { useDynamicForms } from "./../utils";
import { useFormikContext } from "formik";

const CheckBoxField = ({ config }) => {
  const { enabled, value } = useDynamicForms(config);
  const { handleChange } = useFormikContext();
  console.log(config.id, enabled, value);

  return (
    <FormGroup row>
      <Label sm={4}>{config.label}</Label>
      <Col sm={6}>
        <Input
          name={config.id}
          type="checkbox"
          onChange={handleChange}
          checked={value}
          disabled={!enabled}
        />
      </Col>
    </FormGroup>
  );
};

export default CheckBoxField;
