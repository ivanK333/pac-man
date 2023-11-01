import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': 'identity-obj-proxy',
  },
  extensionsToTreatAsEsm: ['.tsx'],
};
