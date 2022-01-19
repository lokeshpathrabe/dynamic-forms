import React, { useEffect, useState } from "react";
import { Col, FormGroup, Button, Form, Input } from "reactstrap";
import { Formik } from "formik";
import { FieldRenderer, useDynamicForm } from "./lib";
import { config as rootConfig } from "./form.config";

const DynamicForm = () => {
  const { initialValues } = useDynamicForm();
  const [config, setConfig] = useState(JSON.stringify(rootConfig, null, 4));
  const [jsonConfig, setJSONConfig] = useState(rootConfig);
  const [message, setMessage] = useState({});

  useEffect(() => {
    try {
      setJSONConfig(JSON.parse(config));
      setMessage({ msg: "Config Updated", type: "success" });
    } catch (e) {
      setMessage({ msg: "Error in JSON", type: "error" });
    }
  }, [config]);

  console.log(config);
  return (
    <div className="form-container">
      <Col sm={5}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
          }}
        >
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <FieldRenderer config={jsonConfig} />
              <FormGroup check row>
                <Col>
                  <Button type="submit">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </Col>

      <Col sm={5}>
        {message.msg ? (
          <div
            className={message.type === "error" ? "error-msg" : "success-msg"}
          >
            {message.msg}
          </div>
        ) : null}

        <Input
          id="config"
          name="config"
          className="config-preview"
          type="textarea"
          value={config}
          onChange={(e) => setConfig(e.target.value)}
        />
      </Col>
    </div>
  );
};

export default DynamicForm;
