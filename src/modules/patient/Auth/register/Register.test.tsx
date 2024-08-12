import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RegisterComponent from './Register.component';
import { registerPatient } from '../../../../store/actions/authActions';

const mockStore = configureStore([]);


jest.mock('../../../store/actions/authActions', () => ({
    registerPatient: jest.fn(),
}));

afterEach(() => {
    cleanup();
});

interface RegisterProps {
    registerUser: (data: any) => void;
    handleRegisterClick: () => void;
}

describe('Registration Form', () => {
    test('should display all required fields and a registration button', () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <RegisterComponent handleRegisterClick={jest.fn()} />
            </Provider>
        );

        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText(/password/i)).toHaveLength(2);
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    test('should show error message when passwords do not match', () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <RegisterComponent handleRegisterClick={jest.fn()} />
            </Provider>
        );

        fireEvent.change(screen.getAllByPlaceholderText(/password/i)[0], { target: { value: 'password123' } });
        fireEvent.change(screen.getAllByPlaceholderText(/password/i)[1], { target: { value: 'password456' } });

        const registerButton = screen.getByText(/register/i);
        fireEvent.click(registerButton);

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });

    test('should show error messages for empty required fields', () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <RegisterComponent handleRegisterClick={jest.fn()} />
            </Provider>
        );

        fireEvent.click(screen.getByText(/register/i));

        expect(registerPatient).not.toHaveBeenCalled();
        expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
});

