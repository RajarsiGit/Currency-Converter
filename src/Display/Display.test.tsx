import { render, screen } from '@testing-library/react';
import Display from './Display';

const rootState = {
  baseCur: 'AED',
  targetCur: 'AED',
  amount: '1.0000',
  conAmount: '1.0000',
  histCur: [{
    base: '1.0000 AED',
    target: '1.0000 AED'}]
}

test('Renders Display', () => {
  render(<Display displayprops={rootState} />);
  expect(screen.getByText('1.0000 AED ='))
  .toBeInTheDocument();
  expect(screen.getByText('1.0000 AED'))
  .toBeInTheDocument();
});

test('Renders Desired Amount', () => {
  render(<Display displayprops={rootState} />);
  expect(screen.getByTitle('Desired Amount'))
  .toBeInTheDocument();
});