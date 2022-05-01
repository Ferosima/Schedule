import { DEFAULT_VALIDATION, DEFAULT_VALIDATION_FIELD } from ".";

export const USER_CREATE_VALIDATION = {
  first_name: DEFAULT_VALIDATION_FIELD,
  last_name: DEFAULT_VALIDATION_FIELD,
  password: {
    ...DEFAULT_VALIDATION_FIELD,
    min_length: {
      value: 6,
      error: "Must be at least 6 characters",
    },
    regexp: undefined,
  },
  email: {
    regexp: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: "Wrong email address ",
    },
    required: DEFAULT_VALIDATION.REQUIRED,
  },
};

export const USER_LOGIN_VALIDATION = {
  password: {
    required: DEFAULT_VALIDATION.REQUIRED,
  },
  email: {
    required: DEFAULT_VALIDATION.REQUIRED,
  },
};
