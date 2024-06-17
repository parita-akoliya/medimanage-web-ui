import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../../../shared/components/AdminSideBar/AdminSideBar';
import './AdminDashboardLayout.css';
import { Icon } from '@iconify/react';
import SidebarContext from '../../../shared/contexts/Sidebar';

interface AdminDashboardLayoutProps {
  logoutUser: () => void;
}

interface AdminDashboardLayoutState {
}

class AdminDashboardLayout extends Component<AdminDashboardLayoutProps, AdminDashboardLayoutState> {
  static contextType = SidebarContext;
  context!: React.ContextType<typeof SidebarContext>;
  constructor(props: AdminDashboardLayoutProps) {
    super(props);
    this.state = {
    };
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

    openSidebarHandler = () => {
      
      const { toggleSidebar } = this.context as any;
      const { width } = this.props as any;
      toggleSidebar();
  
      if (width <= 768) {
        document.body.classList.toggle("sidebar__open");
      }
    };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={3} md={2} className="sidebar-col">
            <AdminSideBar width={120} />
          </Col>
          <Col xs={9} md={10} className="main-content-col">
            <div className="main-content">
              <div className='topHeader'>
              <div className='icon-left'
        
        onClick={this.openSidebarHandler}
      >
        <Icon icon="ci:menu-alt-03" width="24" />
      </div>
      <div className="user-info" onClick={this.openSidebarHandler}>
                <span className="avatar">
                  <Icon icon="fa-solid:user-circle" width="35" height="35" />
                </span>
                <span className="user-name">Parita</span>
              </div>
              </div>
           
        <hr></hr>
        <br></br>
        {/* <br></br> */}
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
});

export default connect(null, mapDispatchToProps)(AdminDashboardLayout);
