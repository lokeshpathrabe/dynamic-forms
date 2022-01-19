import { useFormikContext } from "formik";
import { useEffect } from "react";

export const executeCondition = (cfg, values) => {
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

export const getEnableIf = (config, values) => {
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

export const deriveValue = (config, formikValues) => {
  const deriveConfig = config.deriveFrom;
  const regex = /^!(.*)/gm;

  if (typeof deriveConfig === "string") {
    const match = regex.exec(deriveConfig);
    if (match && match.length > 0) {
      const fieldName = match[1];
      return !formikValues[fieldName];
    }
    return formikValues[deriveConfig];
  }

  if (Array.isArray(deriveConfig)) {
    return [...deriveConfig].reduce((value, cfg, i, arr) => {
      if (typeof cfg === "string") {
        arr.splice(i); // exit loop

        const match = regex.exec(deriveConfig);
        if (match && match.length > 0) {
          const fieldName = match[1];
          return value === true
            ? !formikValues[fieldName]
            : formikValues[config.id];
        }
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
