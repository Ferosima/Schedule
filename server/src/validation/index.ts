export const DEFAULT_VALIDATION = {
  MIN_LENGTH: {
    value: 3,
    error: "Must be at least 3 characters",
  },
  MAX_LENGTH: {
    value: 255,
    error: "Must be no more than 255 characters",
  },
  REQUIRED: {
    value: true,
    error: "Field is required",
  },
  REGEXP: {
    value: /^[a-zA-Z0-9]+$/,
    error: "Contains invalid characters. ",
  },
};
// Default validation for form
export const DEFAULT_VALIDATION_FIELD = {
  min_length: DEFAULT_VALIDATION.MIN_LENGTH,
  max_length: DEFAULT_VALIDATION.MAX_LENGTH,
  regexp: DEFAULT_VALIDATION.REGEXP,
  required: DEFAULT_VALIDATION.REQUIRED,
};
