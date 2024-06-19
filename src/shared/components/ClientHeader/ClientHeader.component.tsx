import React, { Component } from 'react';
import { FaUser } from 'react-icons/fa'; // Importing react-icons
import './ClientHeader.css';
import { logoutRequest } from '../../../store/actions/authActions';
import { connect } from 'react-redux';


interface ClientHeaderProps {
    isAuthenticated: boolean;
    role: string;
    logoutUser: () => void;
}

interface ClientHeaderState {
    dropdownOpen: boolean;
}

class ClientHeader extends Component<ClientHeaderProps, ClientHeaderState> {
    constructor(props: ClientHeaderProps) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    toggleDropdown() {
        console.log(this.state.dropdownOpen);
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
        console.log(this.state);

    }
    handleOutsideClick(event: any) {
        if (this.state.dropdownOpen && !event.target.closest('.user-menu')) {
            this.setState({
                dropdownOpen: false
            });
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }
    
    render() {
        return (
            <header className="header">
                <nav className="nav">
                    <ul className="nav-links">
                        <li><a href="/client/home">Home</a></li>
                        <li><a href="/client/find-doctor">Find a Doctor</a></li>
                        <li><a href="/client/find-clinic">Find a Clinic</a></li>
                        {!this.props.isAuthenticated && <li><a href="/client/auth">Login/Register</a></li>}
                    </ul>
                    {
                        this.props.isAuthenticated && (
                            <div className="user-menu">
                            <div className="user-info" onClick={this.toggleDropdown}>
                                <FaUser className="user-icon" />
                                <span className="user-name">Username</span>
                            </div>
                            {/* {this.state.dropdownOpen && ( */}
                               <ul className={`dropdown-menu ${this.state.dropdownOpen ? 'active' : ''}`}>
                            
                                    <li><a href="/client/profile">My Profile</a></li>
                                    <li onClick={this.props.logoutUser}><a href="#">Logout</a></li>
                                    <li><a href="#">Report</a></li>
                                </ul>
                            {/* )} */}
                        </div>    
                        )
                    }
                </nav>
            </header>
        );
    }
}


const mapStateToProps = (state: any) => ({
    role: state?.auth?.role,
    isAuthenticated: state?.auth?.isAuthenticated
  });
  
  
  const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(logoutRequest()),
  });
  

  export default connect(mapStateToProps, mapDispatchToProps)(ClientHeader);
