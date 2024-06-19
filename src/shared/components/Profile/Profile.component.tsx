import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import './Profile.css';
import { getProfileRequest, updateProfileRequest } from '../../../store/actions/profileActions';
import { connect } from 'react-redux';
import SelectButtonGroup from '../SelectButton/SelectButtonGroup.component';

interface ProfileState {
  form: {
    firstName: string;
    lastName: string;
    email: string;
    contact_no: string;
    dob: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    gender: string;
    licenseNumber?: string;
    speciality?: string;
    clinicName?: string;
    yearsOfExperience?: string;
    profilePhoto?: string | ArrayBuffer | null;
    insuranceDetails?: string;
    emergencyContact?: string;
    healthCardDetails?: string;
    healthHistory?: string;
    staffNumber?: string;
    slotAvailability: {
      [key: string]: boolean[];
    };
  };
  errors: {
    [key: string]: string;
  };
  isEditMode: boolean;
}

interface ProfileProps {
  getProfile: () => void;
  updateProfile: (userData: any) => void;
  role: string;
  profileData: any; // New prop to store profile data fetched from Redux
}

class ProfileComponent extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        contact_no: '',
        dob: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        gender: '',
        licenseNumber: '',
        speciality: '',
        clinicName: '',
        yearsOfExperience: '',
        profilePhoto: null,
        insuranceDetails: '',
        emergencyContact: '',
        healthCardDetails: '',
        healthHistory: '',
        staffNumber: '',
        slotAvailability: {
          Monday: [false, false, false, false],
          Tuesday: [false, false, false, false],
          Wednesday: [false, false, false, false],
          Thursday: [false, false, false, false],
          Friday: [false, false, false, false],
          Saturday: [false, false, false, false],
          Sunday: [false, false, false, false],
        },
      },
      errors: {},
      isEditMode: false,
    };
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentDidUpdate(prevProps: ProfileProps) {
    if (this.props.profileData !== prevProps.profileData) {
      this.populateFormData(this.props.profileData);
    }
  }

  populateFormData = (profileData: any) => {
    const { user, details } = profileData;
    console.log(user, details);

    const { address, ...userData } = user;
    console.log(profileData);

    const formData = {
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      contact_no: userData.contact_no || '',
      dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '',
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      zip: address.zip || '',
      country: address.country || '',
      gender: userData.gender || '',
      profilePhoto: userData.profilePhoto || '',
      ...(userData.details?.licenseNumber ? { licenseNumber: userData.details.licenseNumber } : {}),
      ...(userData.details?.speciality ? { speciality: userData.details.speciality } : {}),
      ...(userData.details?.clinicName ? { clinicName: userData.details.clinicName } : {}),
      ...(userData.details?.yearsOfExperience ? { yearsOfExperience: userData.details.yearsOfExperience } : {}),
      ...(userData.details?.insuranceDetails ? { insuranceDetails: userData.details.insuranceDetails } : {}),
      ...(userData.details?.emergencyContact ? { emergencyContact: userData.details.emergencyContact } : {}),
      ...(userData.details?.healthCardDetails ? { licenseNumber: userData.details.licenseNumber } : {}),
      ...(userData.details?.healthHistory ? { healthHistory: userData.details.healthHistory } : {}),
      ...(userData.details?.staffNumber ? { staffNumber: userData.details.staffNumber } : {}),
      slotAvailability: details?.slotAvailability || {
        Monday: [false, false, false, false],
        Tuesday: [false, false, false, false],
        Wednesday: [false, false, false, false],
        Thursday: [false, false, false, false],
        Friday: [false, false, false, false],
        Saturday: [false, false, false, false],
        Sunday: [false, false, false, false],
      },
    };

    this.setState({
      form: formData,
    });
  };

  validateForm = () => {
    const { form } = this.state;
    let errors: any = {};
    let formIsValid = true;

    if (!form.firstName) {
      errors.firstName = 'First Name is required';
      formIsValid = false;
    }

    if (!form.lastName) {
      errors.lastName = 'Last Name is required';
      formIsValid = false;
    }
    this.setState({ errors });
    return formIsValid;
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  handleDateChange = (date: Date | null) => {
    if (date) {
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          dob: date.toISOString().split('T')[0],
        },
      }));
    }
  };

  handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (event.target) {
          this.setState((prevState) => ({
            form: {
              ...prevState.form,
              profilePhoto: event.target.result,
            },
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  toggleEditMode = () => {
    this.setState((prevState) => ({
      isEditMode: !prevState.isEditMode,
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm()) {
      console.log('Form data:', this.state.form);
      const { firstName, lastName, dob, gender, city, street, country, state, zip, contact_no, profilePhoto } = this.state.form;
      const updateForm = { firstName, lastName, dob, gender, address: { street, city, state, zip, country }, contact_no, profilePhoto }
      this.props.updateProfile(updateForm);
      this.toggleEditMode();
    }
  };

  handleSlotChange = (day: string, newValue: boolean[]) => {
    console.log(day, newValue);    
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        slotAvailability: {
          ...prevState.form.slotAvailability,
          [day]: newValue,
        },
      },
    }));
  };

  render() {
    const { form, errors, isEditMode } = this.state;

    return (
      <Container className="profile-container">
        <div className="profile-header">
          <h2 className="text-center">My Profile</h2>
          {!isEditMode && (
            <Button variant="primary" className="edit-profile-btn" onClick={this.toggleEditMode}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="profile-content">
          <Row>
            <Col md={4}>
              <div className="profile-avatar">
                {form.profilePhoto && (
                  <img
                    src={form.profilePhoto as string}
                    alt="Profile"
                    className="profile-photo img-fluid"
                  />
                )}
                {!form.profilePhoto && (
                  <div className="profile-avatar-placeholder">
                    <i className="bi bi-person-circle"></i>
                  </div>
                )}
              </div>
              {isEditMode && (
                <Form.Group controlId="profilePhoto">
                  <Form.Control
                    type="file"
                    id="custom-file"
                    onChange={this.handleFileChange}
                    disabled={!isEditMode}
                  />
                </Form.Group>
              )}
            </Col>
            <Col md={8}>
              <Form onSubmit={this.handleSubmit} className="profile-form">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={this.handleChange}
                        isInvalid={!!errors.firstName}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={this.handleChange}
                        isInvalid={!!errors.lastName}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={this.handleChange}
                        isInvalid={!!errors.email}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contact_no">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="contact_no"
                        value={form.contact_no}
                        onChange={this.handleChange}
                        isInvalid={!!errors.contact_no}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_no}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={(e) => this.handleChange(e)}
                        isInvalid={!!errors.dob}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dob}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={form.gender}
                        onChange={this.handleChange}
                        disabled={!isEditMode}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="street">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={form.street}
                        onChange={this.handleChange}
                        isInvalid={!!errors.street}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.street}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={this.handleChange}
                        isInvalid={!!errors.city}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={this.handleChange}
                        isInvalid={!!errors.state}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="zip">
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zip"
                        value={form.zip}
                        onChange={this.handleChange}
                        isInvalid={!!errors.zip}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zip}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={this.handleChange}
                        isInvalid={!!errors.country}
                        disabled={!isEditMode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {
                  this.props.role === 'Doctor' && (
                    <fieldset>
                      <legend>Doctor Details</legend>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="licenseNumber">
                            <Form.Label>License Number</Form.Label>
                            <Form.Control
                              type="text"
                              name="licenseNumber"
                              value={form.licenseNumber}
                              onChange={this.handleChange}
                              isInvalid={!!errors.licenseNumber}
                              disabled={!isEditMode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.licenseNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="speciality">
                            <Form.Label>Speciality</Form.Label>
                            <Form.Control
                              type="text"
                              name="speciality"
                              value={form.speciality}
                              onChange={this.handleChange}
                              isInvalid={!!errors.speciality}
                              disabled={!isEditMode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.speciality}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="clinicName">
                            <Form.Label>Clinic Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="clinicName"
                              value={form.clinicName}
                              onChange={this.handleChange}
                              isInvalid={!!errors.clinicName}
                              disabled={!isEditMode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.clinicName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="yearsOfExperience">
                            <Form.Label>Years of Experience</Form.Label>
                            <Form.Control
                              type="text"
                              name="yearsOfExperience"
                              value={form.yearsOfExperience}
                              onChange={this.handleChange}
                              isInvalid={!!errors.yearsOfExperience}
                              disabled={!isEditMode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.yearsOfExperience}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </fieldset>
                  )
                }
                {
                  this.props.role === 'FrontDesk' && (
                    <fieldset>
                      <legend>Staff Details</legend>
                      <Form.Group controlId="staffNumber">
                        <Form.Label>Staff Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="staffNumber"
                          value={form.staffNumber}
                          onChange={this.handleChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>
                    </fieldset>
                  )
                }
                {
                  this.props.role === 'Patient' && (
                    <fieldset>
                      <legend>Patient Details</legend>
                      <Form.Group controlId="insuranceDetails">
                        <Form.Label>Insurance Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="insuranceDetails"
                          value={form.insuranceDetails}
                          onChange={this.handleChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>
                      <Form.Group controlId="emergencyContact">
                        <Form.Label>Emergency Contact</Form.Label>
                        <Form.Control
                          type="text"
                          name="emergencyContact"
                          value={form.emergencyContact}
                          onChange={this.handleChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>
                      <Form.Group controlId="healthCardDetails">
                        <Form.Label>Health Card Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="healthCardDetails"
                          value={form.healthCardDetails}
                          onChange={this.handleChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>
                      <Form.Group controlId="healthHistory">
                        <Form.Label>Health History</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="healthHistory"
                          value={form.healthHistory}
                          onChange={this.handleChange}
                          disabled={!isEditMode}
                        />
                      </Form.Group>
                    </fieldset>
                  )
                }
                {/* {Object.keys(form.slotAvailability).map((day) => (
                  <div key={day}>
                    <h4>{day}</h4>
                    <SelectButtonGroup
                      day={day}
                      value={form.slotAvailability[day]}
                      onChange={(day, newValue) => this.handleSlotChange(day, newValue)}
                    />
                  </div>
                ))}                 */}
                {isEditMode && (
                  <div className="edit-buttons">
                    <Button variant="secondary" className="cancel-btn" onClick={this.toggleEditMode}>
                      Cancel
                    </Button>{' '}
                    &nbsp;&nbsp;
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                )}
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  role: state?.auth?.role,
  profileData: state?.profile?.profileData
});

const mapDispatchToProps = (dispatch: any) => ({
  getProfile: () => dispatch(getProfileRequest()),
  updateProfile: (userData: any) => dispatch(updateProfileRequest(userData)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
