import { render, screen } from '@testing-library/react';
import History from './History';

test('Renders History Section Card', () => {
  render(<History histcur={[]} />);
  expect(screen.getByText('#'))
  .toBeInTheDocument();
  expect(screen.getByText('Base Currency'))
  .toBeInTheDocument();
  expect(screen.getByText('Target Currency'))
  .toBeInTheDocument();
});