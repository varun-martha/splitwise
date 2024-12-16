import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { InitialEntry } from '@remix-run/router';
import { MemoryRouter } from 'react-router-dom';

describe('Tests related to the App', () => {
    const renderApp = (initialEntries: InitialEntry[]) => {
        return render(
            <MemoryRouter initialEntries={initialEntries} future={{v7_startTransition:true, v7_relativeSplatPath:true}}>
                <App />
            </MemoryRouter>
        )
    }

    test('should renders the WelcomePage', () => {
        renderApp(['/'])
        const titleElement = screen.getByText(/Welcome to SplitWise Tracker Application/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('should renders the LoginPage', () => {
        renderApp(['/login'])
        const titleElement = screen.getByText(/login!/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('should renders the RegisterPage', () => {
        renderApp(['/register'])
        const titleElement = screen.getByText(/register!/i);
        expect(titleElement).toBeInTheDocument();
    });
    
});
