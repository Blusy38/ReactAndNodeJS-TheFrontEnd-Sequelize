import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
class MyNavBar extends Component {
    render() { 
        return ( 
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home/">Home</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/users">Users</Nav.Link>
              <Nav.Link href="/products">Users2</Nav.Link>
            </Nav>
          </Navbar>
         );
    }
}
 
export default MyNavBar;