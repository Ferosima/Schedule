import { TValidation } from "../types/validation";

export const validation = (object: any, validation: TValidation) => {
  const error = {};
  // Check all fields of validation
  for (const [key, value] of Object.entries(validation)) {
    const { min_length, max_length, regexp, required } = value;
    if (required && !object[key]?.length) {
      error[key] = required.error || "Incorrect value";
    }
    // Min length validation
    if (min_length && min_length?.value > object[key]?.length) {
      error[key] = min_length.error || "Incorrect value";
    }
    // Max length validation
    if (max_length && max_length?.value < object[key]?.length) {
      error[key] = max_length.error || "Incorrect value";
    }
    // Regex validation
    if (regexp && !object[key]?.match(regexp.value)) {
      error[key] = regexp.error || "Incorrect value";
    }
  }
  return error;
};
