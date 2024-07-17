import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';
import { Outlet } from 'react-router-dom';
import './AdminDashboardLayout.css';
import SideBar from '../../../shared/components/SideBar/SideBar.component';

interface AdminDashboardLayoutProps {
  logoutUser: () => void;
}

interface AdminDashboardLayoutState {
  isOpen: boolean;
  isMobile: boolean;
}

class AdminDashboardLayout extends Component<AdminDashboardLayoutProps, AdminDashboardLayoutState> {
  previousWidth: number;
  constructor(props: AdminDashboardLayoutProps) {
    super(props);
    this.state = {
      isOpen: true,
      isMobile: false
    };
    this.previousWidth = -1
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;
    console.log(isMobile, wasMobile, widthLimit);
    
    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  toggle = () => {
    console.log("fgfgf");

    this.setState({ isOpen: !this.state.isOpen });
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={3} md={2} className="component sidebar-col">
            <SideBar />
          </Col>
          <Col xs={8} md={9} className="main-content-col">
            <div className="main-content">
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
