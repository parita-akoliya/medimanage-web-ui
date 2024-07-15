import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorClinicProfile.css';
import doctor1 from '../../../images/doctor1.png';


type Doctor = {
  id: number;
  image: string;
  name: string;
  speciality: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  clinic: string;
  email:string;
  contact:string;
};

const doctor: Doctor = {
  id: 1,
  image: doctor1, // Replace with actual image path
  name: 'Dr. John Doe',
  speciality: 'Cardiologist',
  street: '123 Main St',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  zipcode: '10001',
  clinic: 'New York Heart Clinic',
  email:"john@gmail.com",
  contact:"+1 222 323 2322"
};

const DoctorClinicProfile: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    date: '',
    timeSlot: '',
    symptoms: '',
  });
  const validateForm = () => {
    let errors: { [key: string]: string } = {};
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

    setFormErrors(errors);
    return formIsValid;
  };

  const handleBooking = (type: 'in-person' | 'online') => {
    if (validateForm()) {
        console.log('Booking type:', type);
        console.log('Selected date:', startDate);
        console.log('Selected time slot:', timeSlot);
        console.log('Symptoms:', symptoms);
        // Implement booking logic here
      } else {
        console.error('Form validation failed.');
      }
    };

    const handleGoBack = () => {
        
        navigate(-1); 
      };

  return (
    <Container className="doctor-profile-container">
    <Row>
      <Col md={4}>
        <Card className="doctor-profile-card">
          <Card.Img variant="top" src={doctor.image} className="doctor-profile-image" />
          <Card.Body>
            <Card.Title>{doctor.name}</Card.Title>
            <Card.Text>{doctor.speciality}</Card.Text>
            <Card.Text><strong>Clinic:</strong> {doctor.clinic}</Card.Text>
            <Card.Text><strong>Email:</strong> {doctor.email}</Card.Text>
            <Card.Text><strong>Contact:</strong> {doctor.contact}</Card.Text>
            <Card.Text>
              <strong>Location:</strong> {`${doctor.street}, ${doctor.city}, ${doctor.state}, ${doctor.country}, ${doctor.zipcode}`}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={8}>
        <h2>Book an Appointment</h2>
        <Form>
          <Form.Group controlId="appointmentDate">
            <Form.Label>Select Date</Form.Label>
            <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)} className="form-control" />
            <Form.Text className="text-danger">{formErrors.date}</Form.Text>
          </Form.Group>
          <Form.Group controlId="timeSlot">
            <Form.Label>Select Time Slot</Form.Label>
            <Form.Control as="select" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
              <option value="">Select a time slot</option>
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="01:00 PM">01:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:00 PM">04:00 PM</option>
            </Form.Control>
            <Form.Text className="text-danger">{formErrors.timeSlot}</Form.Text>
          </Form.Group>
          <Form.Group controlId="symptoms">
            <Form.Label>Describe Your Symptoms</Form.Label>
            <Form.Control as="textarea" rows={3} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
            <Form.Text className="text-danger">{formErrors.symptoms}</Form.Text>
          </Form.Group>
          <Row>
            <Col>
              <Button variant="primary" className="w-100" onClick={() => handleBooking('in-person')}>Book In-Person Appointment</Button>
            </Col>
            <Col>
              <Button variant="primary" className="w-100" onClick={() => handleBooking('online')}>Book Online Appointment</Button>
            </Col>
            <Col>
                <Button variant="outline-primary" className="w-100" onClick={handleGoBack}>Go Back</Button>
              </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default DoctorClinicProfile;
