// src/modules/admin/PatientAttend/PatientAttend.component.tsx
import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

// Define the Patient interface
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  gender: string;
  dob: string;
}

// Define the props for the class component
interface PatientAttendProps {
  navigate: (to: string) => void;
  params: { id: string };
}

// Define the state for the class component
interface PatientAttendState {
  patient: Patient;
  prescription: string;
  files: FileList | null;
}

// Define the class component
class PatientAttend extends Component<PatientAttendProps, PatientAttendState> {
  constructor(props: PatientAttendProps) {
    super(props);
    this.state = {
      patient: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        gender: '',
        dob: ''
      },
      prescription: '',
      files: null
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    // Fetch patient data based on the appointment id
    // For now, using hardcoded data for demonstration
    const patientData = {
      id: parseInt(id, 10),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      contactNumber: '1234567890',
      gender: 'Male',
      dob: '1990-01-01'
    };
    this.setState({ patient: patientData });
  }

  handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ prescription: e.target.value });
  }

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ files: e.target.files });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  }

  render() {
    const { patient, prescription } = this.state;
    const { navigate } = this.props;

    return (
      <Container className="mt-4">
        <h2>Patient Attend</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={patient.firstName} readOnly />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={patient.lastName} readOnly />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={patient.email} readOnly />
          </Form.Group>
          <Form.Group controlId="formContactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" value={patient.contactNumber} readOnly />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" value={patient.gender} readOnly />
          </Form.Group>
          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" value={patient.dob} readOnly />
          </Form.Group>
          <Form.Group controlId="formPrescription">
            <Form.Label>Prescription</Form.Label>
            <Form.Control as="textarea" rows={3} value={prescription} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>Upload Files</Form.Label>
            <Form.Control type="file" multiple onChange={this.handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

// Higher-order component to inject navigation and params
const withRouter = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const navigate = useNavigate();
    const params = useParams();
    return <WrappedComponent {...props} navigate={navigate} params={params} />;
  };
};

export default withRouter(PatientAttend);
