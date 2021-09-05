import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const history = useHistory();

  const switchRoute = (link) => {
    history.push(link);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/users/logout", { withCredentials: "true" })
      .then((res) => {
        if (res.data.message === "Success") {
          localStorage.clear();
          switchRoute("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMyProfile = (e) => {
    switchRoute("/my-profile");
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="mx-3" href="/">
          OOAD Team Management
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <a></a>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={handleMyProfile}>
                  Moj profil
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>Odjavi se</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
export default NavBar;
