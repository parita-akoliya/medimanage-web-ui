import { Component } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
import { Icon } from '@iconify/react';
import './Dashboard.css';
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, BarChart, Bar
} from 'recharts';
import { dashboardRequest } from '../../../store/actions/userActions';

interface DashboardProps {
  page: string;
  logoutUser: () => void;
  fetchDashboard: (onCallSuccess?: Function) => void;
}

interface DashboardState {
  graphData: any;
  counts: {
    totalClinics: Number; totalPatients: Number; totalInPersonAppointments: Number; totalOnlineAppointments: Number;
  };
  clinicUtilizationData: any;
  pieData: any;
  demographicsData: any;
  dailyAppointmentsData: any;
}

class Dashboard extends Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      counts: { totalClinics: 0, totalPatients: 0, totalInPersonAppointments: 0, totalOnlineAppointments: 0 },
      graphData: [
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
      ],
      pieData: [
        { name: 'In-Person', value: 400 },
        { name: 'Online', value: 300 },
      ],
      demographicsData: [
        { name: '0-18', value: 20 },
        { name: '19-35', value: 30 },
        { name: '36-50', value: 25 },
        { name: '51+', value: 25 },
      ],
      clinicUtilizationData: [
        { name: 'Cardiology', value: 150 },
        { name: 'Orthopedics', value: 120 },
        { name: 'Pediatrics', value: 80 },
        { name: 'Dermatology', value: 90 },
      ],
      dailyAppointmentsData: [
        { day: 'Mon', appointments: 20 },
        { day: 'Tue', appointments: 30 },
        { day: 'Wed', appointments: 25 },
        { day: 'Thu', appointments: 18 },
        { day: 'Fri', appointments: 22 },
        { day: 'Sat', appointments: 15 },
        { day: 'Sun', appointments: 10 },
      ]
    };
  }

  COLORS: any = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  handleLogout = () => {
    this.props.logoutUser();
  }

  componentDidMount(): void {
    this.props.fetchDashboard((response: any) => {
      this.setState({
        counts: response.counts,
        clinicUtilizationData: response.clinicUtilizationData,
        dailyAppointmentsData: response.dailyAppointmentsData,
        demographicsData: response.demographicsData,
        pieData: response.pieData,
        graphData: response.graphData
      })
    })
  }

  render() {
    let role = 'admin';
    const { counts, clinicUtilizationData, dailyAppointmentsData, pieData, graphData, demographicsData } = this.state;
    return (
      <Container fluid>
        <Row className="mb-4">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Icon icon="fa-solid:desktop" width="35" height="35" className="mb-2 icon" />
                <Card.Title>Online Appointments</Card.Title>
                <Card.Text>{counts.totalOnlineAppointments.toString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Icon icon="fa-solid:calendar-check" width="35" height="35" className="mb-2 icon" />
                <Card.Title>In-Person Appointments</Card.Title>
                <Card.Text>{counts.totalInPersonAppointments.toString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Icon icon="fa-solid:user" width="35" height="35" className="mb-2 icon" />
                <Card.Title>Total Patients</Card.Title>
                <Card.Text>{counts.totalPatients.toString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center custom-card">
              <Card.Body>
                <Icon icon="fa-solid:user" width="35" height="35" className="mb-2 icon" />
                <Card.Title>Total Clinics</Card.Title>
                <Card.Text>{counts.totalClinics.toString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        <Row className="mb-4">
          <>
            <Col xs={12} md={6}>
              <Card className="chart-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                  <Card.Title className="mt-2">Monthly Appointments</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="chart-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                        {pieData.map((entry: any, index: any) => (
                          <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Card.Title className="mt-2">In-Person vs Online (today)</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </>
        </Row>

        <Row className="mb-4">
          <>
            <Col xs={12} md={6}>
              <Card className="chart-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={clinicUtilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                  <Card.Title className="mt-2">Clinic Utilization</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="chart-card">
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={demographicsData} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                        {demographicsData.map((entry: any, index: any) => (
                          <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Card.Title className="mt-2">Patient Demographics</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </>
        </Row>

        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Card.Title>Daily Appointments Summary</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Appointments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyAppointmentsData.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{item.day}</td>
                        <td>{item.appointments}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
  fetchDashboard: (onCallSuccess?: Function) => dispatch(dashboardRequest(onCallSuccess))
});

export default connect(null, mapDispatchToProps)(Dashboard);
