import React from 'react';
import logo from './commons/images/logo.jpg';
import {
    Nav,
    Navbar,
    NavbarBrand,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import LineChart from "./lineChart";

const textStyle = {
    color: 'white',
    textDecoration: 'none',
};

const NavigationBar2 = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/client/home1">
                <img src={logo} width={"50"} height={"35"} alt="Logo" />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                        Menu
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <NavLink href="/client/device">My Devices</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/client/energyConsumption">E Consumption</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/client/chat">Chat</NavLink>
                        </DropdownItem>
                    </DropdownMenu>

                </UncontrolledDropdown>
            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar2;
