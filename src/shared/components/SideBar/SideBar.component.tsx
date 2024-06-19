import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AdminSideBarNav from "./SideBarNav"; // Assuming the path to AdminSideBarNav is correct
import logo from '../../../images/MEDLogo.png'
import { logoutRequest } from "../../../store/actions/authActions";
import { connect } from "react-redux";

interface SidebarProps {
  logoutUser: () => void;
  role: string;
}

interface SidebarState {
  isNotActive: boolean;
  isDropdownActive: boolean;
}

class Sidebar extends Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      isNotActive: true,
      isDropdownActive: false,
    };
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isNotActive: !prevState.isNotActive,
    }));
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownActive: !prevState.isDropdownActive,
    }));
  };

  render() {
    const { isNotActive } = this.state;
    const barsIcon = <FontAwesomeIcon icon={faBars} className="icon-color"/>;
    const crossIcon = <FontAwesomeIcon icon={faTimes} className="icon-color"/>;
    const signOutIcon = <FontAwesomeIcon icon={faSignOutAlt} className="icon-color"/>;
    const role = this.props.role;
    return (
      <div>
        <div className="wrapper">
          <nav id="sidebar" className={isNotActive ? "active" : ""}>
            <div className="sidebar-header">
              <img
                src={logo}
                className="rounded-circle usr-image"
                height={isNotActive ? "20" : "70"}
                width={isNotActive ? "20" : "70"}
                alt="User"
              ></img>
              <h3>MediManage</h3>
            </div>

            <ul className="list-unstyled components">
              {AdminSideBarNav.map((item, index) => (
                item.roles.includes(role) && (
                  <li key={index} className="list-item">
                    <FontAwesomeIcon icon={item.icon} className="icon-color" />
                    <Link to={item.link}>{item.text}</Link>
                  </li>
                )
              ))}
            </ul>

            <ul className="list-unstyled bottom-links">
              <li className="list-item">
                {<FontAwesomeIcon icon={faUserCircle} className="icon-color"/>}
                <Link to="/admin/profile">Profile</Link>
              </li>
              <li className="list-item">
                {signOutIcon}
                <Link to="#" onClick={() => this.props.logoutUser()}>Logout</Link>
              </li>
            </ul>

            <button
              type="button"
              id="sidebarCollapse"
              onClick={this.toggleSidebar}
              className="btn btn-custom"
            >
              <span className={isNotActive ? "" : "hidden"}>{barsIcon}</span>
              <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
            </button>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  role: state?.auth?.role,
});


const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
