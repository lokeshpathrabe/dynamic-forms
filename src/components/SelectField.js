import React from "react";
import { Input, FormGroup, Label, Col } from "reactstrap";
import { useDynamicField } from "../lib";
import { useFormikContext } from "formik";

const SelectField = (props) => {
  const { config } = props;
  const { enabled, value } = useDynamicField(props);
  const { handleChange } = useFormikContext();
  return (
    <FormGroup row>
      <Label for={config.id}>Select</Label>
      <Input
        id={config.id}
        name={config.id}
        type="select"
        disabled={!enabled}
        value={value}
      >
        {config.options.map((option) => (
          <option>{option}</option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default SelectField;
