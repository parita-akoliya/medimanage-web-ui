import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicManagement.css'
import { Modal, Button, Table, Form, Pagination, Dropdown } from 'react-bootstrap'; // Assuming you are using react-bootstrap components
import { getAllClinicRequest, registerClinicRequest, deleteClinicRequest } from '../../../store/actions/clinicActions'; // Adjust path as needed
import { updateClinic } from '../../../shared/api/clinicApi';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface ClinicManagementProps {
  clinics: any[];
  user: User; // Assuming user details are passed via props or Redux state
  getAllClinics: () => void;
  registerClinic: (clinicData: any, onCallSuccess: Function) => void;
  deleteClinic: (clinicId: string, onCallSuccess: Function) => void;
  updateClinic: (clinicData: any) => void;
}

interface ClinicManagementState {
  showModal: boolean;
  showConfirmDelete: boolean;
  selectedClinic: any | null;
  filterText: string;
  currentPage: number;
  pageSize: number;
}

class ClinicManagementComponent extends Component<ClinicManagementProps, ClinicManagementState> {
  constructor(props: ClinicManagementProps) {
    super(props);
    this.state = {
      showModal: false,
      showConfirmDelete: false,
      selectedClinic: null,
      filterText: '',
      currentPage: 1,
      pageSize: 5, // Default page size
    };
  }

  componentDidMount() {
    this.props.getAllClinics();
  }

  handleClose = () => {
    this.setState({ showModal: false, selectedClinic: null });
  };

  handleShow = (clinic: any | null) => {
    this.setState({ showModal: true, selectedClinic: clinic });
  };

  handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const clinicEmail = formData.get('clinicEmail') as string;
    const address = {
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      country: formData.get('country') as string,
    };
    const phone = formData.get('phone') as string;
    const specialty = (formData.get('specialty') as string).split(',').map(s => s.trim()); // Split specialties by comma
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;

    if (this.state.selectedClinic) {
      const updatedClinic = { _id: this.state.selectedClinic.clinic._id, name, address, phone };
      this.props.updateClinic(updatedClinic);
    } else {
      const newClinic: any = {
        data: { name, address, phone, specialty, email: clinicEmail },
        frontDesk: { firstName, lastName, email }
      };
      this.props.registerClinic(newClinic, () => {
        this.props.getAllClinics();
      });
    }
    this.setState({ showModal: false, selectedClinic: null });
  };
  handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterText: event.target.value });
  };

  handleDeleteClinicDialog = (clinic: any) => {
    this.setState({ selectedClinic: clinic, showConfirmDelete: true });
  }

  handleDeleteClinic = () => {
    if (this.state.selectedClinic) {
      this.props.deleteClinic(this.state.selectedClinic._id!, () => {
        this.props.getAllClinics();
      });
    }

  };

  handlePaginationSelect = (eventKey: number) => {
    this.setState({ currentPage: eventKey });
  };

  render() {
    const { showModal, showConfirmDelete, selectedClinic, filterText, currentPage, pageSize } = this.state;
    const clinics = this.props.clinics;

    const filteredClinics = clinics ? clinics.filter((clinic: any) =>
      clinic.clinic.name.toLowerCase().includes(filterText.toLowerCase())
    ) : [];

    const indexOfLastClinic = currentPage * pageSize;
    const indexOfFirstClinic = indexOfLastClinic - pageSize;
    const currentClinics = filteredClinics.slice(indexOfFirstClinic, indexOfLastClinic);
    const totalPages = Math.ceil(filteredClinics.length / pageSize);

    return (
      <div className="clinic-management-container">
        <h1 className="title">Medi-Manage Clinics</h1>
        <div className="actions">
          <Form.Group controlId="formFilter" className="search-input">
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={filterText}
              onChange={this.handleFilterChange}
            />
          </Form.Group>
          {/* <Form.Group controlId="formPageSizeSelect" className="page-size-select">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Page Size: {pageSize}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.setState({ pageSize: 5 })}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ pageSize: 10 })}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ pageSize: 15 })}>15</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group> */}
          <Button variant="primary" className="btn-add-clinic" onClick={() => this.handleShow(null)}>
            Add Clinic
          </Button>
        </div>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentClinics.map((clinic: any) => (
              <tr key={clinic._id}>
                <td>{clinic.clinic.name}</td>
                <td>{`${clinic.clinic.address.street}, ${clinic.clinic.address.city}, ${clinic.clinic.address.state}, ${clinic.clinic.address.zip}, ${clinic.clinic.address.country}`}</td>
                <td>{clinic.clinic.phone}</td>
                <td>{clinic.clinic.specialty.join(', ')}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => this.handleShow(clinic)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => this.handleDeleteClinicDialog(clinic)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <Pagination.First onClick={() => this.setState({ currentPage: 1 })} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => this.setState({ currentPage: currentPage - 1 })} disabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => this.handlePaginationSelect(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => this.setState({ currentPage: currentPage + 1 })} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => this.setState({ currentPage: totalPages })} disabled={currentPage === totalPages} />
        </Pagination>

        <Modal show={showConfirmDelete} onHide={() => this.setState({ showConfirmDelete: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this clinic?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showConfirmDelete: false })}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteClinic}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedClinic ? 'Edit Clinic' : 'Add Clinic'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSave}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={selectedClinic ? selectedClinic.clinic.name : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Clinic Email</Form.Label>
                <Form.Control
                  type="email"
                  name="clinicEmail"
                  defaultValue={selectedClinic ? selectedClinic.clinic.email : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  defaultValue={selectedClinic ? selectedClinic.clinic.address.street : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  defaultValue={selectedClinic ? selectedClinic.clinic.address.city : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  defaultValue={selectedClinic ? selectedClinic.clinic.address.state : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  defaultValue={selectedClinic ? selectedClinic.clinic.address.zip : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  defaultValue={selectedClinic ? selectedClinic.clinic.address.country : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  defaultValue={selectedClinic ? selectedClinic.clinic.phone : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formSpecialty">
                <Form.Label>Specialty (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="specialty"
                  defaultValue={selectedClinic ? selectedClinic.clinic.specialty.join(', ') : ''}
                  required
                />
              </Form.Group>
              {
                (!selectedClinic &&
                  <>
                    <h5>FrontDesk Details</h5>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                      />
                    </Form.Group>
                  </>)
              }
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  clinics: state.clinic.clinics,
  user: state.user.user, // Assuming user details are stored in Redux state
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllClinics: () => dispatch(getAllClinicRequest()),
  registerClinic: (clinicData: any, onCallSuccess: Function) => dispatch(registerClinicRequest(clinicData, onCallSuccess)),
  deleteClinic: (clinicId: string, onCallSuccess: Function) => dispatch(deleteClinicRequest(clinicId, onCallSuccess)),
  updateClinic: (clinicData: void) => dispatch(updateClinic(clinicData))

});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManagementComponent);
