import React, { Component } from 'react';
import { Container, Row, Col, Nav, Tab, Card, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getProfileRequest, updateProfileRequest } from '../../../store/actions/profileActions';
import './ClientProfile.css';

interface ClientProfileState {
  activeTab: string;
  patientDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  appointments: any[];
  isEditingProfile: boolean;
  selectedAppointment: any | null;
  errors: {
    firstName: string;
    email: string;
    lastName: string;
  };
}

interface ClientProfileProps {
  getProfile: () => void;
  updateProfile: (userData: any) => void;
  profileData: any;
}

class ClientProfile extends Component<ClientProfileProps, ClientProfileState> {
  constructor(props: ClientProfileProps) {
    super(props);
    this.state = {
      activeTab: 'details',
      patientDetails: {
        firstName: '',
        lastName: '',
        email: ''
      },
      appointments: [],
      isEditingProfile: false,
      selectedAppointment: null,
      errors: {
        firstName: '',
        email: '',
        lastName: ''
      }
    };
  }

  componentDidMount(): void {
    this.props.getProfile();
  }

  componentDidUpdate(prevProps: ClientProfileProps): void {
    if (prevProps.profileData !== this.props.profileData) {
      console.log("dfvkdfnjkdn");
      
      const { user, details } = this.props.profileData;
      const transformedAppointments = details.map((detail: any) => ({
        id: detail._id,
        description: detail.reason,
        status: detail.status,
        doctorName: detail.doctor_id,
        start_time: detail?.slot_id!==null ? new Date(detail?.slot_id?.start_time).toLocaleTimeString(): "",
        end_time: detail?.slot_id!==null ? new Date(detail?.slot_id?.end_time).toLocaleTimeString():"",
      }));

      this.setState({
        patientDetails: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        appointments: transformedAppointments
      });
    }
  }

  handleTabSelect = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  toggleEditProfile = () => {
    this.setState(prevState => ({ isEditingProfile: !prevState.isEditingProfile }));
  };

  handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      patientDetails: {
        ...this.state.patientDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  validateProfile = () => {
    const errors = {
      firstName: '',
      email: '',
      lastName: ''
    };
    let isValid = true;

    if (!this.state.patientDetails.firstName) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!this.state.patientDetails.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(this.state.patientDetails.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    if (!this.state.patientDetails.lastName) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  saveProfile = () => {
    if (this.validateProfile()) {
      this.props.updateProfile(this.state.patientDetails);
      this.toggleEditProfile();
    }
  };

  selectAppointmentForEdit = (appointment: any) => {
    this.setState({ selectedAppointment: appointment });
  };

  handleAppointmentEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.selectedAppointment) {
      this.setState({
        selectedAppointment: {
          ...this.state.selectedAppointment,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  // saveAppointment = () => {
  //   if (this.state.selectedAppointment) {
  //     this.setState({
  //       appointments: this.state.appointments.map(app =>
  //         app.id === this.state.selectedAppointment?.id
  //           ? this.state.selectedAppointment
  //           : app
  //       ),
  //       selectedAppointment: null
  //     });
  //   }
  // };

  render() {
    const { activeTab, patientDetails, appointments, isEditingProfile, selectedAppointment, errors } = this.state;
    console.log(patientDetails);
    
    return (
      <Container className="client-profile-container">
        <Tab.Container id="left-tabs-example" activeKey={activeTab}>
          <Row className="profile-header">
            <Col sm={12}>
              <Nav variant="tabs" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="details" onClick={() => this.handleTabSelect('details')}>
                    My Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="appointments" onClick={() => this.handleTabSelect('appointments')}>
                    Appointments
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="details">
                  <Container className="profile-container">
                    <div className="profile-header">
                      <h2 className="text-center">My Profile</h2>
                      {/* <Button
                        variant={isEditingProfile ? 'secondary' : 'primary'}
                        className="edit-profile-btn"
                        onClick={this.toggleEditProfile}
                      >
                        {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                      </Button> */}
                      {isEditingProfile && (
                        <Button
                          variant="primary"
                          className="save-profile-btn"
                          onClick={this.saveProfile}
                        >
                          Save Changes
                        </Button>
                      )}
                    </div>
                    <div className="profile-content">
                      <Row>
                        <Col md={4}>
                          <div className="profile-avatar">
                            <div className="profile-avatar-placeholder">
                              <i className="bi bi-person-circle"></i>
                            </div>
                          </div>
                        </Col>
                        <Col md={8}>
                          <Form className="profile-form">
                            <Row>
                              <Col md={6}>
                                <Form.Group controlId="formFirstName">
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={patientDetails.firstName}
                                    onChange={this.handleProfileChange}
                                    isInvalid={!!errors.firstName}
                                    readOnly={!isEditingProfile}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group controlId="formEmail">
                                  <Form.Label>Email</Form.Label>
                                  <Form.Control
                                    type="email"
                                    name="email"
                                    value={patientDetails.email}
                                    onChange={this.handleProfileChange}
                                    isInvalid={!!errors.email}
                                    readOnly={!isEditingProfile}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Form.Group controlId="formLastName">
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={patientDetails.lastName}
                                    onChange={this.handleProfileChange}
                                    isInvalid={!!errors.lastName}
                                    readOnly={!isEditingProfile}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="appointments">
                  <Card className="appointments-card">
                    <Card.Body>
                      <Card.Title>Appointments</Card.Title>
                      {appointments.length === 0 ? (
                        <Card.Text>No appointments scheduled.</Card.Text>
                      ) : (
                        <ul className="appointment-list">
                          {appointments.map(appointment => (
                            <li key={appointment.id}>
                              <strong>{appointment?.start_time}</strong> to {appointment?.end_time} - {appointment.description}
                              {/* <Button variant="link" onClick={() => this.selectAppointmentForEdit(appointment)}>
                                Edit
                              </Button> */}
                              {/* <Button
                                variant="danger"
                                onClick={() => this.cancelAppointment(appointment.id)}
                                className="cancel-appointment-btn"
                              >
                                <XCircle />
                              </Button> */}
                              {selectedAppointment && selectedAppointment.id === appointment.id && (
                                <Form className="appointment-edit-form">
                                  <Form.Group controlId="formAppointmentDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                      type="date"
                                      name="date"
                                      value={selectedAppointment.date}
                                      onChange={this.handleAppointmentEditChange}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="formAppointmentTime">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                      type="time"
                                      name="time"
                                      value={selectedAppointment.time}
                                      onChange={this.handleAppointmentEditChange}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="formAppointmentDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="description"
                                      value={selectedAppointment.description}
                                      onChange={this.handleAppointmentEditChange}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="formAppointmentStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="status"
                                      value={selectedAppointment.status}
                                      onChange={this.handleAppointmentEditChange}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="formAppointmentDoctorName">
                                    <Form.Label>Doctor Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="doctorName"
                                      value={selectedAppointment.doctorName}
                                      onChange={this.handleAppointmentEditChange}
                                    />
                                  </Form.Group>
                                  {/* <Button
                                    variant="primary"
                                    onClick={this.saveAppointment}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => this.setState({ selectedAppointment: null })}
                                  >
                                    Cancel
                                  </Button> */}
                                </Form>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profileData: state.profile.profileData
});

const mapDispatchToProps = (dispatch: any) => ({
  getProfile: () => dispatch(getProfileRequest()),
  updateProfile: (userData: any) => dispatch(updateProfileRequest(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile);
