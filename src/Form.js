import React from "react";
import {
  Col,
  Input,
  Label,
  FormGroup,
  Button,
  FormText,
  Form
} from "reactstrap";
import CheckboxField from "./components/checkbox";
import FieldRenderer from "./FieldRenderer";
import { useFormik } from "formik";

const DynamicForm = ({ config }) => {
  const initialValues = config.reduce((val, c) => {
    val[c.id] = c.initialValue;
    return val;
  }, {});

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Form onSubmit={(e) => formik.handleSubmit}>
      <FieldRenderer formik={formik} config={config} />
      <FormGroup check row>
        <Col
          sm={{
            offset: 2,
            size: 10
          }}
        >
          <Button>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default DynamicForm;
