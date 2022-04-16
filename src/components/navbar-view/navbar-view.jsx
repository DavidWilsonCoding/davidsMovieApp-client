import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import './navbar-view.scss';

export function NavbarView() {
    const user = localStorage.getItem('user');
    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="custom" variant="dark" className="fixed-top navbar-main">
            <Navbar.Brand href="#" className="navbar-logo">MyFlix</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="navbar-menu" id="basic-navbar-nav">
                <Nav activeKey={location.pathname}>
                    {isAuth() && (
                        <Nav.Link href={`/`} >Movies</Nav.Link>
                    )}
                    {isAuth() && (
                        <Nav.Link href={`/users/${user}`}  ><div className="navbar-link">Profile</div></Nav.Link>

                    )}
                    {isAuth() && (
                        <Nav.Link onClick={() => { onLoggedOut() }} >Logout</Nav.Link>
                    )}

                    {!isAuth() && (
                        <Nav.Link href="/" >Sign up or login</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}