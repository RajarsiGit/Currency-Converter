import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Ribbon', () => {
  render(<App />);
  expect(screen.getByText(/Currency Converter Applicaton/i))
  .toBeInTheDocument();
});

test('Renders Image Carousel', () => {
  render(<App />);
  expect(screen.getByText(/Previous/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Next/i))
  .toBeInTheDocument();
});

test('Renders Conveter Section Card', () => {
  render(<App />);
  expect(screen.getByText(/Convert Your Currency Now/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Target Amount/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Base Amount/i))
  .toBeInTheDocument();
  expect(screen.getAllByText(/Base Currency/i)[0])
  .toBeInTheDocument();
  expect(screen.getAllByText(/Target Currency/i)[0])
  .toBeInTheDocument();
  expect(screen.getAllByText(/Get Conversion/i)[0])
  .toBeInTheDocument();
});

test('Renders History Section Card', () => {
  render(<App />);
  expect(screen.getByText(/Used Conversions/i))
  .toBeInTheDocument();
  expect(screen.getByText(/#/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Base Currency/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Target Currency/i))
  .toBeInTheDocument();
});

test('Renders Footer Section text', () => {
  render(<App />);
  expect(screen.getByText(/Design by:/i))
  .toBeInTheDocument();
  expect(screen.getByText(/Rajarsi Saha/i))
  .toBeInTheDocument();
});