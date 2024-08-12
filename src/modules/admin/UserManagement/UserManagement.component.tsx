import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Form, Row, Col, Pagination, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PencilSquare, Trash, PlusCircle, Save } from 'react-bootstrap-icons'; 
import { forgotPasswordRequest, registerAdmin, registerDoctor, registerPatient } from '../../../store/actions/authActions';
import { getAllClinicRequest } from '../../../store/actions/clinicActions';
import { getAllUsersRequest, updateUserRequest, changeRoleRequest, updateEmailRequest, deleteUserRequest } from '../../../store/actions/userActions';

interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  contact_no?: string;
  role?: string;
  clinic?: string;
  details?: any;
  status?: string;
}

interface UserManagementProps {
  users: User[];
  role: any;
  clinics: any[];
  getAllUsers: () => void;
  getAllClinics: () => void;
  updateProfileUser: (userId: string, userData: any, onCallSuccess: Function) => void;
  changeUserRole: (userData: any) => void;
  changeUserEmail: (userData: any) => void;
  resetPasswordRequest: (email: string) => void;
  deleteUser: (userId: string, onCallSuccess: Function) => void;
  registerAdmin: (userData: any, onCallSuccess?: Function) => void;
  registerDoctor: (userData: any, onCallSuccess?: Function) => void;
  registerPatient: (userData: any, onCallSuccess?: Function) => void;
}

interface UserManagementState {
  showModal: boolean;
  showConfirmDelete: boolean;
  selectedUser: User | null;
  errors: any;
  role: string;
  editMode: string | null;
  selectedClinic: any;
  filter: string;
  currentPage: number;
  pageSize: number;
  submitted: boolean; 
}

class UserManagementComponent extends Component<UserManagementProps, UserManagementState> {
  constructor(props: UserManagementProps) {
    super(props);
    this.state = {
      showModal: false,
      showConfirmDelete: false,
      selectedUser: null,
      errors: {},
      role: '',
      editMode: null,
      selectedClinic: '',
      filter: '',
      currentPage: 1,
      pageSize: 10,
      submitted: false, 
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllClinics();
  }

  componentDidUpdate(prevProps: UserManagementProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({ currentPage: 1 });
    }
  }

  handleClose = () => {
    this.setState({ showModal: false, selectedUser: null, errors: {}, selectedClinic: '', submitted: false });
    this.props.getAllUsers();
  };

  handleShow = (user: User | null) => {
    this.setState({
      showModal: true,
      selectedUser: user,
      role: user?.role || '',
      selectedClinic: user?.details?.clinic || '',
    });
  };

  handleSave = (e: any) => {
    e.preventDefault();
    const { role: userRole } = this.props;
    const { selectedUser, role } = this.state;
    const form = e.currentTarget;
    this.setState({ submitted: true }); 

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const userData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        contact_no: form.contact_no.value,
        role: form.role.value,
        ...(role === 'Doctor') ? { clinic: form.clinic.value } : {},
        ...(role === 'Admin') ? { status: form.status.value } : {}
      };

      if (selectedUser) {
        this.props.updateProfileUser(selectedUser?._id!, userData, this.handleClose);
      } else {
        if (role === 'Admin') {
          this.props.registerAdmin(userData, this.handleClose);
        } else if (role === 'Doctor') {
          this.props.registerDoctor(userData, this.handleClose);
        } else if (role === 'Patient') {
          this.props.registerPatient(userData, this.handleClose);
        }
      }
    }
    this.setState({ errors: {}, selectedClinic: '' });
  };

  handleConfirmDeleteUser = (user: User) => {
    this.setState({ showConfirmDelete: true, selectedUser: user });
  };

  handleDeleteUser = () => {
    const { selectedUser } = this.state;
    if (selectedUser) {
      this.props.deleteUser(selectedUser?._id!, () => {
        this.setState({ showConfirmDelete: false, selectedUser: null });
      });
    }
  };

  handleFilterChange = (e: any) => {
    this.setState({ filter: e.target.value });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handlePageSizeChange = (e: any) => {
    this.setState({ pageSize: Number(e.target.value) });
  };

  handleDoubleClick = (field: string) => {
    this.setState({ editMode: field });
  };

  renderTooltip(text: string) {
    return <Tooltip id={`tooltip-${text}`}>{text}</Tooltip>;
  }


  render() {
    const {
      showModal,
      showConfirmDelete,
      selectedUser,
      editMode,
      filter,
      currentPage,
      pageSize,
      role,
      selectedClinic,
      submitted, 
    } = this.state;
    const { users, clinics, role: userRole } = this.props;
    const filteredUsers = users?.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
    ) || [];

    const paginatedUsers = filteredUsers?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];
    const totalPages = Math.ceil(filteredUsers?.length / pageSize);

    return (
      <div>
        <h2 className="my-4">User Management</h2>
        <Row>
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={filter}
              onChange={this.handleFilterChange}
            />
          </Col>
          <Col xs={4} className="text-right">
            <Button variant="primary" onClick={() => this.handleShow(null)}>
              <PlusCircle /> Add User
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Role</th>
              {userRole === 'Admin' &&
                <th>Status</th>
              }
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.map((user: any) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td
                  className={editMode === 'email' && selectedUser?._id === user._id ? 'editable' : ''}
                >
                  {editMode === 'email' && selectedUser?._id === user._id ? (
                    <Form.Control
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      onBlur={(e: any) => {
                        if (e.target.value !== user.email) {
                          this.props.changeUserEmail({ userId: user._id, newEmail: e.target.value });
                        }
                        this.setState({ editMode: null });
                      }}
                    />
                  ) : user.email}
                </td>
                <td>{user.contact_no}</td>
                <td
                  className={editMode === 'role' && selectedUser?._id === user._id ? 'editable' : ''}
                >
                  {editMode === 'role' && selectedUser?._id === user._id ? (
                    <Form.Control
                      as="select"
                      name="role"
                      defaultValue={user.role}
                      onBlur={(e: any) => {
                        if (e.target.value !== user.role) {
                          this.props.changeUserRole({ userId: user._id, newRole: e.target.value });
                        }
                        this.setState({ editMode: null });
                      }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                      <option value="FrontDesk" disabled>Front Desk</option>
                    </Form.Control>
                  ) : user.role}
                </td>
                {userRole === 'Admin' &&
                  <td>{user.status}</td>
                }
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={this.renderTooltip('Edit')}>
                    <Button variant="link" onClick={() => this.handleShow(user)}>
                      <PencilSquare />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={this.renderTooltip('Delete')}
                  >
                    <Button variant="link" onClick={() => this.handleConfirmDeleteUser(user)}>
                      <Trash />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages).keys()].map(page => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => this.handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>

        {/* Modal for User */}
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={submitted} onSubmit={this.handleSave}>
              <Form.Group as={Row} controlId="formFirstName">
                <Form.Label column sm={4}>First Name</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    defaultValue={selectedUser?.firstName || ''}
                    required
                    isInvalid={submitted && !selectedUser?.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a first name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formLastName">
                <Form.Label column sm={4}>Last Name</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    defaultValue={selectedUser?.lastName || ''}
                    required
                    isInvalid={submitted && !selectedUser?.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a last name.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formEmail">
                <Form.Label column sm={4}>Email</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    name="email"
                    defaultValue={selectedUser?.email || ''}
                    required
                    isInvalid={submitted && !selectedUser?.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formContactNo">
                <Form.Label column sm={4}>Contact Number</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="contact_no"
                    defaultValue={selectedUser?.contact_no || ''}
                    required
                    isInvalid={submitted && !selectedUser?.contact_no}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a contact number.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formRole">
                <Form.Label column sm={4}>Role</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="select"
                    name="role"
                    value={role}
                    onChange={(e) => this.setState({ role: e.target.value })}
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Patient">Patient</option>
                    <option value="FrontDesk" disabled>Front Desk</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              {role === 'Doctor' && (
                <Form.Group as={Row} controlId="formClinic">
                  <Form.Label column sm={4}>Clinic</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      name="clinic"
                      value={selectedClinic._id}
                      onChange={(e) => this.setState({ selectedClinic: e.target.value })}
                      required
                      isInvalid={submitted && !selectedClinic}
                    >
                      <option value="">Select Clinic</option>
                      {clinics.map(clinic => (
                        <option key={clinic.clinic._id} value={clinic.clinic._id}>{clinic.clinic.name}</option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a clinic.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              )}
              {role === 'Admin' && (
                <Form.Group as={Row} controlId="formStatus">
                  <Form.Label column sm={4}>Status</Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      as="select"
                      name="status"
                      value={selectedUser?.status}
                      onChange={(e) => {
                        const selectedUser = { ...this.state.selectedUser };
                        if (selectedUser) {
                          selectedUser.status = e.target.value;
                          this.setState({ selectedUser });
                        }
                      }}
                      required
                      isInvalid={submitted && !selectedUser?.status && role === 'Admin'}
                    >
                      <option value="">Select Status</option>
                      <option key={'Active'} value={'Active'}>Active</option>
                      <option key={'Inactive'} value={'Inactive'}>Inactive</option>
                      <option key={'Deleted'} value={'Deleted'}>Deleted</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Please select a clinic.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              )}

              <Button type="submit" variant="primary">
                <Save />  Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Confirm Delete Modal */}
        <Modal show={showConfirmDelete} onHide={() => this.setState({ showConfirmDelete: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showConfirmDelete: false })}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  users: state?.user?.users,
  role: state?.auth?.role,
  clinics: state?.clinic.clinics,
});

const mapDispatchToProps = {
  getAllUsers: getAllUsersRequest,
  getAllClinics: getAllClinicRequest,
  updateProfileUser: updateUserRequest,
  changeUserRole: changeRoleRequest,
  changeUserEmail: updateEmailRequest,
  deleteUser: deleteUserRequest,
  registerAdmin,
  registerDoctor,
  registerPatient,
  resetPasswordRequest: forgotPasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementComponent);
