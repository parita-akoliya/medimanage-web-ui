import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
interface DoctorDashboardProps {
  logoutUser: () => void;
}

interface DoctorDashboardState {
}

class DoctorDashboard extends Component<DoctorDashboardProps, DoctorDashboardState> {
  constructor(props: DoctorDashboardProps) {
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
        Doctor Dashboard
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

export default connect(null, mapDispatchToProps)(DoctorDashboard);
