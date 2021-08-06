import React, { useState } from "react";
import {
  // Collapse,
  Navbar,
  // NavbarToggler,
  // NavbarBrand,
  // Nav,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        {/* <NavbarBrand className="ml-3" href="/">
          reactstrap
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <a></a>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Moj profil</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Odjavi se</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse> */}
      </Navbar>
    </div>
  );
}
export default NavBar;
