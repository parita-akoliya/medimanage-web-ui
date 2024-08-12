import React, { Component } from 'react';
import { Container, Form, Table, Button, Row, Col, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { getAppointmentRequest, getAppointmentsRequest, updateAppointmentRequest } from '../../../store/actions/slotActions';
import { NavigateFunction, useNavigate, useParams } from 'react-router';
import { connect } from 'react-redux';
import { XCircle, Eye, CalendarCheck } from 'react-bootstrap-icons';

interface Patient {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
  }
}

interface Appointment {
  createdDate: any;
  _id: string;
  patient_id: Patient | null;
  reason: string;
  status?: string;
  slot_id: {
    date: string | undefined | number | any;
    start_time: string | undefined | any;
    end_time: string;
  } | null;
  clinic_id: {
    name: string;
  };
}

interface AppointmentListProps {
  navigate: NavigateFunction;
  getAppointments: (onCallSuccess?: Function | void) => void;
  updateAppointments: (appointmentId: string, status: string, onCallSuccess?: Function | void) => void;
  appointments: Appointment[];
}

interface AppointmentListState {
  searchTerm: string;
  filterOption: 'all' | 'today';
  appointments: Appointment[];
  showModal: boolean;
  selectedAppointment: Appointment | null;
}

function withRouter(Component: any) {
  function ComponentWithRouter(props: any) {
    let params = useParams();
    let navigate = useNavigate();
    return <Component {...props} params={params} navigate={navigate} />;
  }
  return ComponentWithRouter;
}

class AppointmentList extends Component<AppointmentListProps, AppointmentListState> {
  constructor(props: AppointmentListProps) {
    super(props);
    this.state = {
      searchTerm: '',
      filterOption: 'all',
      appointments: [],
      showModal: false,
      selectedAppointment: null
    };
  }

  componentDidMount(): void {
    this.props.getAppointments();
  }

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleAttend = (appointmentId: string) => {
    this.props.navigate(`/admin/patient-attend/${appointmentId}`);
  };


  handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterOption: e.target.value as 'all' | 'today' });
  };

  handleView = (appointment: Appointment) => {
    this.setState({ selectedAppointment: appointment, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedAppointment: null });
  };

  handleReject = (appointmentId: string) => {
    this.props.updateAppointments(appointmentId, 'Rejected', () => {
      this.props.getAppointments()
    })
    if (this.state.showModal) {
      this.handleCloseModal();
    }
  };

  renderTooltip(text: string) {
    return <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>;
  }

  render() {
    const { searchTerm, filterOption, showModal, selectedAppointment } = this.state;
    const { appointments } = this.props;
    const filteredAppointments = appointments?.filter(appointment => {
      const patientInfo = appointment.patient_id
        ? `${appointment.patient_id.user.firstName} ${appointment.patient_id.user.lastName}`
        : '';
      const isMatch = patientInfo.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterOption === 'today') {
        const today = new Date();
        return isMatch && new Date(appointment.slot_id?.start_time || '').toLocaleDateString() === today.toLocaleDateString();
      }
      return isMatch;
    });
    return (
      <Container className="mt-4">
        <h2>Appointment List</h2>
        <Form className="mb-4">
          <Row>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Search by patient name"
                value={searchTerm}
                onChange={this.handleSearchChange}
              />
            </Col>
            <Col md={4}>
              <Form.Select value={filterOption} onChange={this.handleFilterChange}>
                <option value="all">All</option>
                <option value="today">Today</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Appointment Date</th>
            <th>First Name</th>
              <th>Last Name</th>
              <th>Reason</th>
              <th>Slot Start Time</th>
              <th>Slot End Time</th>
              <th>Clinic Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{new Date(appointment?.slot_id?.start_time).toLocaleDateString() || 'N/A'}</td>
                <td>{appointment.patient_id?.user.firstName || 'N/A'}</td>
                <td>{appointment.patient_id?.user.lastName || 'N/A'}</td>
                <td>{appointment.reason}</td>
                <td>{new Date(appointment.slot_id?.start_time || '').toLocaleTimeString()}</td>
                <td>{new Date(appointment.slot_id?.end_time || '').toLocaleTimeString()}</td>
                <td>{appointment.clinic_id.name}</td>
                <td>{appointment.status}</td>
                <td>
                  {(appointment.status !== "Rejected" && appointment.status !== "Not Available" && appointment.status === 'Scheduled') &&
                    <OverlayTrigger
                      placement="top"
                      overlay={this.renderTooltip('Reject')}
                    >
                      <Button variant="link" onClick={() => this.handleReject(appointment._id)}>
                        <XCircle />
                      </Button>
                    </OverlayTrigger>
                  }
                  <OverlayTrigger
                    placement="top"
                    overlay={this.renderTooltip('View')}
                  >
                    <Button variant="link" onClick={() => this.handleView(appointment)}>
                      <Eye />
                    </Button>
                  </OverlayTrigger>
                  {
                    (appointment.status === 'Scheduled' || appointment.status === 'Not Attended') &&
                    <OverlayTrigger
                      placement="top"
                      overlay={this.renderTooltip('Attend')}
                    >
                      <Button variant="link" onClick={() => this.handleAttend(appointment._id)}>
                        <CalendarCheck />
                      </Button>
                    </OverlayTrigger>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {selectedAppointment && (
          <Modal show={showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Appointment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>First Name:</strong> {selectedAppointment.patient_id?.user.firstName || 'N/A'}</p>
              <p><strong>Last Name:</strong> {selectedAppointment.patient_id?.user.lastName || 'N/A'}</p>
              <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
              <p><strong>Slot Start Time:</strong> {new Date(selectedAppointment.slot_id?.start_time || '').toLocaleTimeString()}</p>
              <p><strong>Slot End Time:</strong> {new Date(selectedAppointment.slot_id?.end_time || '').toLocaleTimeString()}</p>
              <p><strong>Clinic Name:</strong> {selectedAppointment.clinic_id.name}</p>
            </Modal.Body>
            <Modal.Footer>
              {(selectedAppointment.status !== "Rejected" && selectedAppointment.status !== "Not Available" && selectedAppointment.status === "Scheduled") &&
                <>
                  <Button variant="secondary" onClick={this.handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={() => this.handleReject(selectedAppointment._id)}>
                    Reject
                  </Button>
                </>
              }
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  appointments: state?.appointments?.appointments,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAppointments: (onCallSuccess?: Function) => dispatch(getAppointmentsRequest(onCallSuccess)),
  updateAppointments: (appointmentId: string, status: string, onCallSuccess?: Function) => dispatch(updateAppointmentRequest(appointmentId, status, onCallSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppointmentList));
