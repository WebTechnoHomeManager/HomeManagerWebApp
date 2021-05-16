import logo from '../images/logo.png';
import React, { Component } from 'react';
import { Container, Row, Col, Image, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LogInPopUp from '../components/LogInPopUp';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userType: '',
            logInPopUp: false
        }

        this.myRef = React.createRef();

        this.showLogInPopUp = this.showLogInPopUp.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.onHidePopUp = this.onHidePopUp.bind(this);
    }

    componentDidMount() {
        var userType = localStorage.getItem('userType');
        //var userType = "Member";
        this.setState({ userType: userType });
    }

    showLogInPopUp() {
        this.setState({ logInPopUp: true });
    }

    
    logIn(data) {
        this.setState({ logInPopUp: false });

        var type = data.userType;
        var id = data.userId;
        localStorage.setItem('userType', type);
        localStorage.setItem('userId', id);
        this.setState({ userType: type });
    }

    logOut() {
        localStorage.setItem('userType', '');
        localStorage.setItem('userId', '');
        this.setState({ userType: '' });
    }

    onHidePopUp(){
        this.setState({ logInPopUp: false });
    };

    render() {

        var userType = this.state.userType;
        var dropDownItems = <Col sm="auto"><Button as="input" type="button" value="Log in" onClick={this.showLogInPopUp} /></Col>

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

            <Container fluid className="py-2" id="header" ref={c => !this.state.container && this.setState({ container: c })}>

                <Row>
                    <Link to="/" className="col-auto" >
                        <Image src={logo} alt="logo" id="logo" />
                    </Link>
                    <Col></Col>

                    <Col sm="auto">({this.state.userType.toUpperCase()[0]})</Col>
                    <Col sm="auto">FAQ</Col>
                    {dropDownItems}

                    {/* key: to rerender when the key change */}
                    <LogInPopUp container={this.state.container} 
                                show={this.state.logInPopUp} key={this.state.logInPopUp}
                                logIn={this.logIn}
                                onHide={this.onHidePopUp}/>
                 
                </Row>
            </Container>

        )
    }
} export default Navbar;
