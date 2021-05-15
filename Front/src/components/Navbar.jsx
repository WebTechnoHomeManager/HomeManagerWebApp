import logo from '../images/logo.png';
import React, { Component } from 'react';
import { Container, Row, Col, Image, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userType: ''
        }

        this.logOut = this.logOut.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    componentDidMount() {
        var userType = localStorage.getItem('userType');
        this.setState({ userType: userType });
    }

    logIn(type) {
        localStorage.setItem('userType', type);
        this.setState({ userType: type });
    }

    logOut() {
        localStorage.setItem('userType', '');
        this.setState({ userType: '' });
    }

    render() {

        var userType = this.state.userType;
        var dropDownItems = <Col sm="auto"><Col sm="auto"><Button as="input" type="button" value="Log in as member" onClick={() => this.logIn('member')} /></Col>
            <Col sm="auto"><Button as="input" type="button" value="Log in as admin" onClick={() => this.logIn('admin')} /></Col></Col>

        if (userType.toLowerCase() == 'member') {
            dropDownItems = <DropdownButton id="dropdown-basic-button" className="col-auto" title="My space" >
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/messaging">Messaging</Dropdown.Item>
                <Dropdown.Item href="/myreservations">My reservations</Dropdown.Item>
                <Dropdown.Item href="/myproperties">My properties</Dropdown.Item>
                <Dropdown.Item onClick={this.logOut}>Log out</Dropdown.Item>
            </DropdownButton>
        } else if (userType.toLowerCase() == 'admin') {
            dropDownItems = <DropdownButton id="dropdown-basic-button" className="col-auto" title="My space" >
                <Dropdown.Item href="/messaging">Messaging</Dropdown.Item>
                <Dropdown.Item href="">Members</Dropdown.Item>
                <Dropdown.Item href="">Offers</Dropdown.Item>
                <Dropdown.Item onClick={this.logOut}>Log out</Dropdown.Item>
            </DropdownButton>
        }


        return (

            <Container fluid className="py-2" id="header">
                <Row>
                    <Link to="/" className="col-auto" >
                        <Image src={logo} alt="logo" id="logo" />
                    </Link>
                    <Col></Col>

                    {/* <Col sm="auto">({localStorage.getItem('userType').toUpperCase()[0]})</Col> */}
                    <Col sm="auto">({this.state.userType.toUpperCase()[0]})</Col>
                    <Col sm="auto">FAQ</Col>

                    {dropDownItems}
                </Row>

            </Container>
        )
    }
} export default Navbar;
