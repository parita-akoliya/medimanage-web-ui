import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login.component';
import { Provider } from 'react-redux';
import store from '../../../store';

test('renders admin login form', () => {
    const onForgotPasswordClickMock = jest.fn();
    const onCreateNewClickMock = jest.fn();
    render(
        <Provider store={store}>
            <Login onForgotPasswordClick={onForgotPasswordClickMock} /></Provider>);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const forgotPasswordLink = screen.getByText(/forgot password\?/i);
    expect(forgotPasswordLink).toBeInTheDocument();

    const loginButton = screen.getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
});

test('displays error message for empty email field', () => {
    render(
        <Provider store={store}>
            <Login onForgotPasswordClick={() => { }} />
        </Provider>
    );

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    const emailError = screen.getByText(/email is required/i);
    expect(emailError).toBeInTheDocument();
});

test('displays error message for empty password field', () => {
    render(
        <Provider store={store}>
            <Login onForgotPasswordClick={() => { }} />
        </Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    const passwordError = screen.getByText(/password is required/i);
    expect(passwordError).toBeInTheDocument();
});

test('displays error message for invalid email format', () => {
    render(
        <Provider store={store}>
            <Login onForgotPasswordClick={() => { }} />
        </Provider>
    );


    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    const emailError = screen.getByText(/email is required/i);
    expect(emailError).toBeInTheDocument();
});
