import React from 'react'
import logo from './commons/images/logo.jpg';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/admin/home">


                <img src={logo} width={"50"}
                     height={"55"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >


                        <DropdownItem>
                            <NavLink href="/admin/users">Users</NavLink>
                        </DropdownItem>

                        <DropdownItem>
                            <NavLink href="/admin/device">Devices</NavLink>
                        </DropdownItem>

                        <DropdownItem>
                            <NavLink href="/admin/userDevices">User Devices</NavLink>
                        </DropdownItem>

                        <DropdownItem>
                            <NavLink href="/admin/chat">Chat</NavLink>
                        </DropdownItem>




                    </DropdownMenu>
                </UncontrolledDropdown>

            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar
