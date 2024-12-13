import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


describe('Tests related to the LoginPage', () => {

    beforeEach(() => {
        global.fetch = jest.fn()
    });

    const renderRegisterPage = () => {
        return render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );
    }

    it('should renders register form fields correctly', () => {
        renderRegisterPage()
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
    });

    it('should shows error messages on submitting with empty fields', async () => {
        renderRegisterPage()
        const registerButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(screen.getByText(/please enter name/i)).toBeInTheDocument();
        });
        expect(screen.getByText(/please enter password/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter email/i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter phone number/i)).toBeInTheDocument();
    });

    test('should calls API upon clicking register with all fields', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json:jest.fn().mockResolvedValue({
                message: 'Success'
            })
        });
        renderRegisterPage();
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        fireEvent.change(screen.getByLabelText(/mail/i), { target: { value: 'varun@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '1234567890' } });
        const registerButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5050/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: 'varun', password: '1234', email: 'varun@gmail.com', mobileNumber: '1234567890' }),
            });
        });
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('should shows an alert if registration fails', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json:jest.fn().mockResolvedValue({
                message: 'Username alredy taken'
            })
        });
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        renderRegisterPage();
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        fireEvent.change(screen.getByLabelText(/mail/i), { target: { value: 'varun@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '1234567890' } });
        const registerButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://localhost:5050/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: 'varun', password: '1234', email: 'varun@gmail.com', mobileNumber: '1234567890' }),
            });
        });
        expect(window.alert).toHaveBeenCalledWith('Username alredy taken');
    });

    test('should shows alert when any network error occurs', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        renderRegisterPage()
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'varun' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '1234' } });
        fireEvent.change(screen.getByLabelText(/mail/i), { target: { value: 'varun@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/mobile/i), { target: { value: '1234567890' } });
        const registerButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(registerButton);
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Network Error');
        });
    });
});
