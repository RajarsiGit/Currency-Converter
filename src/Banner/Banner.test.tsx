import { render, screen } from '@testing-library/react';
import Banner from './Banner';

test('Renders Image Carousel', () => {
    render(<Banner />);
    expect(screen.getByText(/Previous/i))
    .toBeInTheDocument();
    expect(screen.getByText(/Next/i))
    .toBeInTheDocument();
});