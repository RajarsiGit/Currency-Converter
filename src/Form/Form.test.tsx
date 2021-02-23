import { render, screen } from '@testing-library/react';
import Form from './Form';

test('Renders Base Amount', () => {
  render(<Form process="" state="" />);
  expect(screen.getByText('Base Amount'))
  .toBeInTheDocument();
});
test('Renders Base Currency', () => {
  render(<Form process="" state="" />);
  expect(screen.getByText('Base Cur.', { exact: true }))
  .toBeInTheDocument();
});
test('Renders Select Base Currency', () => {
  render(<Form process="" state="" />);
  expect(screen.getByTitle('Select Base Currency'))
  .toBeInTheDocument();
});
test('Renders Target Currency', () => {
  render(<Form process="" state="" />);
expect(screen.getByText('Target Cur.', { exact: true }))
.toBeInTheDocument();
});
test('Renders Select Target Currency', () => {
  render(<Form process="" state="" />);
expect(screen.getByTitle('Select Target Currency'))
.toBeInTheDocument();
});
test('Renders Get Conversion', () => {
  render(<Form process="" state="" />);
expect(screen.getByText('Convert', { exact: true }))
.toBeInTheDocument();
});