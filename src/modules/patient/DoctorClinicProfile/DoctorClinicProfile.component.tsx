import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorClinicProfile.css';
import doctor1 from '../../../images/doctor1.png';
import { getDoctorRequest } from '../../../store/actions/doctorActions';
import { useNavigate, useParams } from 'react-router';
import { availableSlotsRequest, filterSlotsRequest, scheduleAppointmentRequest } from '../../../store/actions/slotActions';

type DoctorClinicProfileProps = {
  slots: any;
  doctor: any | null;
  params: any;
  getDoctor: (doctorId: string, onCallSuccess?: Function | void) => void;
  availableSlots: (doctorId: string) => void;
  filterSlots: (date: string | undefined) => void;
  scheduleAppointment: (body: any) => void;
};

type DoctorClinicProfileState = {
  startDate: Date | null;
  timeSlot: string;
  symptoms: string;
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
    return <Component {...props} params={params} navigate={navigate}/>
  }
  return ComponentWithRouter
}


class DoctorClinicProfile extends Component<DoctorClinicProfileProps, DoctorClinicProfileState> {
  state: DoctorClinicProfileState = {
    startDate: new Date(),
    timeSlot: '',
    symptoms: '',
    formErrors: {
      date: '',
      timeSlot: '',
      symptoms: '',
    },
  };

  componentDidMount() {
    // Fetch doctor details on component mount
    this.props.getDoctor(this.props.params.id);
    this.props.availableSlots(this.props.params.id);
    this.props.filterSlots(new Date().toISOString())
    console.log(this.state);
    console.log(this.props);
    
    
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

    if (!symptoms) {
      errors.symptoms = 'Please describe your symptoms.';
      formIsValid = false;
    }

    this.setState({ formErrors: errors });
    return formIsValid;
  };

  handleBooking = (type: 'in-person' | 'online') => {
    if (this.validateForm()) {
      console.log('Booking type:', type);
      console.log('Selected date:', this.state.startDate);
      console.log('Selected time slot:', this.state.timeSlot);
      console.log('Symptoms:', this.state.symptoms);
      let { doctor } = this.props
      if(doctor?.length>0){
        doctor = doctor[0]
      }
  
      
      const body = {
        patientId: '669804d29aa1838981554d41',
        doctorId: this.props.params.id,
        slotId: this.state.timeSlot,
        clinicId: doctor.clinic._id,
        reason: this.state.symptoms
      }
      console.log(body);
      
      this.props.scheduleAppointment(body)
    } else {
      console.error('Form validation failed.');
    }
  };

  handleGoBack = () => {
    // Handle navigation back
    window.history.back();
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    
    let { doctor, slots } = this.props;
    const { startDate, timeSlot, symptoms, formErrors } = this.state;
    console.log(doctor);

    if(doctor?.length>0){
      doctor = doctor[0]
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
                <DatePicker selected={startDate} onChange={(date: Date | null) => {this.setState({ startDate: date }); this.props.filterSlots(date?.toISOString())}} className="form-control" />
                <Form.Text className="text-danger">{formErrors.date}</Form.Text>
              </Form.Group>
              <Form.Group controlId="timeSlot">
                <Form.Label>Select Time Slot</Form.Label>
                <Form.Control as="select" value={timeSlot} onChange={(e) => this.setState({ timeSlot: e.target.value })}>
    <option value="">Select a time slot</option>
    {slots?.filtered?.length > 0 &&
      slots.filtered.map((slot: any) => {
        const startTime = new Date(slot.start_time).toLocaleTimeString();
        const endTime = new Date(slot.end_time).toLocaleTimeString();
        return (
          <option key={slot._id} value={slot._id}>{`${startTime} - ${endTime}`}</option>
        );
      })}
  </Form.Control>
                <Form.Text className="text-danger">{formErrors.timeSlot}</Form.Text>
              </Form.Group>
              <Form.Group controlId="symptoms">
                <Form.Label>Describe Your Symptoms</Form.Label>
                <Form.Control as="textarea" rows={3} value={symptoms} onChange={(e) => this.setState({ symptoms: e.target.value })} />
                <Form.Text className="text-danger">{formErrors.symptoms}</Form.Text>
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="primary" className="w-100" onClick={() => this.handleBooking('in-person')}>
                    Book In-Person Appointment
                  </Button>
                </Col>
                {/* <Col>
                  <Button variant="primary" className="w-100" onClick={() => this.handleBooking('online')}>
                    Book Online Appointment
                  </Button>
                </Col> */}
                <Col>
                  <Button variant="outline-primary" className="w-100" onClick={this.handleGoBack}>
                    Go Back
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  doctor: state.doctors.doctor,
  slots: state.doctors.slots
});

const mapDispatchToProps = (dispatch: any) => ({
  getDoctor: (doctorId: string, onCallSuccess?: Function) => dispatch(getDoctorRequest(doctorId, onCallSuccess)),
  availableSlots: (doctorId: string) => dispatch(availableSlotsRequest(doctorId)),
  filterSlots: (date: string | undefined) => dispatch(filterSlotsRequest(date)),
  scheduleAppointment: (body: any) => dispatch(scheduleAppointmentRequest(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorClinicProfile));
