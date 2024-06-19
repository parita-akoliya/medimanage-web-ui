import { Component } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

interface SubMenuProps {
    icon: IconDefinition;
    title: string;
    items: any[];
}

interface SubMenuState {
    collapsed: boolean;
}


class SubMenu extends Component<SubMenuProps, SubMenuState> {
    constructor(props: any) {
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
            <Nav.Item className={classNames({ open: !collapsed })}>
                <Accordion>
                    <Accordion.Header
                        as={Nav.Link}
                        variant="link"
                        eventKey="0"
                        onClick={this.toggleNavbar}
                    >
                        <FontAwesomeIcon icon={icon} className="mr-2" />
                        {title}
                        <FontAwesomeIcon
                            icon={collapsed ? faCaretDown : faCaretUp}
                            className="float-right"
                        />
                    </Accordion.Header>

                    <Accordion.Collapse eventKey="0">
                        <nav className="nav flex-column">
                            {items.map((item) => (
                                <a
                                    className={`nav-link nav-item pl-5 ${item === "Active" ? "active" : ""
                                        } `}
                                    href="/"
                                    key={item}
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
