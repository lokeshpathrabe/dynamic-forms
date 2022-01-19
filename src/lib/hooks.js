import { useEffect } from "react";
import { useFormikContext } from "formik";
import { getEnableIf, deriveValue } from "./utils";
import { fields, config } from "./../form.config";

export const useDynamicField = (props) => {
  const { config } = props;
  const { values: formikValues, setFieldValue } = useFormikContext();
  const enabled = getEnableIf(config.enableIf, formikValues);
  const value = Boolean(config.deriveFrom)
    ? deriveValue(config, formikValues)
    : formikValues[config.id];

  useEffect(() => {
    setFieldValue(config.id, value);
  }, [value]);

  return {
    enabled,
    value,
  };
};

export const useDynamicForm = () => {
  const initialValues = config.reduce((val, c) => {
    val[c.id] = c.initialValue;
    return val;
  }, {});

  return {
    initialValues,
  };
};
