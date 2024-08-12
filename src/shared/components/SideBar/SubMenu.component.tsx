import { Component } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import './SubMenu.css'; 

interface SubMenuProps {
    icon: IconDefinition;
    title: string;
    items: string[]; 
}

interface SubMenuState {
    collapsed: boolean;
}

class SubMenu extends Component<SubMenuProps, SubMenuState> {
    constructor(props: SubMenuProps) {
        super(props);

        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };

    render() {
        const { icon, title, items } = this.props;
        const { collapsed } = this.state;

        return (
            <Nav.Item className={classNames('submenu', { open: !collapsed })}>
                <Accordion>
                    <Accordion.Header
                        as={Nav.Link}
                        eventKey="0"
                        onClick={this.toggleNavbar}
                        className="d-flex align-items-center justify-content-between"
                        aria-expanded={!collapsed}
                    >
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={icon} className="mr-2 submenu-icon" />
                            <span className="submenu-title">{title}</span>
                        </div>
                        <FontAwesomeIcon
                            icon={collapsed ? faCaretDown : faCaretUp}
                            className="submenu-toggle"
                        />
                    </Accordion.Header>

                    <Accordion.Collapse eventKey="0">
                        <nav className="nav flex-column submenu-content">
                            {items.map((item, index) => (
                                <a
                                    className={classNames('nav-link', 'nav-item', {
                                        'active': item === "Active"
                                    })}
                                    href="/"
                                    key={index}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </Accordion.Collapse>
                </Accordion>
            </Nav.Item>
        );
    }
}

export default SubMenu;
