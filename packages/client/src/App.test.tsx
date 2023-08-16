import { render, screen } from '@testing-library/react';

import App from './App';

const appContent = 'Вот тут будет жить ваше при ложение :)';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') }),
);

test('Example test', () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
