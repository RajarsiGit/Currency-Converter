import { render, screen } from '@testing-library/react';
import Root from './Root';

test('Renders Conveter Section Card', () => {
  render(<Root />);
  expect(screen.getByText('Convert Your Currency Now'))
  .toBeInTheDocument();
});

test('Renders History Section Card', () => {
  render(<Root />);
  expect(screen.getByText('Used Conversions'))
  .toBeInTheDocument();
});