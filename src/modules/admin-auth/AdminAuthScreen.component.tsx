import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import LoginComponent from './login/Login.component';
import './AdminAuthScreen.css';
import ForgotPassword from './forgot-password/ForgotPassword.component';
import { connect } from 'react-redux';
import OtpVerification from './otp/OtpVerification/OtpVerification';
import logo from '../../images/MEDLogo.png';

interface AdminAuthScreenProps {
  isAuthenticated: boolean;
}

interface AdminAuthScreenState {
  isLogin: boolean;
  showForgotPassword: boolean;
  redirectedThroughBack: boolean;
}

class AdminAuthScreen extends Component<AdminAuthScreenProps, AdminAuthScreenState> {
  constructor(props: AdminAuthScreenProps) {
    super(props);
    this.state = {
      isLogin: true,
      showForgotPassword: false,
      redirectedThroughBack: false,
    };
  }

  handleForgotPasswordClick = () => {
    this.setState({ showForgotPassword: true });
  };

  handleBackFromForgotPassword = () => {
    this.setState({ showForgotPassword: false, isLogin: true, redirectedThroughBack: true });
  };

  handleVerification = (status: boolean) => {
    console.log("handleVerification: ", status);
  }

  render() {
    const { isAuthenticated } = this.props;
    const { isLogin, showForgotPassword, redirectedThroughBack } = this.state;
    
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="auth-card shadow-lg">
          <div className="logo-container text-center mb-4">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          {showForgotPassword ? (
            <ForgotPassword onBackButtonClick={this.handleBackFromForgotPassword} />
          ) : (!redirectedThroughBack && isAuthenticated) ? (
            <OtpVerification onBackButtonClick={this.handleBackFromForgotPassword} />
          ) : (
            <>
              <Card.Header className="auth-card-header text-center">
              <h5>Login</h5>
              </Card.Header>
              <Card.Body>
                {isLogin && (
                  <LoginComponent
                    onForgotPasswordClick={this.handleForgotPasswordClick}
                  />
                )}
              </Card.Body>
            </>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state?.auth?.isAuthenticated,
});

export default connect(mapStateToProps)(AdminAuthScreen);
