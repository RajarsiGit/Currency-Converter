import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Renders Footer Section text', () => {
  render(<Footer />);
  expect(screen.getByText(/Design by:/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Rajarsi Saha/i))
  .toBeInTheDocument();
});