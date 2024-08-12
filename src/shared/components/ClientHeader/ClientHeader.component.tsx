import { Component } from 'react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'; 
import './ClientHeader.css';
import { logoutRequest } from '../../../store/actions/authActions';
import { connect } from 'react-redux';
import logo from '../../../images/MEDLogo.png';

interface ClientHeaderProps {
    isAuthenticated: boolean;
    role: string;
    name: string;
    logoutUser: () => void;
}

interface ClientHeaderState {
    dropdownOpen: boolean;
    sidebarOpen: boolean;
}

class ClientHeader extends Component<ClientHeaderProps, ClientHeaderState> {
    constructor(props: ClientHeaderProps) {
        super(props);
        this.state = {
            dropdownOpen: false,
            sidebarOpen: false
        };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleSidebar() {
        this.setState(prevState => ({
            sidebarOpen: !prevState.sidebarOpen
        }));
    }

    handleOutsideClick(event: any) {
        if (this.state.dropdownOpen && !event.target.closest('.client-user-menu')) {
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
            <header className="client-header">
                <div className="client-logo-container">
                    <a href="/home" className="client-logo">
                        <img src={logo} alt="Logo" />
                    </a>
                    <button className="client-sidebar-toggle" onClick={this.toggleSidebar}>
                        <FaBars />
                    </button>
                </div>
                <nav className="client-nav">
                    <ul className="client-nav-links">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/doctor">Search Doctor</a></li>
                        <li><a href="/clinic">Search Clinic</a></li>
                        {!this.props.isAuthenticated && <li><a href="/auth">Login/Register</a></li>}
                    </ul>
                    {this.props.isAuthenticated && (
                        <div className="client-user-menu">
                            <div className="client-user-info" onClick={this.toggleDropdown}>
                                <FaUser className="client-user-icon" />
                                <span className="client-user-name">{this.props.name}</span>
                            </div>
                            <ul className={`client-dropdown-menu ${this.state.dropdownOpen ? 'active' : ''}`}>
                                <li><a href="/profile">Profile</a></li>
                                <li><a href="/history">Appointment History</a></li>
                                <li><a href="#" onClick={this.props.logoutUser}>Logout</a></li>
                            </ul>
                        </div>
                    )}
                </nav>
                <div className={`client-sidebar-menu ${this.state.sidebarOpen ? 'active' : ''}`}>
                    <button className="client-sidebar-toggle" onClick={this.toggleSidebar}>
                        <FaTimes />
                    </button>
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/doctor">Search Doctor</a></li>
                        <li><a href="/clinic">Search Clinic</a></li>
                        {!this.props.isAuthenticated && <li><a href="/auth">Login/Register</a></li>}
                        {this.props.isAuthenticated && (
                            <li><a href="#" onClick={this.props.logoutUser}>Logout</a></li>
                        )}
                    </ul>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    name: state.auth.name
});

const mapDispatchToProps = (dispatch: any) => ({
    logoutUser: () => dispatch(logoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientHeader);
