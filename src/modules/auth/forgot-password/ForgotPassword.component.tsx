import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import './ForgotPassword.css';
import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../../../store/actions/authActions';

interface ForgotPasswordProps {
  onBackButtonClick: () => void;
  forgotPasswordRequest: (email: string) => void;
}

interface ForgotPasswordState {
  email: string;
}

class ForgotPassword extends Component<ForgotPasswordProps, ForgotPasswordState> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    } as Pick<ForgotPasswordState, keyof ForgotPasswordState>);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.props.forgotPasswordRequest(this.state.email);
    this.props.onBackButtonClick();
  };

  render() {
    const { email } = this.state;

    return (
      <>
        <Card.Header className="auth-card-header d-flex align-items-center justify-content-between">
          <Button
            variant={'link'}
            onClick={this.props.onBackButtonClick}
            className="back-button"
          >
            <FaArrowLeft /> Back
          </Button>
          <h5>Forgot Password</h5>
          <div></div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className='forgot-password-button'>
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  forgotPasswordRequest: (email: string) => dispatch(forgotPasswordRequest(email)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
