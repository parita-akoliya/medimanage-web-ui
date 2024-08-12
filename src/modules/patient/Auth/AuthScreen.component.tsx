import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import './AuthScreen.css';
import { connect } from 'react-redux';
import logo from '../../../images/MEDLogo.png';
import ForgotPasswordComponent from './forgot-password/ForgotPassword.component';
import OtpVerification from './otp/OtpVerification/OtpVerification';
import LoginComponent from './login/Login.component';
import RegisterComponent from './register/Register.component';

interface AuthScreenProps {
  isAuthenticated: boolean;
}

interface AuthScreenState {
  isLogin: boolean;
  showForgotPassword: boolean;
  redirectedThroughBack: boolean;
}

class AuthScreen extends Component<AuthScreenProps, AuthScreenState> {
  constructor(props: AuthScreenProps) {
    super(props);
    this.state = {
      isLogin: true,
      showForgotPassword: false,
      redirectedThroughBack: false,
    };
  }

  handleRegister= () => {
    this.setState({ showForgotPassword: false, isLogin: true, redirectedThroughBack: false });
  }

  handleForgotPasswordClick = () => {
    this.setState({ showForgotPassword: true });
  };

  handleCreateNewClick = () => {
    this.setState({ isLogin: false, showForgotPassword: false });
  };

  handleBackFromForgotPassword = () => {
    this.setState({ showForgotPassword: false, isLogin: true, redirectedThroughBack: true });
  };

  handleVerification = (status: boolean) => {
    
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
            <ForgotPasswordComponent onBackButtonClick={this.handleBackFromForgotPassword} />
          ) : (!redirectedThroughBack && isAuthenticated) ? (
            <OtpVerification onBackButtonClick={this.handleBackFromForgotPassword} />
          ) : (
            <>
              <Card.Header className="auth-card-header text-center">
                <Button
                  variant={isLogin ? 'primary' : 'light'}
                  onClick={() => this.setState({ isLogin: true })}
                  className={`auth-tab-button ${isLogin ? 'active' : ''}`}
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? 'primary' : 'light'}
                  onClick={() => this.setState({ isLogin: false, showForgotPassword: false })}
                  className={`auth-tab-button ${!isLogin ? 'active' : ''}`}
                >
                  Register
                </Button>
              </Card.Header>
              <Card.Body>
                {isLogin ? (
                  <LoginComponent
                    onForgotPasswordClick={this.handleForgotPasswordClick}
                    onCreateNewClick={this.handleCreateNewClick}
                  />
                ) : (
                  <RegisterComponent handleRegisterClick={this.handleRegister}/>
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

export default connect(mapStateToProps)(AuthScreen);
