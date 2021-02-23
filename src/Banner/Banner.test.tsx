import { render, screen } from '@testing-library/react';
import Banner from './Banner';

test('Renders Image Carousel', () => {
    render(<Banner />);
    expect(screen.getByText('Previous'))
    .toBeInTheDocument();
    expect(screen.getByText('Next'))
    .toBeInTheDocument();
});