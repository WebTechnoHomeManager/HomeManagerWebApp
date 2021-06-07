import logo from '../images/logo.png';
import React, { Component } from 'react';
import { Container, Row, Col, Image, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LogInPopUp from '../components/PopUp/LogInPopUp';
import { AlignCenter } from 'react-bootstrap-icons';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            logInPopUp: false
        }

        if (localStorage.getItem('user') == null) {
            localStorage.setItem('user', '');
        }

        this.myRef = React.createRef();
        
        this.showLogInPopUp = this.showLogInPopUp.bind(this);
        this.updateUserAfterLogIn = this.updateUserAfterLogIn.bind(this);
        this.onHideLogInPopUp = this.onHideLogInPopUp.bind(this);
        
        this.logOut = this.logOut.bind(this);
        
    }

    componentDidMount() {
        var user = localStorage.getItem('user');
        if (user != "") {
            this.setState({ user: JSON.parse(user) });
        }
    }

    showLogInPopUp() {
        this.setState({ logInPopUp: true });
    }

    logOut() {
        localStorage.setItem('user', '');
        this.setState({ user: {} });
    }

    onHideLogInPopUp() {
        this.setState({ logInPopUp: false });
    };

    updateUserAfterLogIn(user){
        this.setState({ user: user });
    }

    render() {
        var dropDownItems = <Col sm="auto">
            <Button className="strong-button" as="input" type="button" value="Log in" onClick={this.showLogInPopUp} />
        </Col>

        var title = "";

        var userType = this.state.user.type;
        if (userType != undefined) {
            if (userType.toLowerCase() == 'member') {
                dropDownItems = <DropdownButton className="col-auto dropdown-navbar" title="My space" >
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="/messaging">Messaging</Dropdown.Item>
                    <Dropdown.Item href="/myreservations">My reservations</Dropdown.Item>
                    <Dropdown.Item href="/myproperties">My properties</Dropdown.Item>
                    <Dropdown.Item onClick={this.logOut} href="/">Log out</Dropdown.Item>
                </DropdownButton>
            } else if (userType.toLowerCase() == 'admin') {
                dropDownItems = <DropdownButton id="dropdown-basic-button" className="col-auto" title="Back office" >
                    <Dropdown.Item href="/messaging">Messaging</Dropdown.Item>
                    <Dropdown.Item href="/members">Members</Dropdown.Item>
                    <Dropdown.Item href="/offers">Offers</Dropdown.Item>
                    <Dropdown.Item onClick={this.logOut} href="/">Log out</Dropdown.Item>
                </DropdownButton>;
                title = <h3>Back Office Account</h3>
            }
        }

        return (

            <Container fluid className="py-2" id="header">

                <Row>
                    <Link to="/" className="col-auto" >
                        <Image src={logo} alt="logo" id="logo" />
                    </Link>
                    <Col>{title}</Col>

                    <Col sm="auto"><Button variant="outline-light" href="/faq">FAQ</Button></Col>
                    {dropDownItems}

                    {/* key: to rerender when the key change */}
                    <LogInPopUp container={this.state.container}
                        show={this.state.logInPopUp} key={this.state.logInPopUp}
                        setParentStateUser={this.updateUserAfterLogIn}
                        onHide={this.onHideLogInPopUp}/>

                </Row>
            </Container>

        )
    }
} export default Navbar;
