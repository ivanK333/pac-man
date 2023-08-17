import { render, screen } from '@testing-library/react';

import App from './App';

const appContent = 'Вот тут будет жить ваше приложение :)';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') }),
);

test.skip('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
