import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Table, Form, Pagination, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './ClinicManagement.css';
import { getAllClinicRequest, registerClinicRequest, deleteClinicRequest, updateClinicRequest } from '../../../store/actions/clinicActions';
import { getLookupsByCategoryRequest, getLookupsByParentRequest, getLookupsRequest } from '../../../store/actions/lookupActions';
import { PencilSquare, PlusCircle, Trash } from 'react-bootstrap-icons';
import user from '../../../store/reducers/userReducers';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface ClinicManagementProps {
  clinics: any[];
  user: User;
  lookups: any; 
  getAllClinics: () => void;
  registerClinic: (clinicData: any, onCallSuccess: () => void) => void;
  deleteClinic: (clinicId: string, onCallSuccess: () => void) => void;
  updateClinic: (clinicData: any, onCallSuccess: () => void) => void;
  getLookupsByCategory: (category: string) => void;
  getLookups: () => void;
  getLookupsByParent: (parentId: string, onCallSuccess?: Function) => void;
}

interface ClinicManagementState {
  showModal: boolean;
  showConfirmDelete: boolean;
  selectedClinic: any | null;
  selectedCountry: string | null;
  selectedState: string | null;
  selectedCity: string | null;
  filterText: string;
  currentPage: number;
  pageSize: number;
  errors: Record<string, string>;
}

class ClinicManagementComponent extends Component<ClinicManagementProps, ClinicManagementState> {
  constructor(props: ClinicManagementProps) {
    super(props);
    this.state = {
      showModal: false,
      showConfirmDelete: false,
      selectedClinic: null,
      selectedCountry: null,
      selectedState: null,
      selectedCity: null,
      filterText: '',
      currentPage: 1,
      pageSize: 5,
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getAllClinics();
    this.props.getLookups();
    
  }

  handleClose = () => {
    this.setState({ showModal: false, selectedClinic: null, selectedCity: null, selectedCountry: null, selectedState: null, errors: {} });
  };

  handleShow = async (clinic: any | null) => {
    this.setState({ showModal: true, selectedClinic: clinic });
  
    if (clinic) {
      try {
        const countryId = this.props.lookups.lookupMaps[clinic.clinic.address.country]?.[0];
        const stateId = this.props.lookups.lookupMaps[clinic.clinic.address.state]?.[0];
  
        this.setState({
          selectedCountry: clinic.clinic.address.country,
          selectedState: clinic.clinic.address.state,
          selectedCity: clinic.clinic.address.city,
        });
      } catch (error) {
        console.error("Failed to fetch lookups:", error);
      }
    }
  };
  
  validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {};
    const requiredFields = [
      { label: 'Clinic Name', field: 'name' },
      { label: 'Clinic Email', field: 'clinicEmail' },
      { label: 'Street', field: 'street' },
      { label: 'City', field: 'city' },
      { label: 'State', field: 'state' },
      { label: 'Zip', field: 'zip' },
      { label: 'Country', field: 'country' },
      { label: 'Phone', field: 'phone' },
      { label: 'Specialty', field: 'specialty' },
    ];

    requiredFields.forEach(field => {
      if (!formData.get(field.field)) {
        errors[field.field] = `${field.label} is required`;
      }
    });

    if (!this.state.selectedCity) {
      errors['city'] = 'City is required'
    }

    if (!this.state.selectedCountry) {
      errors['country'] = 'Country is required'
    }

    if (!this.state.selectedState) {
      errors['state'] = 'State is required'
    }

    if (!this.state.selectedClinic) {
      const frontDeskFields = ['firstName', 'lastName', 'email'];
      frontDeskFields.forEach(field => {
        if (!formData.get(field)) {
          errors[field] = 'This field is required';
        }
      });
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (!this.validateForm(formData)) {
      return;
    }
    const { selectedCity, selectedCountry, selectedState } = this.state
    const name = formData.get('name') as string;
    const clinicEmail = formData.get('clinicEmail') as string;
    const address = {
      street: formData.get('street') as string,
      city: selectedCity,
      state: selectedState,
      zip: formData.get('zip') as string,
      country: selectedCountry,
    };
    const phone = formData.get('phone') as string;
    const specialty = (formData.get('specialty') as string).split(',').map(s => s.trim());
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;

    if (this.state.selectedClinic) {
      const updatedClinic = { _id: this.state.selectedClinic.clinic._id, name, address, phone };
      this.props.updateClinic(updatedClinic, () => {
        this.props.getAllClinics();
        this.handleClose();
      });
    } else {
      const newClinic = {
        data: { name, address, phone, specialty, email: clinicEmail },
        frontDesk: { firstName, lastName, email }
      };
      this.props.registerClinic(newClinic, () => {
        this.props.getAllClinics();
        this.handleClose();
      });
    }
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
        this.setState({ showConfirmDelete: false });
      });
    }
  };

  handlePaginationSelect = (eventKey: number) => {
    this.setState({ currentPage: eventKey });
  };

  handleCountryChange = (event: any) => {
    const country = event.target.value;
    this.setState({ selectedCountry: country, selectedState: null, selectedCity: null });
  };

  handleStateChange = (event: any) => {
    const state = event.target.value;
    this.setState({ selectedState: state, selectedCity: null });
  };

  handleCityChange = (event: any) => {
    this.setState({ selectedCity: event.target.value });
  };

  renderTooltip(text: string) {
    return <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>;
  }


  render() {
    const { showModal, showConfirmDelete, selectedClinic, selectedCountry, selectedState, selectedCity, filterText, currentPage, pageSize, errors } = this.state;
    const { clinics, lookups } = this.props;

    const filteredClinics = clinics?.filter((clinic: any) =>
      clinic.clinic.name.toLowerCase().includes(filterText.toLowerCase()) || []
    );

    const indexOfLastClinic = currentPage * pageSize;
    const indexOfFirstClinic = indexOfLastClinic - pageSize;
    const currentClinics = filteredClinics?.slice(indexOfFirstClinic, indexOfLastClinic);
    const totalPages = Math.ceil(filteredClinics?.length / pageSize);
    
    const countryOptions = lookups?.lookupsByType['COUNTRY'] || [];
    const stateOptions = selectedCountry ? lookups?.lookupsByParent[selectedCountry] || [] : [];
    const cityOptions = selectedState ? lookups?.lookupsByParent[selectedState] || [] : [];

    return (
      <div>
        <h2 className="my-4">Clinic Management</h2>
        <Row>
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={filterText}
              onChange={this.handleFilterChange}
            />
          </Col>
          <Col xs={4} className="text-right">
            <Button variant="primary" onClick={() => this.handleShow(null)}>
              <PlusCircle /> Add Clinic
            </Button>
          </Col>
        </Row>
        {clinics?.length === 0 ? (
          <p>No Clinic Found</p>
        ) : (
          <>
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
                {currentClinics?.map((clinic: any) => (
                  <tr key={clinic._id}>
                    <td>{clinic.clinic.name}</td>
                    <td>{`${clinic.clinic.address.street}, ${clinic.clinic.address.city}, ${clinic.clinic.address.state}, ${clinic.clinic.address.zip}, ${clinic.clinic.address.country}`}</td>
                    <td>{clinic.clinic.phone}</td>
                    <td>{clinic.clinic.specialty.join(', ')}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={this.renderTooltip('Edit')}>
                        <Button variant="link" onClick={() => this.handleShow(clinic)}>
                          <PencilSquare />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={this.renderTooltip('Delete')}
                      >
                        <Button variant="link" onClick={() => this.handleDeleteClinicDialog(clinic)}>
                          <Trash />
                        </Button>
                      </OverlayTrigger>
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
          </>
        )}
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
                  defaultValue={selectedClinic?.clinic.name || ''}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Clinic Email</Form.Label>
                <Form.Control
                  type="email"
                  name="clinicEmail"
                  defaultValue={selectedClinic?.clinic.email || ''}
                  isInvalid={!!errors.clinicEmail}
                />
                <Form.Control.Feedback type="invalid">{errors.clinicEmail}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  defaultValue={selectedClinic?.clinic.address.street || ''}
                  isInvalid={!!errors.street}
                />
                <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  name="country"
                  value={selectedCountry || ''}
                  isInvalid={!!errors.country}
                  onChange={this.handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((country: any) => (
                    <option key={country._id} value={country.value}>{country.value}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={selectedState || ''}
                  isInvalid={!!errors.state}
                  onChange={(e) => this.handleStateChange(e)}
                >
                  <option value="">Select State</option>
                  {stateOptions.map((state: any) => (
                    <option key={state.id} value={state.value}>{state.value}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  value={selectedCity || ''}
                  isInvalid={!!errors.city}
                  onChange={(e) => this.handleCityChange(e)}
                >
                  <option value="">Select City</option>
                  {cityOptions.map((city: any) => (
                    <option key={city._id} value={city.value}>{city.value}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  defaultValue={selectedClinic?.clinic.address.zip || ''}
                  isInvalid={!!errors.zip}
                />
                <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  defaultValue={selectedClinic?.clinic.phone || ''}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formSpecialty">
                <Form.Label>Specialty (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="specialty"
                  defaultValue={selectedClinic ? selectedClinic.clinic.specialty.join(', ') : ''}
                  isInvalid={!!errors.specialty}
                />
                <Form.Control.Feedback type="invalid">{errors.specialty}</Form.Control.Feedback>
              </Form.Group>
              {!selectedClinic && (
                <>
                  <h5>Front Desk Details</h5>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                </>
              )}
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showConfirmDelete} onHide={() => this.setState({ showConfirmDelete: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
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
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  clinics: state?.clinic?.clinics,
  user: state?.auth?.user,
  lookups: state?.lookupData
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllClinics: () => dispatch(getAllClinicRequest()),
  registerClinic: (clinicData: any, onCallSuccess: () => void) => dispatch(registerClinicRequest(clinicData, onCallSuccess)),
  deleteClinic: (clinicId: string, onCallSuccess: () => void) => dispatch(deleteClinicRequest(clinicId, onCallSuccess)),
  updateClinic: (clinicData: any, onCallSuccess: () => void) => dispatch(updateClinicRequest(clinicData, onCallSuccess)),
  getLookupsByCategory: (category: string) => dispatch(getLookupsByCategoryRequest(category)),
  getLookups: () => dispatch(getLookupsRequest()),
  getLookupsByParent: (parentId: string, onCallSuccess?: Function) => dispatch(getLookupsByParentRequest(parentId, onCallSuccess))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManagementComponent);
