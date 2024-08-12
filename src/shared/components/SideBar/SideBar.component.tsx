import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AdminSideBarNav from "./SideBarNav";
import logo from '../../../images/MEDLogo.png';
import minimalLogo from '../../../images/favicon.png';
import { logoutRequest } from "../../../store/actions/authActions";
import { connect } from "react-redux";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

interface SidebarProps {
  logoutUser: () => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ logoutUser, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const getActiveClass = (path: string) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <div className={`wrapper ${isSidebarOpen ? "expanded" : "collapsed"}`}>
      <nav id="sidebar" className={isSidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"}>
        <div className={`sidebar-header ${isSidebarOpen ? 'header-expanded' : 'header-collapsed'}`}>
          <div className="logo-container">
            {isSidebarOpen ?
              <img src={logo} className="logo expanded" alt="Logo" /> :
              <img src={minimalLogo} className="logo collapsed" alt="Logo" />
            }
          </div>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-toggle">{`${isSidebarOpen ? 'Close' : 'Open'}`}</Tooltip>}
          >
            <NavLink to="#" onClick={toggleSidebar} className="icon-link sidebar-toggle">
              {isSidebarOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </NavLink>
          </OverlayTrigger>
        </div>

        <ul className="list-unstyled components">
          {AdminSideBarNav.map((item, index) => (
            item.roles.includes(role) && (
              <li key={index} className="list-item">
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id={`tooltip-${item.text}`}>{item.text}</Tooltip>}
                >
                  <NavLink 
                    to={item.link} 
                    className={`icon-link ${getActiveClass(item.link)}`}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </NavLink>
                </OverlayTrigger>
                {isSidebarOpen && 
                  <NavLink 
                    className={`icon-link ${getActiveClass(item.link)}`}
                    to={item.link}
                  >
                    &nbsp;&nbsp;{item.text}
                  </NavLink>
                }
              </li>
            )
          ))}
        </ul>

        <ul className="list-unstyled bottom-links">
          <li className="list-item">
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-profile">Profile</Tooltip>}
            >
              <NavLink 
                to="/admin/profile" 
                className={`icon-link ${getActiveClass('/admin/profile')}`}
              >
                <FontAwesomeIcon icon={faUserCircle} />
              </NavLink>
            </OverlayTrigger>
            {isSidebarOpen && 
              <NavLink 
                className={`icon-link ${getActiveClass('/admin/profile')}`}
                to="/admin/profile"
              >
                &nbsp;&nbsp;Profile
              </NavLink>
            }
          </li>
          <li className="list-item">
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-logout">Logout</Tooltip>}
            >
              <NavLink 
                to="#" 
                onClick={() => logoutUser()} 
                className={`icon-link ${getActiveClass('#')}`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </NavLink>
            </OverlayTrigger>
            {isSidebarOpen && 
              <NavLink 
                className={`icon-link ${getActiveClass('#')}`}
                to="#" 
                onClick={() => logoutUser()} 
              >
                &nbsp;&nbsp;Logout
              </NavLink>
            }
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  role: state?.auth?.role,
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
