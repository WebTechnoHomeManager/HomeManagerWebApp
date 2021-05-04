import logo from '../images/logo.png';
import React, { Component } from 'react';
import { Container, Row, Col, Image, DropdownButton, Dropdown, } from 'react-bootstrap';

class Navbar extends Component {
    render() {
        return (

            <Container fluid className="py-2" id="header">
                <Row>
                    <Image className="col-auto" src={logo} alt="logo" />
                    <Col></Col>
                    <Col sm="auto">FAQ</Col>
                    <DropdownButton id="dropdown-basic-button" className="col-auto" title="Log in" >
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </Row>

            </Container>
        )
    }
} export default Navbar;
