import { Component } from 'react';
import { Container, Row, Col, Card, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getProfileRequest, updateProfileRequest } from '../../../store/actions/profileActions';
import { PencilSquare, XCircle, KeyFill } from 'react-bootstrap-icons';
import './ClientProfile.css';
import { forgotPasswordRequest, logoutRequest } from '../../../store/actions/authActions';

interface ClientProfileState {
  activeTab: string;
  patientDetails: {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    contact_no: string;
  };
  appointments: any[];
  isEditingProfile: boolean;
  selectedAppointment: any | null;
  showChangePasswordModal: boolean;
  errors: {
    firstName: string;
    email: string;
    lastName: string;
    dob: string;
    gender: string;
    contact_no: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  passwordDetails: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

interface ClientProfileProps {
  getProfile: () => void;
  updateProfile: (userData: any) => void;
  forgotPasswordRequest: (email: string, onCallSuccess?: Function) => void;
  logOut: () => void;
  profileData: any;
}

class ClientProfile extends Component<ClientProfileProps, ClientProfileState> {
  constructor(props: ClientProfileProps) {
    super(props);
    this.state = {
      activeTab: 'details',
      patientDetails: {
        dob: '',
        gender: '',
        firstName: '',
        lastName: '',
        email: '',
        contact_no: ''
      },
      appointments: [],
      isEditingProfile: false,
      selectedAppointment: null,
      showChangePasswordModal: false,
      errors: {
        dob: '',
        gender: '',
        firstName: '',
        email: '',
        lastName: '',
        contact_no: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      passwordDetails: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    };
  }

  componentDidMount(): void {
    this.props.getProfile();
  }

  componentDidUpdate(prevProps: ClientProfileProps): void {
    if (prevProps.profileData !== this.props.profileData) {
      const { user } = this.props.profileData;

      this.setState({
        patientDetails: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dob: user.dob || '',
          gender: user.gender || '',
          contact_no: user.contact_no || ''
        }
      });
    }
  }

  handleTabSelect = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  toggleEditProfile = () => {
    this.setState(prevState => ({ isEditingProfile: !prevState.isEditingProfile }));
  };

  handleProfileChange = (e: any) => {
    this.setState({
      patientDetails: {
        ...this.state.patientDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  validateProfile = () => {
    const errors = {
      firstName: '',
      email: '',
      lastName: '',
      dob: '',
      gender: '',
      contact_no: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };
    let isValid = true;

    
    if (!this.state.patientDetails.firstName) {
      errors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!this.state.patientDetails.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(this.state.patientDetails.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    if (!this.state.patientDetails.lastName) {
      errors.lastName = 'Last Name is required';
      isValid = false;
    }
    if (!this.state.patientDetails.dob) {
      errors.dob = 'Date of Birth is required';
      isValid = false;
    }
    if (!this.state.patientDetails.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    }
    if (!this.state.patientDetails.contact_no) {
      errors.contact_no = 'Contact Number is required';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  saveProfile = () => {
    if (this.validateProfile()) {
      this.props.updateProfile(this.state.patientDetails);
      this.toggleEditProfile();
    }
  };

  validatePasswordChange = () => {
    const errors = {
      firstName: '',
      email: '',
      lastName: '',
      dob: '',
      gender: '',
      contact_no: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };
    let isValid = true;

    
    if (!this.state.passwordDetails.currentPassword) {
      errors.currentPassword = 'Current Password is required';
      isValid = false;
    }
    if (!this.state.passwordDetails.newPassword) {
      errors.newPassword = 'New Password is required';
      isValid = false;
    } else if (this.state.passwordDetails.newPassword.length < 6) {
      errors.newPassword = 'New Password must be at least 6 characters long';
      isValid = false;
    }
    if (this.state.passwordDetails.newPassword !== this.state.passwordDetails.confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  savePassword = () => {
    if (this.validatePasswordChange()) {
      
      this.closeChangePasswordModal();
    }
  };

  resetPassword = (email: string) => {
    this.props.forgotPasswordRequest(email, () => {
      this.props.logOut()
    })
  };

  closeChangePasswordModal = () => {
    this.setState({
      showChangePasswordModal: false,
      passwordDetails: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    });
  };

  handlePasswordChange = (e: any) => {
    this.setState({
      passwordDetails: {
        ...this.state.passwordDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const {
      patientDetails,
      isEditingProfile,
      errors    } = this.state;

    return (
      <Container className="client-profile-container">
        <Row className="profile-header">
          <Col sm={12}>
            My Profile
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Container className="profile-container">
              <div className="profile-header">
                <h2 className="text-center">My Profile</h2>
                <div className="profile-actions">
                  {isEditingProfile ? (
                    <>
                      <OverlayTrigger overlay={<Tooltip>Cancel</Tooltip>}>
                        <Button
                          variant="secondary"
                          className="edit-profile-btn"
                          onClick={this.toggleEditProfile}
                        >
                          <XCircle />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Save Changes</Tooltip>}>
                        <Button
                          variant="primary"
                          className="save-profile-btn"
                          style={{ marginLeft: '12px' }}
                          onClick={this.saveProfile}
                        >
                          Save Changes
                        </Button>
                      </OverlayTrigger>
                    </>
                  ) : (
                    <OverlayTrigger overlay={<Tooltip>Edit Profile</Tooltip>}>
                      <Button
                        variant="primary"
                        className="edit-profile-btn"
                        style={{ marginLeft: '12px' }}
                        onClick={this.toggleEditProfile}
                      >
                        <PencilSquare />
                      </Button>
                    </OverlayTrigger>
                  )}
                  <OverlayTrigger overlay={<Tooltip>Reset Password</Tooltip>}>
                    <Button variant="" onClick={() => this.resetPassword(patientDetails.email)} style={{ marginLeft: '12px' }}
                    >
                      <KeyFill /> Reset Password
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <Card className="profile-card">
                <Card.Body>
                  <Form>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={patientDetails.firstName}
                        onChange={this.handleProfileChange}
                        readOnly={!isEditingProfile}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={patientDetails.lastName}
                        onChange={this.handleProfileChange}
                        readOnly={!isEditingProfile}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={patientDetails.email}
                        onChange={this.handleProfileChange}
                        readOnly
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={patientDetails.dob}
                        onChange={this.handleProfileChange}
                        readOnly={!isEditingProfile}
                        isInvalid={!!errors.dob}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dob}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={patientDetails.gender}
                        onChange={this.handleProfileChange}
                        readOnly={!isEditingProfile}
                        isInvalid={!!errors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="contact_no">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="contact_no"
                        value={patientDetails.contact_no}
                        onChange={this.handleProfileChange}
                        readOnly={!isEditingProfile}
                        isInvalid={!!errors.contact_no}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact_no}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profileData: state.profile.profileData,
});

const mapDispatchToProps = {
  getProfile: getProfileRequest,
  updateProfile: updateProfileRequest,
  forgotPasswordRequest: forgotPasswordRequest,
  logOut: logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile);
