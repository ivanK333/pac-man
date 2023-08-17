export type ValidationEntry = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: {
    value: RegExp;
    message: string;
  };
};
