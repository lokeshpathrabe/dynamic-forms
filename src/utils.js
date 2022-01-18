import { useFormikContext } from "formik";
import { useEffect } from "react";

const executeCondition = (cfg, values) => {
  let bool;
  switch (cfg.op) {
    case "AND":
      bool = cfg.conditions.reduce((acc, cond) => {
        if (cond.op) {
          return executeCondition(acc, cond);
        }
        return acc && values[cond.name] === cond.value;
      }, true);
      break;
    case "NOT":
      const result = cfg.conditions.reduce((acc, cond) => {
        if (cond.op) {
          return executeCondition(acc, cond);
        }
        return acc || values[cond.name] === cond.value;
      }, false);
      bool = !result;
      break;
    case "OR":
      bool = cfg.conditions.reduce((acc, cond) => {
        if (cond.op) {
          return executeCondition(acc, cond);
        }
        return acc || values[cond.name] === cond.value;
      }, false);
      break;

    case "GREATER":
      bool = values[cond.name] > cond.value;
      break;
    case "LESS":
      bool = values[cond.name] < cond.value;
      break;
    case "LEQ":
      bool = values[cond.name] <= cond.value;
      break;
    case "GEQ":
      bool = values[cond.name] >= cond.value;
      break;
    default:
      bool = values[cond.name] === cond.value;
      break;
  }
  return bool;
};

const getEnableIf = (config, values) => {
  if (typeof config === "boolean") {
    return config;
  }
  if (Array.isArray(config)) {
    return [...config].reduce((enable, cfg) => {
      if (!Boolean(cfg.op)) {
        cfg = {
          op: "OR",
          conditions: [cfg],
        };
      }
      const result = executeCondition(cfg, values);
      return enable || result;
    }, false);
  }
  return true;
};

const deriveValue = (config, formikValues) => {
  const deriveConfig = config.deriveFrom;
  if (typeof deriveConfig === "string") {
    return formikValues[deriveConfig];
  }

  if (Array.isArray(deriveConfig)) {
    return [...deriveConfig].reduce((value, cfg, i, arr) => {
      if (typeof cfg === "string") {
        arr.splice(i); // exit loop
        return value === true ? formikValues[cfg] : formikValues[config.id];
      }
      if (!Boolean(cfg.op)) {
        cfg = {
          op: "OR",
          conditions: [cfg],
        };
      }
      const result = executeCondition(cfg, formikValues);
      return value || result;
    }, false);
  }
};

export const useDynamicForms = (config) => {
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
