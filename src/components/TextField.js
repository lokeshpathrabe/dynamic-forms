import React from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { useDynamicField } from "../lib";
import { useFormikContext } from "formik";
import { config } from "react-transition-group";

const TextField = (props) => {
  const { config } = props;
  const { enabled, value } = useDynamicField(props);
  const { handleChange } = useFormikContext();
  return (
    <FormGroup row>
      <Label sm={4} for="exampleEmail">
        {config.label}
      </Label>
      <Col sm={6}>
        <Input
          id={config.id}
          name={config.id}
          placeholder="Enter some text"
          type="text"
          disabled={!enabled}
          value={value}
          onChange={handleChange}
        />
      </Col>
    </FormGroup>
  );
};

export default TextField;
