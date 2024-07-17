// src/components/AppointmentList.tsx
import React, { Component } from 'react';
import { Container, Form, Table, Button, Row, Col } from 'react-bootstrap';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  status: string;
  instanceNumber: string;
}

interface Appointment {
  id: number;
  patient: Patient;
  date: Date;
  time: string;
}

interface AppointmentListState {
  searchTerm: string;
  filterOption: 'all' | 'today';
  appointments: Appointment[];
}

class AppointmentList extends Component<{}, AppointmentListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      filterOption: 'all',
      appointments: [
        {
          id: 1,
          patient: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            contactNumber: '1234567890',
            status: 'Scheduled',
            instanceNumber: 'INST123'
          },
          date: new Date(),
          time: '10:00 AM'
        },
        {
          id: 2,
          patient: {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            contactNumber: '0987654321',
            status: 'Completed',
            instanceNumber: 'INST124'
          },
          date: new Date(),
          time: '11:00 AM'
        }
      ] // Added sample appointments
    };
  }

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  }

  handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterOption: e.target.value as 'all' | 'today' });
  }

  handleCancel = (appointmentId: number) => {
    // Handle cancellation logic
  }

  handleView = (appointmentId: number) => {
    // Handle view details logic
  }

  render() {
    const { searchTerm, filterOption, appointments } = this.state;

    const filteredAppointments = appointments.filter(appointment => {
      // Filter based on search term and filter option
      const patientInfo = `${appointment.patient.firstName} ${appointment.patient.lastName} ${appointment.patient.email} ${appointment.patient.contactNumber}`;
      const isMatch = patientInfo.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterOption === 'today') {
        const today = new Date();
        return isMatch && appointment.date.toLocaleDateString() === today.toLocaleDateString();
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
                placeholder="Search by name, email, or contact number"
                value={searchTerm}
                onChange={this.handleSearchChange}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterOption}
                onChange={this.handleFilterChange}
              >
                <option value="all">All</option>
                <option value="today">Today</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Instance Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.patient.firstName}</td>
                <td>{appointment.patient.lastName}</td>
                <td>{appointment.patient.email}</td>
                <td>{appointment.patient.contactNumber}</td>
                <td>{appointment.date.toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patient.instanceNumber}</td>
                <td>{appointment.patient.status}</td>
                <td>
                  <Button variant="danger" onClick={() => this.handleCancel(appointment.id)}>
                    Cancel
                  </Button>{' '}
                  <Button variant="primary" onClick={() => this.handleView(appointment.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}


export default AppointmentList;
