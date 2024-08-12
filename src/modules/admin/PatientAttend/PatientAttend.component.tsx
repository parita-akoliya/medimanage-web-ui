import React, { Component } from 'react';
import { Container, Form, Button, Row, Col, Tooltip, OverlayTrigger, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { attendAppointmentRequest, getAppointmentRequest } from '../../../store/actions/slotActions';
import { connect, ConnectedProps } from 'react-redux';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  gender: string;
  dob: string;
}

interface PrescriptionItem {
  medication: string;
  dosage: string;
  duration: string;
}

interface PatientAttendProps extends ConnectedProps<typeof connector> {
  navigate: (to: string) => void;
  params: { id: string };
}

interface PatientAttendState {
  patient: Patient;
  age: string;
  reason: string;
  symptoms: string;
  diagnosisDoctor: string;
  diagnosisCustomer: string;
  notes: string;
  prescriptions: PrescriptionItem[];
  files: FileList | null;
  validationErrors: { [key: string]: string }; 
}

class PatientAttend extends Component<PatientAttendProps, PatientAttendState> {
  constructor(props: PatientAttendProps) {
    super(props);
    this.state = {
      patient: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        gender: '',
        dob: ''
      },
      age: '',
      reason: '',
      symptoms: '',
      diagnosisDoctor: '',
      diagnosisCustomer: '',
      notes: '',
      prescriptions: [{ medication: '', dosage: '', duration: '' }],
      files: null,
      validationErrors: {} 
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.props.getAppointment(id, this.handleAppointmentFetch);
  }

  handleAppointmentFetch = (data: any) => {
    const appointment = data;
    const patient = {
      id: appointment.patient.id,
      firstName: appointment.patient.firstName,
      lastName: appointment.patient.lastName,
      email: appointment.patient.email,
      contactNumber: appointment.patient.contactNumber,
      gender: appointment.patient.gender,
      dob: appointment.patient.dob
    };

    const age = this.calculateAge(patient.dob);

    this.setState({
      patient,
      age,
      reason: appointment.reason,
      diagnosisDoctor: '',
      diagnosisCustomer: '',
      notes: '',
      prescriptions: [{ medication: '', dosage: '', duration: '' }],
      files: null,
      validationErrors: {} 
    });
  }

  calculateAge = (dob: string): string => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return `${years} years ${months} months`;
  }

  handleInputChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<PatientAttendState, keyof PatientAttendState>);
  }

  handlePrescriptionChange = (index: number, e: any) => {
    const prescriptions = [...this.state.prescriptions];
    prescriptions[index] = { ...prescriptions[index], [e.target.name]: e.target.value };
    this.setState({ prescriptions });
  }

  handleAddPrescription = () => {
    this.setState((prevState) => ({
      prescriptions: [...prevState.prescriptions, { medication: '', dosage: '', duration: '' }]
    }));
  }

  handleRemovePrescription = (index: number) => {
    if (this.state.prescriptions.length > 1) {
      this.setState((prevState) => ({
        prescriptions: prevState.prescriptions.filter((_, i) => i !== index)
      }));
    }
  }

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ files: e.target.files });
  }

  validateForm = () => {
    const { diagnosisDoctor } = this.state;
    const validationErrors: { [key: string]: string } = {};

    if (!diagnosisDoctor.trim()) {
      validationErrors.diagnosisDoctor = 'Diagnosis from doctor is mandatory.';
    }

    return validationErrors;
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = this.validateForm();

    if (Object.keys(validationErrors).length > 0) {
      this.setState({ validationErrors });
      return;
    }

    const { reason, diagnosisDoctor, diagnosisCustomer, notes, prescriptions, files, symptoms } = this.state;
    const { id } = this.props.params;

    const appointmentData = {
      appointmentId: id,
      reason,
      diagnosisDoctor,
      diagnosisCustomer,
      notes,
      prescriptions,
      symptoms
    };

    this.props.attendAppointment(appointmentData, () => {
      this.props.navigate('/admin/appointment')
    });
  }

  render() {
    const { patient, age, reason, diagnosisDoctor, diagnosisCustomer, notes, prescriptions, validationErrors } = this.state;

    return (
      <Container className="mt-4">
        <OverlayTrigger placement="right" overlay={<Tooltip>Go back</Tooltip>}>
          <Button variant="link" onClick={() => this.props.navigate('/')} className="mb-3">
            <FaArrowLeft size={24} /> Back
          </Button>
        </OverlayTrigger>
        <h2 className="mb-4">Attend Patient</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={patient.firstName || ''} readOnly className="bg-light" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={patient.lastName || ''} readOnly className="bg-light" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={patient.email || ''} readOnly className="bg-light" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formContactNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={patient.contactNumber || ''} readOnly className="bg-light" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formGender">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" value={patient.gender || ''} readOnly className="bg-light" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="text" value={age || ''} readOnly className="bg-light" />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h4 className="mb-4">Reason</h4>
          <Form.Group controlId="formReason">
            <Form.Label>Reason for Appointment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="reason"
              value={reason || ''}
              onChange={this.handleInputChange}
              readOnly
            />
          </Form.Group>
          <hr />
          <h4 className="mb-4">Diagnosis</h4>
          <Row>
            <Col md={12}>
              <Form.Group controlId="formSymptoms">
                <Form.Label>Symptoms</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="symptoms"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formDiagnosisDoctor">
                <Form.Label>Diagnosis from Doctor</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="diagnosisDoctor"
                  value={diagnosisDoctor || ''}
                  onChange={this.handleInputChange}
                  isInvalid={!!validationErrors.diagnosisDoctor}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.diagnosisDoctor}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDiagnosisCustomer">
                <Form.Label>Diagnosis for Customer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="diagnosisCustomer"
                  value={diagnosisCustomer || ''}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h4 className="mb-4">Prescription</h4>
          {prescriptions.map((prescription, index) => (
            <Row key={index} className="mb-3 align-items-center">
              <Col md={4}>
                <Form.Group controlId={`medicineName-${index}`}>
                  <Form.Label>Medicine Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="medication"
                    value={prescription.medication || ''}
                    onChange={(e) => this.handlePrescriptionChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`dosage-${index}`}>
                  <Form.Label>Dosage</Form.Label>
                  <Form.Control
                    type="text"
                    name="dosage"
                    value={prescription.dosage || ''}
                    onChange={(e) => this.handlePrescriptionChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId={`duration-${index}`}>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    name="duration"
                    value={prescription.duration || ''}
                    onChange={(e) => this.handlePrescriptionChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col md={index > 0 ? 1 : 2}>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Add a new prescription</Tooltip>}
                >
                  <Button variant="link" onClick={() => this.handleAddPrescription()}>
                    <FaPlusCircle size={24} />
                  </Button>
                </OverlayTrigger>
              </Col>
              {
                index > 0 &&
                <Col md={1}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Remove prescription</Tooltip>}
                  >
                    <Button variant="link" onClick={() => this.handleRemovePrescription(index)}>
                      <FaMinusCircle size={24} />
                    </Button>
                  </OverlayTrigger>
                </Col>
              }
            </Row>
          ))}
          <hr />
          <Form.Group controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes || ''}
              onChange={this.handleInputChange}
              name="notes"
            />
          </Form.Group>
          <hr />
          <Button variant="primary" type="submit" className="mt-4">Submit</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getAppointment: (id: string, onCallSuccess?: Function) => dispatch(getAppointmentRequest(id, onCallSuccess)),
  attendAppointment: (appointmentData: any, onCallSuccess?: Function) => dispatch(attendAppointmentRequest(appointmentData, onCallSuccess)),
});

const mapStateToProps = (state: any) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector((props: any) => {
  const navigate = useNavigate();
  const params = useParams();
  return <PatientAttend {...props} navigate={navigate} params={params} />;
});
