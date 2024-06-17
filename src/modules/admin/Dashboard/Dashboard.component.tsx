import { Component } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
import { Icon } from '@iconify/react';
import './Dashboard.css';
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid
} from 'recharts';

interface DashboardProps {
  page: string;
  logoutUser: () => void;
}

interface DashboardState {
}

class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
    };
  }
  graphData: any = [
    { name: 'Jan', appointments: 40 },
    { name: 'Feb', appointments: 30 },
    { name: 'Mar', appointments: 20 },
    { name: 'Apr', appointments: 27 },
    { name: 'May', appointments: 18 },
    { name: 'Jun', appointments: 23 },
    { name: 'Jul', appointments: 34 },
    { name: 'Aug', appointments: 34 },
    { name: 'Sep', appointments: 45 },
    { name: 'Oct', appointments: 45 },
    { name: 'Nov', appointments: 40 },
    { name: 'Dec', appointments: 50 },
  ];
  pieData: any = [
    { name: 'In-Person', value: 400 },
    { name: 'Online', value: 300 },
  ];
  COLORS: any = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <Container>
        <div className="container-fluid">
          <Row className="mb-4">
            <Col xs={12} sm={6} md={4}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <Icon icon="fa-solid:desktop" width="35" height="35" className="mb-2 icon" />
                  <Card.Title> Online Appointments</Card.Title>
                  <Card.Text>256 (today)</Card.Text>

                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="text-center custom-card">
                <Card.Body>
                  {/* <Icon icon="fa-solid:user" width="24" />  */}
                  <Icon icon="fa-solid:calendar-check" width="35" height="35" className="mb-2 icon" />
                  <Card.Title> In-Person Appointments</Card.Title>
                  <Card.Text>256 (today)</Card.Text>

                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <Icon icon="fa-solid:user" width="35" height="35" className="mb-2 icon" />
                  <Card.Title>Total Patients</Card.Title>
                  <Card.Text>40 </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xs={12} sm={6} md={3}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Icon icon="placeholder-icon" width="50" height="50" className="mb-2" />
                <Card.Title>Current Time</Card.Title>
                <Card.Text>12:20 PM</Card.Text>
              </Card.Body>
            </Card>
          </Col> */}

          </Row>
          {/* charts */}
          <Row className="mb-4">
            <Col xs={12} sm={6} md={6}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={this.graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                  <Card.Title>Monthly Appointments</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={6}>
              <Card className="text-center custom-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={this.pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                        {this.pieData.map((entry: any, index: any) => (
                          <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Card.Title>In-Person vs Online (today)</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col xs={12} sm={6} md={4}>
            <Card className="text-center custom-card">
              <Card.Body>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Card.Title>In-Person vs Online</Card.Title>
              </Card.Body>
            </Card>
          </Col> */}
          </Row>
          {/* table for in person appoinment */}

          <Row>
            <Col xs={12}>
              <Card className="table-custom-card">
                <Card.Header as="h6" className="table-header">In-Person Appointments (Today)</Card.Header>
                <Card.Body>
                  <Table striped hover className="appointment-table">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Email</th>

                        <th>Contact No</th>
                        <th>Time</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>Male</td>
                        <td>john.doe@example.com</td>

                        <td>123-456-7890</td>

                        <td>10:00 AM</td>
                      </tr>
                      <tr>
                        <td>John 2</td>
                        <td>Doe</td>
                        <td>Male</td>
                        <td>john.doe@example.com</td>

                        <td>123-456-7890</td>

                        <td>10:00 AM</td>
                      </tr>
                      <tr>
                        <td>John 1</td>
                        <td>Doe</td>
                        <td>Male</td>
                        <td>john.doe@example.com</td>

                        <td>123-456-7890</td>

                        <td>10:00 AM</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </Table>
                  <div className="text-left">Total:3</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {/* table for online  appoinment */}

          <Row>
            <Col xs={12}>
              <Card className="table-custom-card">
                <Card.Header as="h6" className="table-header">Online Appointments (Today)</Card.Header>
                <Card.Body>
                  <Table striped hover className="appointment-table">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Email</th>

                        <th>Contact No</th>
                        <th>Time</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>Male</td>
                        <td>john.doe@example.com</td>

                        <td>123-456-7890</td>

                        <td>10:00 AM</td>
                      </tr>
                      <tr>
                        <td>John 2</td>
                        <td>Doe</td>
                        <td>Male</td>
                        <td>john.doe@example.com</td>

                        <td>123-456-7890</td>

                        <td>10:00 AM</td>
                      </tr>
                      <tr>
                        <td>John 1</td>
                        <td>Doe</td>
                        <td>Male</td>
                        <td>john.doe@example.com</td>

                        <td>123-456-7890</td>

                        <td>10:00 AM</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </Table>
                  <div className="text-left">Total:3</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
});

export default connect(null, mapDispatchToProps)(Dashboard);
