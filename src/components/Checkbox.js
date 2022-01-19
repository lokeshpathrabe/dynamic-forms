import React from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { useDynamicField } from "../lib";
import { useFormikContext } from "formik";

const CheckBoxField = (props) => {
  const { config } = props;
  const { enabled, value } = useDynamicField(props);
  const { handleChange } = useFormikContext();
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
