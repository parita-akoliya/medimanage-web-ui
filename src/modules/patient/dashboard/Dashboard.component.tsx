import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
import './Dashboard.css';
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
        {/* //dashboard */}
          <Card className="custom-card" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderTop: '5px solid #5e5cc7' }}>
      <Card.Body>
      <Card.Text className="text-muted mb-2"><h3>Appointment Booking Info</h3></Card.Text>
       
        <Card.Title>ABC ANAN</Card.Title>
        <Card.Text>1231221111</Card.Text>
        <Card.Text>12@gmail.com</Card.Text>
        <Card.Text>Date: 12/12/2024</Card.Text>
        <Card.Text>Time: 2:00 PM</Card.Text>
        <Card.Text>Status: Accepted</Card.Text>
        {/* {status === 'cancelled' && <Card.Text>Reason: {reason}</Card.Text>} */}
      </Card.Body>
    </Card>
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
