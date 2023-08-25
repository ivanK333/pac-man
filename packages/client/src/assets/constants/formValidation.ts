import { RegisterOptions } from 'react-hook-form';

export type ValidationEntry = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: Validation;
};

interface ValidationFunctions {
  (value: string): boolean | string;
}
interface Validation {
  latinLetters?: ValidationFunctions;
  atLeastOneLetter?: ValidationFunctions;
  atLeastOneDigit?: ValidationFunctions;
  noSpaces?: ValidationFunctions;
}

const minVal = (n: number) => ({
  value: n,
  message: `at least ${n} characters`,
});
const maxVal = (n: number) => ({
  value: n,
  message: `no more than ${n} characters`,
});

export const validation: Record<string, RegisterOptions> = {
  login: {
    required: 'Login is required',
    minLength: minVal(3),
    maxLength: maxVal(20),
    validate: {
      latinLetters: (value) =>
        /^[a-zA-Z0-9_-\s]+$/.test(value)
          ? true
          : 'Only Latin letters, hyphens and underscores are allowed',
      atLeastOneLetter: (value) =>
        /[a-zA-Z]/.test(value) ? true : 'At least one letter',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  password: {
    required: 'Password is required',
    minLength: minVal(8),
    maxLength: maxVal(40),
    validate: {
      latinLetters: (value) =>
        /^[a-zA-Z0-9\s]+$/.test(value) ? true : 'Only Latin letters',
      atLeastOneLetter: (value) =>
        /[A-Z]/.test(value) ? true : 'At least one uppercase letter',
      atLeastOneDigit: (value) =>
        /\d+/.test(value) ? true : 'At least one digit',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  confirm_password: {
    required: 'Confirm password is required',
    minLength: minVal(8),
    maxLength: maxVal(40),
    validate: {
      latinLetters: (value) =>
        /^[a-zA-Z0-9\s]+$/.test(value) ? true : 'Only Latin letters',
      atLeastOneLetter: (value) =>
        /[A-Z]/.test(value) ? true : 'At least one uppercase letter',
      atLeastOneDigit: (value) =>
        /\d+/.test(value) ? true : 'At least one digit',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  display_name: {
    required: 'Display name is required',
    minLength: minVal(3),
    maxLength: maxVal(20),
    validate: {
      latinLetters: (value) =>
        /^[a-zA-Z0-9_-\s]+$/.test(value)
          ? true
          : 'Only Latin letters, hyphens and underscores are allowed',
      atLeastOneLetter: (value) =>
        /[a-zA-Z]/.test(value) ? true : 'At least one letter',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  first_name: {
    required: 'Name is required',
    validate: {
      latinLetters: (value) =>
        /^[a-zA-Zа-яёА-ЯЁ0-9_-\s]+$/.test(value)
          ? true
          : 'Only hyphens and underscores are allowed from the characters',
      firstUppercase: (value) =>
        /^[A-ZА-ЯЁ]/.test(value) ? true : 'The first letter must be uppercase',
      noDigit: (value) =>
        /^[^0-9]*$/.test(value) ? true : 'Numbers are not allowed',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  second_name: {
    required: 'Surname is required',
    validate: {
      Letters: (value) =>
        /^[a-zA-Zа-яёА-ЯЁ0-9_-\s]+$/.test(value)
          ? true
          : 'Only hyphens and underscores are allowed from the characters',
      firstUppercase: (value) =>
        /^[A-ZА-ЯЁ]/.test(value) ? true : 'The first letter must be uppercase',
      noDigit: (value) =>
        /^[^0-9]*$/.test(value) ? true : 'Numbers are not allowed',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  email: {
    required: 'Email is required',
    validate: {
      latinLetters: (value) =>
        /^[a-zA-Z0-9@._-\s]+$/.test(value)
          ? true
          : 'Only Latin letters, hyphens and underscores are allowed',
      atAndDote: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? true
          : 'must have an "at" (@) symbol and a dot after it',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },

  phone: {
    required: 'Phone is required',
    minLength: minVal(10),
    maxLength: maxVal(15),
    validate: {
      onlyDigit: (value) =>
        /^[+\d]+$/.test(value) ? true : 'Only digits, + is allowed',
      noSpaces: (value) => (/^[^\s]*$/.test(value) ? true : 'Without spaces'),
    },
  },
};
