import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import ForgotPassword from './ForgotPassword.component';
import store from '../../../store';

describe('ForgotPassword Component', () => {
  test('renders ForgotPassword component', () => {
    render(<Provider store={store}><ForgotPassword onBackButtonClick={() => {}} /></Provider>);
    const emailInput = screen.getByLabelText('Email Address');
    expect(emailInput).toBeInTheDocument();
  });

  test('back button click triggers callback', () => {
    const mockCallback = jest.fn();
    render(<Provider store={store}><ForgotPassword onBackButtonClick={mockCallback} /></Provider>);
    fireEvent.click(screen.getByText('Back'));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('email input field updates state', () => {
    render(<Provider store={store}><ForgotPassword onBackButtonClick={() => {}} /></Provider>);
    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('form submission triggers callback', () => {
    const mockCallback = jest.fn();
    render(<Provider store={store}><ForgotPassword onBackButtonClick={mockCallback} /></Provider>);
    const emailInput = screen.getByLabelText('Email Address');
    const resetButton = screen.getByText('Reset Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(resetButton);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('renders form with email input and reset password button', () => {
    render(<Provider store={store}><ForgotPassword onBackButtonClick={() => {}} /></Provider>);
    const emailInput = screen.getByLabelText('Email Address');
    const resetButton = screen.getByText('Reset Password');
    expect(emailInput).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test('back button has correct text', () => {
    render(<Provider store={store}><ForgotPassword onBackButtonClick={() => {}} /></Provider>);
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
  });

  test('renders form label', () => {
    render(<Provider store={store}><ForgotPassword onBackButtonClick={() => {}} /></Provider>);
    const formLabel = screen.getByText('Email Address');
    expect(formLabel).toBeInTheDocument();
  });

  test('renders form without error messages', () => {
    render(<Provider store={store}><ForgotPassword onBackButtonClick={() => {}} /></Provider>);
    expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
  });

});
