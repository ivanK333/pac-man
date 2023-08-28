const minVal = (n: number) => ({
  value: n,
  message: `at least ${n} characters`,
});
const maxVal = (n: number) => ({
  value: n,
  message: `no more than ${n} characters`,
});

const enum CommonErrorMessages {
  noSpaces = 'Without spaces',
  latinLetters = 'Only Latin letters, hyphens and underscores are allowed',
  atLeastOneLetter = 'At least one letter',
  atLeastOneUppercaseLetter = 'At least one uppercase letter',
  atLeastOneDigit = 'At least one digit',
  noCharacters = 'Only hyphens and underscores are allowed from the characters',
  firstUppercase = 'The first letter must be uppercase',
  noDigit = 'Numbers are not allowed',
}

const noSpaces = (value: string) =>
  /^[^\s]*$/.test(value) ? true : CommonErrorMessages.noSpaces;

const latinLetters = (value: string) =>
  /^[a-zA-Z0-9_-\s]+$/.test(value) ? true : CommonErrorMessages.latinLetters;

const atLeastOneLetter = (value: string) =>
  /^.*[a-zA-Z]+.*$/.test(value) ? true : CommonErrorMessages.atLeastOneLetter;

const atLeastOneUppercaseLetter = (value: string) =>
  /[A-Z]/.test(value) ? true : CommonErrorMessages.atLeastOneUppercaseLetter;

const atLeastOneDigit = (value: string) =>
  /\d+/.test(value) ? true : CommonErrorMessages.atLeastOneDigit;

const noCharacters = (value: string) =>
  /^[a-zA-Zа-яёА-ЯЁ0-9_-\s]+$/.test(value)
    ? true
    : CommonErrorMessages.noCharacters;

const firstUppercase = (value: string) =>
  /^[A-ZА-ЯЁ]/.test(value) ? true : CommonErrorMessages.firstUppercase;

const noDigit = (value: string) =>
  /^[^0-9]*$/.test(value) ? true : CommonErrorMessages.noDigit;

export {
  minVal,
  maxVal,
  noSpaces,
  latinLetters,
  atLeastOneLetter,
  atLeastOneUppercaseLetter,
  atLeastOneDigit,
  noCharacters,
  firstUppercase,
  noDigit,
};
