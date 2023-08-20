export type ValidationEntry = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: {
    value: RegExp;
    message: string;
  };
};
const minVal = (n: number) => ({
  value: n,
  message: `at least ${n} characters`,
});
const maxVal = (n: number) => ({
  value: n,
  message: `no more than ${n} characters`,
});

export const validation: Record<string, ValidationEntry> = {
  login: {
    required: 'Login is required',
    minLength: minVal(3),
    maxLength: maxVal(20),
    pattern: {
      value: /^[a-zA-Z0-9-]{3,20}$/,
      message: `Only Latin letters, digits, but not composed solely of them, without spaces, 
        without special characters (hyphens and underscores are allowed)`,
    },
  },
  password: {
    required: 'Password is required',
    minLength: minVal(8),
    maxLength: maxVal(40),
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: 'At least one uppercase letter and one digit are required',
    },
  },
  password_old: {
    minLength: minVal(8),
    maxLength: maxVal(40),
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: `Password requirements:
      - from 8 to 40 characters,
      - at least one uppercase letter and one digit,
      - must match the account password`,
    },
  },
  password_new: {
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: `Password requirements:
      - from 8 to 40 characters,
      - at least one uppercase letter and one digit`,
    },
  },
  repeat_password: {
    minLength: minVal(8),
    maxLength: maxVal(40),
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
      message: `Password requirements:
      - from 8 to 40 characters,
      - at least one uppercase letter and one digit,
      - must match the entered new password`,
    },
  },
  display_name: {
    minLength: minVal(3),
    maxLength: maxVal(20),
    pattern: {
      value: /^[a-zA-Z0-9-]{3,20}$/,
      message: `Display Name requirements:
      - from 3 to 20 characters,
      - only Latin letters,
      - digits, but not composed solely of them,
      - no spaces, no special characters (hyphens and underscores are allowed)`,
    },
  },
  first_name: {
    pattern: {
      value: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/,
      message: `First Name requirements:
      - Latin or Cyrillic,
      - the first letter must be uppercase,
      - no spaces or numbers,
      - no special characters (only hyphens are allowed)`,
    },
  },
  second_name: {
    pattern: {
      value: /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/,
      message: `Last Name requirements:
      - Latin or Cyrillic,
      - the first letter must be uppercase,
      - no spaces or numbers,
      - no special characters (only hyphens are allowed)`,
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9\-_]+@[a-zA-Z]+\.[a-zA-Z]+$/,
      message: `Email requirements:
      - Latin letters,
      - may include numbers, hyphens, and underscores,
      - must have an "at" (@) symbol and a dot after it,
      - letters must come before the dot`,
    },
  },
  phone: {
    pattern: {
      value: /^\+?\d{10,15}$/,
      message: `Phone number requirements:
      - from 10 to 15 characters,
      - consists of numbers,
      - can start with a plus sign`,
    },
  },
  age: {
    pattern: {
      value: /^(?:\d{1,2}|1[01]\d|120)$/,
      message: `Age requirements:
      - consists of numbers,
      - cannot be more than 120 years`,
    },
  },
  city: {
    pattern: {
      value: /^(?![0-9])[A-Za-z0-9А-Яа-яЁё -]+$/,
      message: `City name requirements:
      - Latin or Cyrillic,
      - no special characters (only hyphens are allowed)`,
    },
  },
};
