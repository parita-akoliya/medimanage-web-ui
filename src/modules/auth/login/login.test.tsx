import React from 'react';
import renderer from 'react-test-renderer';
import LoginComponent from './Login.component';

interface LoginProps {
    onSubmit: (email: string, password: string) => void;
    onForgotPasswordClick: () => void;
    onCreateNewClick: () => void;
    loginSuccess?: boolean;
}

describe('Login page', () => {
    let onSubmitSpy: jest.Mock;
    let onForgotPasswordClickSpy: jest.Mock;
    let onCreateNewClickSpy: jest.Mock;
    let component: renderer.ReactTestRenderer;

    beforeEach(() => {
        onSubmitSpy = jest.fn();
        onForgotPasswordClickSpy = jest.fn();
        onCreateNewClickSpy = jest.fn();
        component = renderer.create(
            <LoginComponent
                onForgotPasswordClick={onForgotPasswordClickSpy}
                onCreateNewClick={onCreateNewClickSpy}
            />
        );
    });

    it('renders the login form', () => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders email and password fields in the login form', () => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('submits the login form with valid data', () => {
        const instance = component.root;

        const emailInput = instance.findByProps({ name: 'email' });
        emailInput.props.onChange({ target: { name: 'email', value: 'test@example.com' } });

        const passwordInput = instance.findByProps({ name: 'password' });
        passwordInput.props.onChange({ target: { name: 'password', value: 'password' } });

        const form = instance.findByType('form');
        form.props.onSubmit({ preventDefault: jest.fn() });

        expect(onSubmitSpy).toHaveBeenCalledWith('test@example.com', 'password');
    });

    it('displays error message if email is invalid', () => {
        const instance = component.root;

        const emailInput = instance.findByProps({ name: 'email' });
        emailInput.props.onChange({ target: { name: 'email', value: '' } });

        const form = instance.findByType('form');
        form.props.onSubmit({ preventDefault: jest.fn() });

        const invalidFeedback = instance.findByProps({ className: 'invalid-feedback' });
        expect(invalidFeedback.children).toEqual(['Email is required']);
    });

    it('displays error message if password is too short', () => {
        const instance = component.root;

        const passwordInput = instance.findByProps({ name: 'password' });
        passwordInput.props.onChange({ target: { name: 'password', value: '' } });

        const form = instance.findByType('form');
        form.props.onSubmit({ preventDefault: jest.fn() });

        const invalidFeedback = instance.findAllByProps({ className: 'invalid-feedback' })[1];
        expect(invalidFeedback.children).toEqual(['Password is required']);
    });

    it('calls onForgotPasswordClick when the forgot password link is clicked', () => {
        const instance = component.root;

        const forgotPasswordLink = instance.findByProps({ className: 'forgot-password' });
        forgotPasswordLink.props.onClick();

        expect(onForgotPasswordClickSpy).toHaveBeenCalled();
    });

    it('calls onCreateNewClick when the create new account button is clicked', () => {
        const instance = component.root;

        const createAccountButton = instance.findByProps({ className: 'create-account-button' });
        createAccountButton.props.onClick();

        expect(onCreateNewClickSpy).toHaveBeenCalled();
    });
});
