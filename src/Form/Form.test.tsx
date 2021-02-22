import { render, screen } from '@testing-library/react';
import Form from './Form';

test('Renders Base Amount', () => {
  render(<Form process="" state="" />);
  expect(screen.getByText(/Base Amount/i))
  .toBeInTheDocument();
});
test('Renders Base Currency', () => {
  render(<Form process="" state="" />);
  expect(screen.getByText(/Base Currency/i))
  .toBeInTheDocument();
});
test('Renders Select Base Currency', () => {
  render(<Form process="" state="" />);
  expect(screen.getByTitle(/Select Base Currency/i))
  .toBeInTheDocument();
});
test('Renders Target Currency', () => {
  render(<Form process="" state="" />);
expect(screen.getByText(/Target Currency/i))
.toBeInTheDocument();
});
test('Renders Select Target Currency', () => {
  render(<Form process="" state="" />);
expect(screen.getByTitle(/Select Target Currency/i))
.toBeInTheDocument();
});
test('Renders Get Conversion', () => {
  render(<Form process="" state="" />);
expect(screen.getByText(/Get Conversion/i))
.toBeInTheDocument();
});