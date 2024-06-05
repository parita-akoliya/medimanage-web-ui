import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../store/actions/authActions';
import { Form, Button, Container } from 'react-bootstrap';
import './Login.css';

interface LoginProps {
    onSubmit: (email: string, password: string, onCallSuccess?: Function | void, onCallFailure?: Function | void) => void;
    onForgotPasswordClick: () => void;
    loginSuccess?: boolean;
}

interface LoginState {
    email: string;
    password: string;
    errors: {
        email: string;
        password: string;
    };
}

class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '',
            },
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: '',
            },
        } as Pick<LoginState, keyof LoginState>);
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { onSubmit } = this.props;

        let errors = {
            email: '',
            password: '',
        };
        let isValid = true;

        if (!email) {
            errors.email = 'Email is required';
            isValid = false;
        }

        if (!password) {
            errors.password = 'Password is required';
            isValid = false;
        }

        if (isValid) {
            onSubmit(email, password, (success: string) => {
                console.log(success);                
            }, (error: any) => {
                console.log(error);
                
            });
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { email, password, errors } = this.state;
        
        return (
           
            <Container className="login-container">
                 <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handleChange}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.handleChange}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <div className='text-end' >
                        <a href="#" className="forgot-password" onClick={this.props.onForgotPasswordClick}>Forgot Password?</a>
                    </div>
                    <Button variant="primary" type="submit" className="login-button">
                        Login
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    onSubmit: (email: string, password: string, onCallSuccess?: Function | void, onCallFailure?: Function | void) => dispatch(loginUser(email, password, onCallSuccess, onCallFailure)),
});

export default connect(null, mapDispatchToProps)(Login);
