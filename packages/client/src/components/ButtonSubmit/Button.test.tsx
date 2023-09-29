import { render, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Button from './Button';

const label = 'Тест';
const click = jest.fn();
const id = '212';
const enum buttonTypes {
  reset = 'reset',
  submit = 'submit',
  button = 'button',
}

describe('Тест компонента Button(ButtonSubmit)', () => {
  test('рендер компонента с пропсами', () => {
    render(
      <Button
        label={label}
        id={id}
        onClick={click}
        disabled={false}
        type={buttonTypes.button}
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('рендер компонента без пропсов', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('рендер компонента в состоянии disabled', () => {
    render(<Button label={label} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('вызывает по клику переданную функцию', () => {
    render(<Button label={label} onClick={click} id={id} />);

    fireEvent.click(screen.getByRole('button'));
    expect(click).toHaveBeenCalledTimes(1);
  });
});
