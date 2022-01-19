import React from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { useDynamicField } from "../lib";
import { useFormikContext } from "formik";

const PasswordField = (props) => {
  const { config } = props;
  const { enabled, value } = useDynamicField(props);
  const { handleChange } = useFormikContext();
  return (
    <FormGroup row>
      <Label sm={4} for={config.id}>
        {config.label}
      </Label>
      <Col sm={6}>
        <Input
          id={config.id}
          name={config.id}
          placeholder="Enter password"
          type="password"
          disabled={!enabled}
          value={value}
          onChange={handleChange}
        />
      </Col>
    </FormGroup>
  );
};

export default PasswordField;
