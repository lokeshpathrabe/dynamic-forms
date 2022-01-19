import React from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { useDynamicField } from "../lib";
import { useFormikContext } from "formik";

const RadioField = (props) => {
  const { config } = props;
  const { enabled, value } = useDynamicField(props);
  const { handleChange } = useFormikContext();
  console.log(value);
  return (
    <FormGroup tag="fieldset" row>
      <Label sm={4} for={config.id}>
        {config.label}
      </Label>
      <Col>
        {Array.isArray(config.radioOptions)
          ? config.radioOptions.map((label) => (
              <FormGroup check>
                <Input
                  name={config.id}
                  type="radio"
                  onChange={(e) => handleChange()}
                  //   checked={value}
                />
                <Label check>{label}</Label>
              </FormGroup>
            ))
          : null}
      </Col>
    </FormGroup>
  );
};

export default RadioField;
