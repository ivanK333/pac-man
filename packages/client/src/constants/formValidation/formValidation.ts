import { RegisterOptions } from 'react-hook-form';

import {
  atLeastOneDigit,
  atLeastOneLetter,
  atLeastOneUppercaseLetter,
  firstUppercase,
  latinLetters,
  maxVal,
  minVal,
  noCharacters,
  noDigit,
  noSpaces,
} from './commonErrors';

export const validation: Record<string, RegisterOptions> = {
  login: {
    required: 'Login is required',
    minLength: minVal(3),
    maxLength: maxVal(20),
    validate: {
      latinLetters,
      atLeastOneLetter,
      noSpaces,
    },
  },

  password: {
    required: 'Password is required',
    minLength: minVal(8),
    maxLength: maxVal(40),
    validate: {
      latinLetters,
      atLeastOneUppercaseLetter,
      atLeastOneDigit,
      noSpaces,
    },
  },

  confirm_password: {
    required: 'Confirm password is required',
    minLength: minVal(8),
    maxLength: maxVal(40),
    validate: {
      latinLetters,
      atLeastOneUppercaseLetter,
      atLeastOneDigit,
      noSpaces,
    },
  },

  display_name: {
    required: 'Display name is required',
    minLength: minVal(3),
    maxLength: maxVal(20),
    validate: {
      latinLetters,
      atLeastOneLetter,
      noSpaces,
    },
  },

  first_name: {
    required: 'Name is required',
    validate: {
      noCharacters,
      firstUppercase,
      noDigit,
      noSpaces,
    },
  },

  second_name: {
    required: 'Surname is required',
    validate: {
      noCharacters,
      firstUppercase,
      noDigit,
      noSpaces,
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
      noSpaces,
    },
  },

  phone: {
    required: 'Phone is required',
    minLength: minVal(10),
    maxLength: maxVal(15),
    validate: {
      onlyDigit: (value) =>
        /^[+\d\s]+$/.test(value) ? true : 'Only digits, + is allowed',
      noSpaces,
    },
  },
};
