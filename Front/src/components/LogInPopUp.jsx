import React, { Component } from 'react';
import { Form, Button, Row, Col, Accordion, Card, Modal } from 'react-bootstrap';
import UserService from '../services/UserService';

class LogInPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.show,
            errorUser: '',
            errorPassword: ''
        };

        this.tryToLogIn = this.tryToLogIn.bind(this);
        this.resetDisplayedErrors = this.resetDisplayedErrors.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    tryToLogIn(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        
        var data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        
        this.resetDisplayedErrors();

        UserService.checkAuthentication(data).then((resp) => {
            console.log(resp.data);

            if (resp.data.error){
                this.displayError(resp.data.error);
            } else if (resp.data.user != undefined){
                this.props.logIn(resp.data)
            }            
        });
        
    };
    
    resetDisplayedErrors(){
        this.setState({ errorUser: '' });
        this.setState({ errorPassword: '' });
    }

    displayError(error){
        if (error == "UserNotFound"){
            this.setState({ errorUser: "User not found" });
        } else if (error == "WrongPassword"){
            this.setState({ errorPassword: "Wrong password" });
        }
    }


    render() {
        return (
            <div>{this.state.showModal}
            <Modal aria-labelledby="contained-modal-title-vcenter" centered 
                   show={this.state.showModal}
                   onHide={this.props.onHide}>

                <Modal.Header closeButton className="text-center d-block">
                    <Modal.Title id="contained-modal-title-vcenter" className="d-inline-block">
                        Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.tryToLogIn}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="" name="email"/>
                            <Form.Text className="text-muted">{this.state.errorUser}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="" name="password"/>
                            <Form.Text className="text-muted">{this.state.errorPassword}</Form.Text>
                        </Form.Group>
                        <div className="div-center-content">
                            <Button className="center" type="submit">Log in</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal></div>

        );
      }
} export default LogInPopUp;