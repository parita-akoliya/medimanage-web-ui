import React, { Component } from 'react';
import { Modal, Button, Table, Form, Pagination, Dropdown } from 'react-bootstrap';
import './UserManagement.css';
import { changeRoleRequest, getAllUsersRequest, updateEmailRequest, deleteUserRequest, updateUserRequest } from '../../../store/actions/userActions';
import { connect } from 'react-redux';
import { forgotPasswordRequest, registerAdmin, registerDoctor, registerPatient } from '../../../store/actions/authActions';

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  contact_no: string;
  role: string;
}

interface UserManagementProps {
  getAllUsers: () => void;
  updateProfileUser: (userId: string, userData: any) => void;
  changeUserRole: (userData: any) => void;
  changeUserEmail: (userData: any) => void;
  resetPasswordRequest: (email: string) => void;
  deleteUser: (userId: string, onCallSuccess: Function) => void;
  registerAdmin: (userData: any, onCallSuccess?: Function) => void;
  registerPatient: (userData: any, onCallSuccess?: Function) => void;
  registerDoctor: (userData: any, onCallSuccess?: Function) => void;
  users: User[];
}

interface UserManagementState {
  users: User[];
  showModal: boolean;
  selectedUser: User | null;
  filterText: string;
  role: string;
  editMode: 'email' | 'role' | 'other' | null;
  showConfirmDelete: boolean;
  currentPage: number;
  pageSize: number;
}

class UserManagementComponent extends Component<UserManagementProps, UserManagementState> {
  constructor(props: UserManagementProps) {
    super(props);
    this.state = {
      users: this.props.users ? this.props.users : [],
      showModal: false,
      selectedUser: null,
      filterText: '',
      role: '',
      editMode: null,
      showConfirmDelete: false,
      currentPage: 1,
      pageSize: 10, // Default page size
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps: UserManagementProps) {
    if (prevProps.users !== this.props.users) {
      this.setState({ users: this.props.users });
    }
  }

  handleClose = () => {
    this.setState({ showModal: false, selectedUser: null, editMode: null });
  };

  handleShow = (user: User | null) => {
    this.setState({ showModal: true, selectedUser: user, role: user?.role || '', editMode: null });
  };

  handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const contact_no = formData.get('contact_no') as string;
    const role = formData.get('role') as string;

    if (this.state.selectedUser) {
      const updatedUser = { ...this.state.selectedUser, firstName, lastName, email, contact_no, role };

      if (email !== this.state.selectedUser.email) {
        this.props.changeUserEmail({ userId: this.state.selectedUser._id, newEmail: email });
      }
      if (role !== this.state.selectedUser.role) {
        this.props.changeUserRole({ userId: this.state.selectedUser._id, newRole: role });
      }
      if ((contact_no !== this.state.selectedUser.contact_no) || (lastName !== this.state.selectedUser.lastName) || (firstName !== this.state.selectedUser.firstName)) {
        this.props.updateProfileUser(this.state.selectedUser._id!, { contact_no, lastName, firstName });
      }

      const updatedUsers = this.state.users.map(user =>
        user._id === updatedUser._id ? updatedUser : user
      );
      this.setState({ users: updatedUsers, showModal: false, selectedUser: null, editMode: null });
    } else {
      const newUser: User = {
        firstName,
        lastName,
        email,
        contact_no,
        role,
      };
      switch (role) {
        case "Admin":
          this.props.registerAdmin(newUser);
          break;
        case "Doctor":
          this.props.registerDoctor(newUser);
          break;
        case "Patient":
          this.props.registerPatient(newUser);
          break;
        default:
          this.props.registerPatient(newUser);
          break;
      }
      this.setState({ users: [...this.state.users, newUser], showModal: false });
    }
  };

  handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterText: event.target.value });
  };

  handleEditField = (field: 'email' | 'role' | 'other') => {
    this.setState({ editMode: field });
  };

  handleDoubleClick = (field: 'email' | 'role') => {
    if (this.state.editMode === field) {
      this.setState({ editMode: null });
    } else {
      this.setState({ editMode: field });
    }
  };

  handleResetPassword = async () => {
    if (this.state.selectedUser) {
      await this.props.resetPasswordRequest(this.state.selectedUser.email);
    }
  };

  handleConfirmDeleteUser = (user: any) => {
    this.setState({ selectedUser: user, showConfirmDelete: true });
  };

  handleDeleteUser = () => {
    if (this.state.selectedUser) {
      this.props.deleteUser(this.state.selectedUser._id!, () => {
        this.props.getAllUsers();
      });
      const updatedUsers = this.state.users.filter(user => user._id !== this.state.selectedUser?._id);
      this.setState({ users: updatedUsers, showModal: false, selectedUser: null, showConfirmDelete: false });
    }
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ pageSize: Number(event.target.value), currentPage: 1 });
  };

  render() {
    const { users, showModal, selectedUser, filterText, role, editMode, showConfirmDelete, currentPage, pageSize } = this.state;

    const filteredUsers = users?.filter((user: any) =>
      user.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase()) ||
      user.role.toLowerCase().includes(filterText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / pageSize);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
      <div className="user-management-container">
        <h1 className="title">Med-Manage Users</h1>
        <div className="actions">
          <Form.Group controlId="formFilter" className="search-input">
            <Form.Control
              type="text"
              placeholder="Search by name, email, or role..."
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
          <Button variant="primary" className="btn-add-user" onClick={() => this.handleShow(null)}>
            Add User
          </Button>
        </div>

        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user: any) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.role}
                </td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => this.handleShow(user)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => this.handleConfirmDeleteUser(user)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <Pagination.First onClick={() => this.handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => this.handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => this.handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser ? 'Edit User' : 'Add User'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSave}>
              <Form.Group controlId="formName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  defaultValue={selectedUser ? selectedUser.firstName : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  defaultValue={selectedUser ? selectedUser.lastName : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={selectedUser ? selectedUser.email : ''}
                  disabled={editMode === 'email'}
                  onDoubleClick={() => this.handleDoubleClick('email')}
                  onBlur={() => this.setState({ editMode: null })}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_no"
                  defaultValue={selectedUser ? selectedUser.contact_no : ''}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={role}
                  onChange={(e) => this.setState({ role: e.target.value })}
                  disabled={editMode === 'role'}
                  onDoubleClick={() => this.handleDoubleClick('role')}
                  onBlur={() => this.setState({ editMode: null })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
              &nbsp;&nbsp;&nbsp;
              {selectedUser && (
                <Button variant="secondary" onClick={this.handleResetPassword}>
                  Reset Password
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showConfirmDelete} onHide={() => this.setState({ showConfirmDelete: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
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
  users: state?.user.users,
});

const mapDispatchToProps = (dispatch: any) => ({
  getAllUsers: () => dispatch(getAllUsersRequest()),
  updateProfileUser: (userId: string, userData: User) => dispatch(updateUserRequest(userId, userData)),
  changeUserRole: (userData: User) => dispatch(changeRoleRequest(userData)),
  changeUserEmail: (userData: User) => dispatch(updateEmailRequest(userData)),
  deleteUser: (userId: string, onCallSuccess: Function) => dispatch(deleteUserRequest(userId, onCallSuccess)),
  resetPasswordRequest: (email: string) => dispatch(forgotPasswordRequest(email)),
  registerAdmin: (userData: any, onCallSuccess?: Function) => dispatch(registerAdmin(userData, onCallSuccess)),
  registerDoctor: (userData: any, onCallSuccess?: Function) => dispatch(registerDoctor(userData, onCallSuccess)),
  registerPatient: (userData: any, onCallSuccess?: Function) => dispatch(registerPatient(userData, onCallSuccess)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementComponent);
