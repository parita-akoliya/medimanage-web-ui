import React, { Component } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import './OtpVerification.css';
import OtpInput from '../OtpInput/OtpInput';
import { verifyOTP } from '../../../../../store/actions/authActions';
import { connect } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RoleTypes } from '../../../../../store/types/RoleTypes';

interface OtpVerificationProps {
  onBackButtonClick: () => void;
  verifyOtp: (email: string, otp: string, onCallSuccess: Function, onCallFailure: Function) => void;
  email: string;
  navigate: NavigateFunction;
  token: string;
  role: string;
}

interface OtpVerificationState {
  otp: string;
  errorMessage: string;
}

class OtpVerification extends Component<OtpVerificationProps, OtpVerificationState> {
  constructor(props: OtpVerificationProps) {
    super(props);
    this.state = {
      otp: '',
      errorMessage: '',
    };
  }

  handleChange = (otp: string) => {
    this.setState({ otp, errorMessage: '' });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.otp.trim() === '') {
      this.setState({ errorMessage: 'Please enter the OTP' });
      return;
    }
    this.handleVerification();
  };

  getNavigationLink(role: string) {
    let link = '';
    switch (role) {
      case RoleTypes.ADMIN:
        link = `/admin/dashboard`;
        break;
      case RoleTypes.PATIENT:
        link = `/client/home`;
        break;
      case RoleTypes.DOCTOR:
        link = `/admin/dashboard`;
        break;
      case RoleTypes.FRONTDESK:
        link = `/admin/dashboard`;
        break;
      default:
        break;
    }
    return link;
  }

  handleVerification = () => {
    const { otp } = this.state;
    const { email } = this.props;
    const onSuccess = (role: string) => {
      const navigationLink = this.getNavigationLink(role);
      this.props.navigate(navigationLink);
    };
    const onFailure = () => {
      this.setState({ errorMessage: 'OTP verification failed' });
    };
    this.props.verifyOtp(email, otp, onSuccess, onFailure);
  };

  render() {
    const { onBackButtonClick, token, role } = this.props;
    const { errorMessage } = this.state;
    if (token?.length > 0 && role?.length > 0) {
      const navigationLink = this.getNavigationLink(role);
      this.props.navigate(navigationLink);
    }
    return (
      <>
        <Card.Header className="auth-card-header d-flex align-items-center justify-content-between">
          <Button variant={'link'} onClick={onBackButtonClick} className="back-button">
            <FaArrowLeft /> Back
          </Button>
          <h5>Verify OTP</h5>
          <div></div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <OtpInput length={6} onComplete={this.handleChange} />
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Button variant="primary" type="submit" className="forgot-password-button">
              Verify OTP
            </Button>
          </Form>
        </Card.Body>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  email: state?.auth?.email,
  token: state?.auth?.token,
  role: state?.auth?.role,
});

const mapDispatchToProps = (dispatch: any) => ({
  verifyOtp: (email: string, otp: string, onCallSuccess: Function, onCallFailure: Function) =>
    dispatch(verifyOTP(email, otp, onCallSuccess, onCallFailure)),
});

function addHookTo(Component: any) {
  function CompWithHook(props: any) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return CompWithHook;
}

export default addHookTo(connect(mapStateToProps, mapDispatchToProps)(OtpVerification));
