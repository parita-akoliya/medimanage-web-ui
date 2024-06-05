import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
interface AdminDashboardProps {
  logoutUser: () => void;
}

interface AdminDashboardState {
}

class AdminDashboard extends Component<AdminDashboardProps, AdminDashboardState> {
  constructor(props: AdminDashboardProps) {
    super(props);
    this.state = {
    };
  }

  handleLogout= () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        Admin Dashboard
        <Button variant="primary" onClick={this.handleLogout} className="login-button">
          Logout
        </Button>

      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
});

export default connect(null, mapDispatchToProps)(AdminDashboard);
