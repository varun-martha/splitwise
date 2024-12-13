import { MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import { fireEvent, render, screen} from '@testing-library/react'
import WelcomePage from './WelcomePage';
import React from 'react';
import RegisterPage from '../register/RegisterPage';
import LoginPage from '../login/LoginPage';

describe('Tests related to WelcomePage', () => {

    const renderWelcomePage = () => {
        return render(
            <Router future={{v7_startTransition:true, v7_relativeSplatPath:true}} initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<WelcomePage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </Router>
        );
    }

    test("should renders the Welcome Page", () => {
        renderWelcomePage();
        const welcomeText = screen.getByText(/Welcome to SplitWise Tracker Application/i);
        const loginButton = screen.getByRole('button', {name: 'Login'});
        const registerButton = screen.getByRole('button', {name: 'Register'});

        expect(welcomeText).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    test('should navigate to login page when login button is clicked', () => {
        renderWelcomePage();
        const loginButton = screen.getByRole('button', {
            name: 'Login'
        });
        fireEvent.click(loginButton);
        const loginHeading = screen.getByText(/login!/i);
        expect(loginHeading).toBeInTheDocument();
    });

    test('should navigate to register page when register button is clicked', () => {
        renderWelcomePage();
        const registerButton = screen.getByRole('button', {
            name: 'Register'
        });
        fireEvent.click(registerButton);
        const registerHeading = screen.getByText(/Register!/i);
        expect(registerHeading).toBeInTheDocument();
    })
});