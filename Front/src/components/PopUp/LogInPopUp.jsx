import React, { Component } from 'react';
import { Form, Button, Row, Col, Accordion, Card, Modal } from 'react-bootstrap';
import LogInPopUpContent from './LogInPopUpContent';
import SignUpPopUpContent from './SignUpPopUpContent';

class LogInPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.show,
            needToSignUp: false
        };

        this.displaySignUpPopUp = this.displaySignUpPopUp.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    displaySignUpPopUp(){
        this.setState({ needToSignUp: true });
    }

    logIn(user) {
        this.setState({ showModal: false });
        this.setState({ user: user });

        localStorage.setItem('user', JSON.stringify(user));
        if (this.props.setParentStateUser != undefined){
            this.props.setParentStateUser(user);
        } else {
            document.location.reload();
        }
    }

    render() {

        var contentToDisplay = ""; 
        if (this.state.needToSignUp) {
            contentToDisplay = <SignUpPopUpContent 
                                    displaySignUpPopUp={this.displaySignUpPopUp}
                                    logIn={this.logIn}/>
        } else {
            contentToDisplay = <LogInPopUpContent 
                                    displaySignUpPopUp={this.displaySignUpPopUp}
                                    logIn={this.logIn}/>
            
        }

        return (
            <Modal aria-labelledby="contained-modal-title-vcenter" centered 
                   show={this.state.showModal}
                   onHide={this.props.onHide}>
                
                {contentToDisplay}
                
            </Modal>
        );
    }
} export default LogInPopUp;