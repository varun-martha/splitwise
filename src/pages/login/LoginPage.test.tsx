import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('Tests related to the LoginPage', () => {

    beforeEach(() => {
        global.fetch = jest.fn()
    });

    const renderLoginPage = () => {
        return render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
    }

    it('should renders login form fields correctly', () => {
        renderLoginPage()
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByText(/Don't you have an account/i)).toBeInTheDocument();
    });

    it('should shows error messages on submitting with empty fields', async () => {
        renderLoginPage()
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(screen.getByText(/please enter a username/i)).toBeInTheDocument();
        });
        expect(screen.getByText(/please enter a password/i)).toBeInTheDocument();
    });

    test('should calls API with correct credentials', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json:jest.fn().mockResolvedValue({
                message: 'Success'
            })
        });
        renderLoginPage();
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5050/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: 'varun', password: '1234' }),
            });
        });
        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    test('should shows an alert that displays incorrect password', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json:jest.fn().mockResolvedValue({
                message: 'Incorrect Password'
            })
        });
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        renderLoginPage();
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5050/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: 'varun', password: '1234' }),
            });
        });
        expect(window.alert).toHaveBeenCalledWith('Incorrect Password');
    });

    test('should shows alert when any network error occurs', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        renderLoginPage()
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(loginButton);
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Error occurred');
        });
    });
});









