import { render, screen } from '@testing-library/react';
import Form from './Form';

test('Renders Conveter Section Card', () => {
  render(<Form process="" state="" />);
  expect(screen.getByText(/Base Amount/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Base Currency/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Target Currency/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Get Conversion/i))
  .toBeInTheDocument();
});