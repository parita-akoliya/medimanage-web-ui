import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import './ResetPassword.css';
import { connect } from 'react-redux';
import logo from '../../../images/MEDLogo.png';
import { resetPasswordRequest } from '../../../store/actions/authActions';
import { NavigateFunction, useNavigate, useParams } from 'react-router';

interface ResetPasswordProps {
  resetPassword: (token: string, newPassword: string) => void;
  params: any;
  navigate: NavigateFunction;
}

interface ResetPasswordState {
  password: string;
  confirmPassword: string;
  errors: {
    [key: string]: string;
  };
}

function withRouter(Component: any) {
    function ComponentWithRouter(props: any) {
      let params = useParams();
      let navigate = useNavigate();
      return <Component {...props} params={params} navigate={navigate}/>
    }
    return ComponentWithRouter
  }

class ResetPassword extends Component<ResetPasswordProps, ResetPasswordState> {
  constructor(props: ResetPasswordProps) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
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
    } as Pick<ResetPasswordState, keyof ResetPasswordState>);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      password,
      confirmPassword,
    } = this.state;

    let errors = {};
    let isValid = true;

    if (!password) {
      errors = { ...errors, password: 'Password is required' };
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors = { ...errors, confirmPassword: 'Passwords do not match' };
      isValid = false;
    }

    if (isValid) {
      console.log("vvvvv");
      
      this.props.resetPassword(this.props.params.id, password);
      this.props.navigate('/auth');
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { password, confirmPassword, errors } = this.state;

    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="auth-card shadow-lg">
          <div className="logo-container text-center mb-4">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <Card.Header className="auth-card-header d-flex align-items-center justify-content-between">
            <h5>Reset Password</h5>
            <div></div>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
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
              <Button variant="primary" type="submit" className='forgot-password-button' data-testid="reset-password-button">
                Reset Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  resetPassword: (token: string, newPassword: string) => dispatch(resetPasswordRequest(token, newPassword)),
});


export default connect(null, mapDispatchToProps)(withRouter(ResetPassword));
