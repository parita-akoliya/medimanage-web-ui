import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
interface ClientDashboardProps {
  logoutUser: () => void;
}

interface ClientDashboardState {
}

class ClientDashboard extends Component<ClientDashboardProps, ClientDashboardState> {
  constructor(props: ClientDashboardProps) {
    super(props);
    this.state = {
    };
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        Client Dashboard
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

export default connect(null, mapDispatchToProps)(ClientDashboard);
