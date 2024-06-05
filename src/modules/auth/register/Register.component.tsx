import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerPatient } from '../../../store/actions/authActions';
import { Form, Button, Container } from 'react-bootstrap';
import './Register.css';

interface RegisterProps {
  registerUser: (data: any) => void;
  handleRegisterClick: ()=> void;
}

interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  contact_no: string;
  dob: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  password: string;
  confirmPassword: string;
  gender: string;
  errors: {
    [key: string]: string;
  };
}

class RegisterComponent extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      contact_no: '',
      dob: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      password: '',
      confirmPassword: '',
      gender: '',
      errors: {},
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
    } as Pick<RegisterState, keyof RegisterState>);
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,

      password,
      confirmPassword,
    } = this.state;

    let errors = {};
    let isValid = true;

    if (!firstName) {
      errors = { ...errors, firstName: 'First Name is required' };
      isValid = false;
    }

    if (!lastName) {
      errors = { ...errors, lastName: 'Last Name is required' };
      isValid = false;
    }

    if (!email) {
      errors = { ...errors, email: 'Email is required' };
      isValid = false;
    }





    if (!password) {
      errors = { ...errors, password: 'Password is required' };
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors = { ...errors, confirmPassword: 'Passwords do not match' };
      isValid = false;
    }



    if (isValid) {
      const userData = {
        firstName,
        lastName,
        email,

        password

      };
      await this.props.registerUser(userData);
      this.props.handleRegisterClick();
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,

      password,
      confirmPassword,

      errors,
    } = this.state;

    return (
      <Container className="register-container">
        <Form onSubmit={this.handleSubmit} className="register-form">
          <div className="row">
            <div className="col">
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
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
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.handleChange}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>


          <Button variant="primary" type="submit" className="register-button">
            Register
          </Button>
        </Form>
      </Container>
    );
  }
}


export default connect(null, { registerUser: registerPatient })(RegisterComponent);
