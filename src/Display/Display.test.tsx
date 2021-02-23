import { render, screen } from '@testing-library/react';
import Display from './Display';

test('Renders Target Amount', () => {
  render(<Display conAmount="" />);
  expect(screen.getByText('Target Amount'))
  .toBeInTheDocument();
});

test('Renders Desired Amount', () => {
  render(<Display conAmount="" />);
  expect(screen.getByTitle('Desired Amount'))
  .toBeInTheDocument();
});