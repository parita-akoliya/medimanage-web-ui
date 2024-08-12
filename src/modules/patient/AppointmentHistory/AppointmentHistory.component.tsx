import React, { Component } from 'react';
import { Table, Card, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAppointmentsRequest } from '../../../store/actions/slotActions';
import { ChevronDown, ChevronUp, InfoCircle, FileText, Heart, Capsule } from 'react-bootstrap-icons';
import './AppointmentHistory.css'; 

interface Appointment {
  slot_id: any;
  doctor_id: any;
  clinic_id: any;
  _id: string;
  reason: string;
  status: string;
  type: string;
  createdAt: string;
  record_id: {
    createdAt: string | number | Date;
    notes: string;
    symptoms: string;
    diagnosisForCustomer: string;
    prescriptions: {
      medication: string;
      dosage: string;
      duration: string;
    }[];
  };
}

interface AppointmentHistoryProps {
  getAppointments: () => void;
  appointments: Appointment[];
}

interface State {
  openAccordion: string | null;
}

class AppointmentHistory extends Component<AppointmentHistoryProps, State> {
  state: State = {
    openAccordion: null
  };

  componentDidMount() {
    this.props.getAppointments();
  }

  toggleAccordion = (id: string, status: string) => {
    if(status === "Attended"){
        this.setState({ openAccordion: this.state.openAccordion === id ? null : id });
    }
  };

  render() {
    const { appointments } = this.props;
    const { openAccordion } = this.state;

    return (
      <Card className="appointment-history-card">
        <Card.Body>
          <h3 className="mb-4">Appointment History</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Clinic</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.map((appointment) => (
                <>
                  <tr key={appointment._id} className="clickable-row" onClick={() => this.toggleAccordion(appointment._id, appointment.status)}>
                    <td>
                        {
                            appointment.status === 'Attended' &&
                            <Button variant="link" className="accordion-toggle">
                            {openAccordion === appointment._id ? <ChevronUp /> : <ChevronDown />}
                          </Button>    
                        }
                    </td>
                    <td>{new Date(appointment?.slot_id?.start_time).toLocaleDateString()}</td>
                    <td>{appointment.doctor_id.user.firstName} {appointment.doctor_id.user.lastName}</td>
                    <td>{appointment?.doctor_id?.speciality}</td>
                    <td>{appointment.clinic_id.name}</td>
                    <td>{appointment.status}</td>
                  </tr>
                  {openAccordion === appointment._id && (
                    <tr>
                      <td colSpan={7}>
                        <div className="accordion-content">
                          <Row className="justify-content-center">
                            <Col md={6} lg={3}>
                              <Card className="accordion-card">
                                <Card.Body>
                                  <div className="icon-wrapper">
                                    <Heart size={32} />
                                  </div>
                                  <Card.Title>Symptoms</Card.Title>
                                  <ul>
                                    {appointment.record_id.symptoms.split('\n').length ? (
                                      appointment.record_id.symptoms.split('\n').map((symptom, index) => (
                                        <li key={index}>{symptom}</li>
                                      ))
                                    ) : (
                                      <li>No symptoms listed</li>
                                    )}
                                  </ul>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col md={6} lg={3}>
                              <Card className="accordion-card">
                                <Card.Body>
                                  <div className="icon-wrapper">
                                    <InfoCircle size={32} />
                                  </div>
                                  <Card.Title>Diagnosis</Card.Title>
                                  <p>{appointment.record_id.diagnosisForCustomer || 'No diagnosis available'}</p>
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col md={6} lg={3}>
                              <Card className="accordion-card">
                                <Card.Body>
                                  <div className="icon-wrapper">
                                    <Capsule size={32} />
                                  </div>
                                  <Card.Title>Prescriptions</Card.Title>
                                  {appointment.record_id.prescriptions.length > 0 ? (
                                    <ul>
                                      {appointment.record_id.prescriptions.map((prescription, index) => (
                                        <li key={index}>
                                          {prescription.medication} - {prescription.dosage} ({prescription.duration})
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p>No prescriptions</p>
                                  )}
                                </Card.Body>
                              </Card>
                            </Col>
                            <Col md={6} lg={3}>
                              <Card className="accordion-card">
                                <Card.Body>
                                  <div className="icon-wrapper">
                                    <FileText size={32} />
                                  </div>
                                  <Card.Title>Notes</Card.Title>
                                  <p>{appointment.record_id.notes || 'No notes available'}</p>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  appointments: state.appointments.appointments,
});

const mapDispatchToProps = {
  getAppointments: getAppointmentsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentHistory);
