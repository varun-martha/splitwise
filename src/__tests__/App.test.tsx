import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';

test('renders learn react link', () => {
    render(<App />);
    const element = screen.getByText(/Welcome to splitwise web app/i);
    expect(element).toBeInTheDocument();
});
