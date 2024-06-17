import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import classes from './AdminSideBar.module.scss';
import AdminSideBarNav from './AdminSideBarNav';
import SidebarContext from '../../contexts/Sidebar';
import { connect } from 'react-redux';
import { logoutRequest } from '../../../store/actions/authActions';

interface AdminSideBarProps {
  width: number;
  navigate: ReturnType<typeof useNavigate>;
  logoutUser: () => void;
}

interface AdminSideBarState {
  activeIndex: number;
}

class AdminSideBar extends Component<AdminSideBarProps, AdminSideBarState> {
  static contextType = SidebarContext;

  constructor(props: AdminSideBarProps) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  openSidebarHandler = (width: number) => {
    if (width <= 768) {
      document.body.classList.toggle('sidebar__open');
    }
  };

  logoutHandler = () => {
    this.props.logoutUser();
  };

  render() {
    const { activeIndex } = this.state;
    const { width } = this.props;
    const sidebarCtx: any = this.context;

    return (
      <div className={`${classes.sidebar} ${!sidebarCtx.isOpen && classes.sidebar_close}`}>
        <div className={classes.sidebar__logo}>
          {/* <img src={favicon} alt="Logo"  /> Ensure to provide alt text for images */}
        </div>
        <div className={classes.sidebar__menu}>
          {AdminSideBarNav.map((nav, index) => (
            <Link
              to={nav.link}
              key={`nav-${index}`}
              className={`${classes.sidebar__menu__item} ${activeIndex === index && classes.active}`}
              onClick={() => this.openSidebarHandler(width)}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={nav.icon} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>
                {nav.text}
              </div>
            </Link>
          ))}
        </div>

        <div className={[classes.sidebar__menu, classes.logout].join(' ')}>
          <div
            className={classes.sidebar__menu__item}
            onClick={this.logoutHandler}
          >
            <div className={classes.sidebar__menu__item__icon}>
              <Icon icon="tabler:logout" />
            </div>
            <div className={classes.sidebar__menu__item__txt}>Logout</div>
          </div>
        </div>
      </div>
    );
  }
}

function addHooksTo(Component: any) {
  return function CompWithHooks(props: any) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logoutRequest()),
});

export default connect(null, mapDispatchToProps)(addHooksTo((AdminSideBar)));
