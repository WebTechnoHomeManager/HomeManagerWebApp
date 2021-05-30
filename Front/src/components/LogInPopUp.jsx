import React, { Component } from 'react';
import { Form, Button, Row, Col, Accordion, Card, Modal } from 'react-bootstrap';
import LogInPopUpContent from './LogInPopUpContent';

class LogInPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.show,
            needToSignUp: false
        };

        this.displaySignUpPopUp = this.displaySignUpPopUp.bind(this);
    }

    displaySignUpPopUp(){
        this.setState({ needToSignUp: true });
    }
   
    render() {

        var contentToDisplay = ""; 
        if (this.state.needToSignUp) {
            
        } else {
            contentToDisplay = <LogInPopUpContent 
                                    displaySignUpPopUp={this.displaySignUpPopUp}
                                    logIn={this.props.logIn}/>
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