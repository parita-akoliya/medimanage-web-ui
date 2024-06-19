import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ResetPassword from './ResetPassword.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';

describe('ResetPassword Component', () => {
    test('renders component without crashing with empty props', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ResetPassword />
                </Router>
            </Provider>
        );
    });

    test('should display password and confirm password fields', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ResetPassword />
                </Router>
            </Provider>
        );

        expect(screen.getAllByPlaceholderText(/password/i)[1]).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });

    test('should show error message when password is not provided', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ResetPassword />
                </Router>
            </Provider>
        );

        const resetPasswordButton = screen.getByTestId('reset-password-button');
        fireEvent.click(resetPasswordButton);

        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    test('should show error message when passwords do not match', () => {
        render(
            <Provider store={store}>
                <Router>
                    <ResetPassword />
                </Router>
            </Provider>
        );

        fireEvent.change(screen.getAllByPlaceholderText(/password/i)[0], { target: { value: 'password123' } });
        fireEvent.change(screen.getAllByPlaceholderText(/password/i)[1], { target: { value: 'password456' } });

        const resetPasswordButton = screen.getByTestId('reset-password-button');
        fireEvent.click(resetPasswordButton);

        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
});
