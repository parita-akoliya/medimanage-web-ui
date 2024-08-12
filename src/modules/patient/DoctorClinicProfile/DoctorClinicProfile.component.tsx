import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorClinicProfile.css';
import doctor1 from '../../../images/doctor1.png';
import { getDoctorRequest } from '../../../store/actions/doctorActions';
import { NavigateFunction, useNavigate, useParams } from 'react-router';
import { availableSlotsRequest, filterSlotsRequest, scheduleAppointmentRequest } from '../../../store/actions/slotActions';

type DoctorClinicProfileProps = {
  slots: any;
  doctor: any | null;
  params: any;
  navigate: NavigateFunction;
  getDoctor: (doctorId: string, onCallSuccess?: Function | void) => void;
  availableSlots: (doctorId: string) => void;
  filterSlots: (date: string | undefined) => void;
  scheduleAppointment: (body: any, onCallSuccess?: Function) => void;
  isAuthenticated: boolean;
};

type DoctorClinicProfileState = {
  startDate: Date | null;
  timeSlot: string;
  symptoms: string;
  showModal: boolean;
  formErrors: {
    date: string;
    timeSlot: string;
    symptoms: string;
  };
};

function withRouter(Component: any) {
  function ComponentWithRouter(props: any) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouter;
}

class DoctorClinicProfile extends Component<DoctorClinicProfileProps, DoctorClinicProfileState> {
  state: DoctorClinicProfileState = {
    startDate: new Date(),
    timeSlot: '',
    symptoms: '',
    showModal: false,
    formErrors: {
      date: '',
      timeSlot: '',
      symptoms: '',
    },
  };

  componentDidMount() {
    
    this.props.getDoctor(this.props.params.id);
    this.props.availableSlots(this.props.params.id);
    this.props.filterSlots(new Date().toISOString());
  }

  validateForm = () => {
    const { startDate, timeSlot, symptoms } = this.state;
    let errors = {
      date: '',
      timeSlot: '',
      symptoms: '',
    };
    let formIsValid = true;

    if (!startDate) {
      errors.date = 'Please select a date for the appointment.';
      formIsValid = false;
    }

    if (!timeSlot) {
      errors.timeSlot = 'Please select a time slot for the appointment.';
      formIsValid = false;
    }

    if (!symptoms.trim()) {
      errors.symptoms = 'Please describe your symptoms.';
      formIsValid = false;
    }

    this.setState({ formErrors: errors });
    return formIsValid;
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleBooking = (type: 'In-Person' | 'Online') => {
    if (!this.props.isAuthenticated) {
      this.setState({ showModal: true });
      return;
    }

    if (this.validateForm()) {
      let { doctor } = this.props;
      if (doctor?.length > 0) {
        doctor = doctor[0];
      }

      const body = {
        doctorId: this.props.params.id,
        slotId: this.state.timeSlot,
        clinicId: doctor.clinic._id,
        reason: this.state.symptoms,
        type: type
      };
      this.props.scheduleAppointment(body, () => {
        this.handleGoBack()
      });
    } else {
      console.error('Form validation failed.');
    }
  };

  handleGoBack = () => {
    window.history.back();
  };

  handleLogin = () => {
    this.setState({ showModal: false });
    this.props.navigate('/auth');
  };

  render() {
    let { doctor, slots } = this.props;
    const { startDate, timeSlot, symptoms, formErrors, showModal } = this.state;

    if (doctor?.length > 0) {
      doctor = doctor[0];
    }

    return (
      <Container className="doctor-profile-container">
        <Row>
          <Col md={4}>
            <Card className="doctor-profile-card">
              <Card.Img variant="top" src={doctor?.image || doctor1} className="doctor-profile-image" />
              <Card.Body>
                <Card.Title>{doctor?.user?.firstName} {doctor?.user?.lastName}</Card.Title>
                <Card.Text>{doctor?.speciality}</Card.Text>
                <Card.Text>
                  <strong>Clinic:</strong> {doctor?.clinic?.name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {doctor?.user.email}
                </Card.Text>
                <Card.Text>
                  <strong>Contact:</strong> {doctor?.user.contact_no}
                </Card.Text>
                <Card.Text>
                  <strong>Location:</strong>{' '}
                  {`${doctor?.user?.address?.street}, ${doctor?.user?.address?.city}, ${doctor?.user?.address?.state}, ${doctor?.user?.address?.country}, ${doctor?.user?.address?.zipcode}`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <h2>Book an Appointment</h2>
            <Form>
              <Form.Group controlId="appointmentDate">
                <Form.Label>Select Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    this.setState({ startDate: date });
                    this.props.filterSlots(date?.toISOString());
                  }}
                  className="form-control"
                  minDate ={new Date()}
                />
                <Form.Text className="text-danger">{formErrors.date}</Form.Text>
              </Form.Group>
              <Form.Group controlId="timeSlot">
                <Form.Label>Select Time Slot</Form.Label>
                <Form.Control
                  as="select"
                  value={timeSlot}
                  onChange={(e) => this.setState({ timeSlot: e.target.value })}
                >
                  <option value="">Select a time slot</option>
                  {slots?.filtered?.length > 0 &&
                    slots.filtered.map((slot: any) => {
                      const startTime = new Date(slot.start_time).toLocaleTimeString();
                      const endTime = new Date(slot.end_time).toLocaleTimeString();
                      return (
                        <option key={slot._id} value={slot._id}>
                          {`${startTime} - ${endTime}`}
                        </option>
                      );
                    })}
                </Form.Control>
                <Form.Text className="text-danger">{formErrors.timeSlot}</Form.Text>
              </Form.Group>
              <Form.Group controlId="symptoms">
                <Form.Label>Describe Your Symptoms</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={symptoms}
                  onChange={(e) => this.setState({ symptoms: e.target.value })}
                />
                <Form.Text className="text-danger">{formErrors.symptoms}</Form.Text>
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="primary" className="w-100" onClick={() => this.handleBooking('In-Person')}>
                    Book In-Person Appointment
                  </Button>
                </Col>
                <Col>
                  <Button variant="primary" className="w-100" onClick={() => this.handleBooking('Online')}>
                    Book Online Appointment
                  </Button>
                </Col>
                <Col>
                  <Button variant="outline-primary" className="w-100" onClick={this.handleGoBack}>
                    Go Back
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to be logged in to book an appointment. Please log in to continue.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  doctor: state.doctors.doctor,
  slots: state.doctors.slots,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch: any) => ({
  getDoctor: (doctorId: string, onCallSuccess?: Function) => dispatch(getDoctorRequest(doctorId, onCallSuccess)),
  availableSlots: (doctorId: string) => dispatch(availableSlotsRequest(doctorId)),
  filterSlots: (date: string | undefined) => dispatch(filterSlotsRequest(date)),
  scheduleAppointment: (body: any, onCallSuccess?: Function) => dispatch(scheduleAppointmentRequest(body, onCallSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorClinicProfile));
