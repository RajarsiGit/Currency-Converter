import { render, screen } from '@testing-library/react';
import Ribbon from './Ribbon';

test('Renders Ribbon', () => {
  render(<Ribbon />);
  expect(screen.getByText(/Currency Converter Applicaton/i))
  .toBeInTheDocument();
});
