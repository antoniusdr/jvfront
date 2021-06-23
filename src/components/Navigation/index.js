import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function Navigation() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        VANDALIZED GANG
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Home" />
          <NavbarItem path="/submissions" linkText="All Submissions" />
          <NavbarItem path="/submit" linkText="Participate to contest" />
          <NavbarItem path="/archive" linkText="Archive" />
          <NavbarItem path="/createcontest" linkText="Create Contest" />
          <NavbarItem path="/allusers" linkText="Admin View" />
          {token ? (
            <>
              <NavbarItem path="/editprofile" linkText="Edit Profile" />
            </>
          ) : user.isAdmin ? (
            <NavbarItem path="/createcontest" linkText="Create Contest" />
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
