import { render, screen } from '@testing-library/react';
import Display from './Display';

test('Renders Conveter Section Card', () => {
  render(<Display conAmount="" />);
  expect(screen.getByText(/Target Amount/i))
  .toBeInTheDocument();
});