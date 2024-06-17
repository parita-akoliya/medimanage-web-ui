import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import './Profile.css';
interface ProfileState {
    form: {
      firstName: string;
      lastName: string;
      email: string;
      contactNumber: string;
      dob: Date;
      street: string;
      city: string;
      state: string;
      country: string;
      gender: string;
      licenseNumber: string;
      speciality: string;
      clinicName: string;
      yearsOfExperience: number;
    };
    errors: {
      [key: string]: string;
    };
  }
class ProfileComponent extends Component<{}, ProfileState> {
  constructor(props:any) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        dob: new Date(),
        street: '',
        city: '',
        state: '',
        country: '',
        gender: '',
        licenseNumber: '',
        speciality: '',
        clinicName: '',
        yearsOfExperience: 0
      },
      errors: {}
    };
  }

  validateForm = () => {
    const { form } = this.state;
    let errors:any = {};
    let formIsValid = true;

    if (!form.firstName) {
      formIsValid = false;
      errors['firstName'] = 'First name is required';
    }

    if (!form.lastName) {
      formIsValid = false;
      errors['lastName'] = 'Last name is required';
    }

    if (!form.email) {
      formIsValid = false;
      errors['email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formIsValid = false;
      errors['email'] = 'Email is invalid';
    }

    if (!form.contactNumber) {
      formIsValid = false;
      errors['contactNumber'] = 'Contact number is required';
    } else if (!/^\d{10}$/.test(form.contactNumber)) {
      formIsValid = false;
      errors['contactNumber'] = 'Contact number is invalid';
    }

    if (!form.street) {
      formIsValid = false;
      errors['street'] = 'Street is required';
    }

    if (!form.city) {
      formIsValid = false;
      errors['city'] = 'City is required';
    }

    if (!form.state) {
      formIsValid = false;
      errors['state'] = 'State is required';
    }

    if (!form.country) {
      formIsValid = false;
      errors['country'] = 'Country is required';
    }

    if (!form.gender) {
      formIsValid = false;
      errors['gender'] = 'Gender is required';
    }

    if (!form.licenseNumber) {
      formIsValid = false;
      errors['licenseNumber'] = 'License number is required';
    }

    if (!form.speciality) {
      formIsValid = false;
      errors['speciality'] = 'Speciality is required';
    }

    if (!form.clinicName) {
      formIsValid = false;
      errors['clinicName'] = 'Clinic name is required';
    }

    if (!form.yearsOfExperience) {
      formIsValid = false;
      errors['yearsOfExperience'] = 'Years of experience is required';
    } else if (isNaN(form.yearsOfExperience)) {
      formIsValid = false;
      errors['yearsOfExperience'] = 'Years of experience must be a number';
    }

    this.setState({ errors });
    return formIsValid;
  };

  handleChange = (e:any) => {
    const { name, value } = e.target;
    this.setState((prevState:any) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleDateChange = (date:any) => {
    this.setState((prevState:any) => ({
      form: {
        ...prevState.form,
        dob: date
      }
    }));
  };

  handleSubmit = (e:any) => {
    e.preventDefault();
    if (this.validateForm()) {
      console.log('Form data:', this.state.form);
    }
  };

  render() {
    const { form, errors } = this.state;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <h2>My Profile</h2>
            <Form onSubmit={this.handleSubmit}>
              {/* <Form.Row> */}
                <Form.Group as={Col} controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={this.handleChange}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={this.handleChange}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              {/* </Form.Row> */}

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={this.handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={this.handleChange}
                  isInvalid={!!errors.contactNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contactNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                {/* <DatePicker
                  selected={form.dob}
                  onChange={this.handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                /> */}
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={this.handleChange}
                  isInvalid={!!errors.street}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.street}
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Ro> */}
                <Form.Group as={Col} controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    name="city"
                    value={form.city}
                    onChange={this.handleChange}
                    isInvalid={!!errors.city}
                  >
                    <option value="">Choose...</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    name="state"
                    value={form.state}
                    onChange={this.handleChange}
                    isInvalid={!!errors.state}
                  >
                    <option value="">Choose...</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="IL">Illinois</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    name="country"
                    value={form.country}
                    onChange={this.handleChange}
                    isInvalid={!!errors.country}
                  >
                    <option value="">Choose...</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
              {/* </Form.Row> */}

              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={form.gender}
                  onChange={this.handleChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Choose...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="licenseNumber">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={this.handleChange}
                  isInvalid={!!errors.licenseNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.licenseNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="speciality">
                <Form.Label>Speciality</Form.Label>
                <Form.Control
                  type="text"
                  name="speciality"
                  value={form.speciality}
                  onChange={this.handleChange}
                  isInvalid={!!errors.speciality}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.speciality}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="clinicName">
                <Form.Label>Clinic Name</Form.Label>
                <Form.Control
                  type="text"
                  name="clinicName"
                  value={form.clinicName}
                  onChange={this.handleChange}
                  isInvalid={!!errors.clinicName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clinicName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="yearsOfExperience">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={this.handleChange}
                  isInvalid={!!errors.yearsOfExperience}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.yearsOfExperience}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default ProfileComponent;