import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Ribbon', () => {
  render(<App />);
  expect(screen.getByText('Currency Converter Applicaton'))
  .toBeInTheDocument();
});

test('Renders Image Carousel', () => {
  render(<App />);
  expect(screen.getByText('Previous'))
  .toBeInTheDocument();
  expect(screen.getByText('Next'))
  .toBeInTheDocument();
});

test('Renders Conveter Section Card', () => {
  render(<App />);
  expect(screen.getByText('Convert Your Currency Now'))
  .toBeInTheDocument();
  expect(screen.getByText('Base Amount'))
  .toBeInTheDocument();
  expect(screen.getByText('Base Cur.', { exact: true }))
  .toBeInTheDocument();
  expect(screen.getByText('Target Cur.', { exact: true }))
  .toBeInTheDocument();
  expect(screen.getByText('Convert'))
  .toBeInTheDocument();
});

test('Renders History Section Card', () => {
  render(<App />);
  expect(screen.getByText('Used Conversions'))
  .toBeInTheDocument();
  expect(screen.getByText('#'))
  .toBeInTheDocument();
  expect(screen.getByText('Base Currency'))
  .toBeInTheDocument();
  expect(screen.getByText('Target Currency'))
  .toBeInTheDocument();
});

test('Renders Footer Section text', () => {
  render(<App />);
  expect(screen.getByText('Design by:'))
  .toBeInTheDocument();
  expect(screen.getByText('Rajarsi Saha'))
  .toBeInTheDocument();
});