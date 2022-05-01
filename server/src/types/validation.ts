export type TField = {
  min_length?: TFieldValidation;
  max_length?: TFieldValidation;
  regexp?: TFieldValidation;
  required?: TFieldValidation;
};

export type TFieldValidation = {
  value?: number | string | RegExp | boolean;
  error?: string;
};

export interface TValidation {
  [key: string]: TField;
}
