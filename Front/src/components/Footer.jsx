import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Envelope, EnvelopeFill, InfoCircle, InfoCircleFill } from 'react-bootstrap-icons';
import LogInPopUp from './PopUp/LogInPopUp';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router';
import UserService from '../services/UserService';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogInPopUp: false,
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {},
            isUserLoggedIn: localStorage.getItem("user") != ""
        }
        this.goToMessagingPage = this.goToMessagingPage.bind(this);
        this.hideLogInPopUp = this.hideLogInPopUp.bind(this);
    }

    goToMessagingPage() {
        if (this.state.isUserLoggedIn){
            UserService.getUserById(4).then((res) => {
                this.props.history.push({
                    pathname: '/messaging',
                    state: { newInterlocutor: res.data }
                });
            })
        } else {
            this.setState({ showLogInPopUp: true });
        }
    }

    hideLogInPopUp() {
        this.setState({ showLogInPopUp: false });
    }

    render() {
        return (

            <Container fluid className="py-2" id="footer">
                <Row className="align-items-end">
                    <Col sm={2} >
                        <div>General Conditions of Use</div>
                    </Col>
                    <Col sm={8} style={{textAlign: "center"}} className="my-auto">
                        Designed by Sarah HEOUAINE - My-Linh LE THIEN - Elia TSO - Caroline YAN
                    </Col>
                    <Col sm={2} style={{textAlign: "right"}}>
                        <Button className="soft-button blue-transparent-soft-button btn-secondary"
                                    style={{fontSize: "0.85rem"}}
                                    onClick={this.goToMessagingPage}
                                    disabled={this.state.user.id != undefined && this.state.user.type == "Admin"}>
                            <EnvelopeFill />  Contact admin
                        </Button>
                        <div>© 2021 Home Manager</div>
                    </Col>
                </Row>
                <Row>
                    <Col style={{flexDirection:"row", display:"flex", justifyContent: "space-between"}}>
                        
                        
                    </Col>
                </Row>
  
                <LogInPopUp
                    show={this.state.showLogInPopUp} key={this.state.showLogInPopUp}
                    onHide={this.hideLogInPopUp}/>
            </Container>
        )
    }
} export default withRouter(Footer);
