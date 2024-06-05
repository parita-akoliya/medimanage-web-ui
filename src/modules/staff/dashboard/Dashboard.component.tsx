import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
interface StaffDashboardProps {
  logoutUser: () => void;
}

interface StaffDashboardState {
}

class StaffDashboard extends Component<StaffDashboardProps, StaffDashboardState> {
  constructor(props: StaffDashboardProps) {
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
        Staff Dashboard
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

export default connect(null, mapDispatchToProps)(StaffDashboard);
