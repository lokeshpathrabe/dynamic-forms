import React from "react";
import {
  Col,
  Input,
  Label,
  FormGroup,
  Button,
  FormText,
  Form,
} from "reactstrap";
import FieldRenderer from "./FieldRenderer";
import { Formik } from "formik";

const DynamicForm = ({ config }) => {
  const initialValues = config.reduce((val, c) => {
    val[c.id] = c.initialValue;
    return val;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      {(formikProps) => (
        <Form onSubmit={formikProps.handleSubmit}>
          <FieldRenderer config={config} />
          <FormGroup check row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
