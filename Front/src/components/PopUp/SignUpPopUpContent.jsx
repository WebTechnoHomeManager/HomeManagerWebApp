import React, { Component } from 'react';
import { Form, Button, Row, Col, Accordion, Card, Modal } from 'react-bootstrap';
import UserService from '../../services/UserService';
import Moment from 'moment';

class SignUpPopUpContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.show,
            errorEmail: '',
            errorPassword: '',
            errorFirstName: '',
            errorLastName: '',
            errorTel: ''
        };

        this.tryToSignUp = this.tryToSignUp.bind(this);
        this.resetDisplayedErrors = this.resetDisplayedErrors.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
        this.isNameValid = this.isNameValid.bind(this);
        this.isTelValid = this.isTelValid.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    tryToSignUp(e){
        e.preventDefault();
        this.resetDisplayedErrors();

        const formData = new FormData(e.target);

        if(!this.isPasswordValid(formData.get("password"))){
            this.setState({ errorPassword: "Your password must have between 8 and 32 characters, " + 
            "including at least 1 lowercase letter, 1 uppercase letter, 1 digit and 1 special character" });
        } else if (!this.isNameValid(formData.get("firstName"))){
            this.setState({ errorFirstName: "Please enter a valid first name" });
        } else if (!this.isNameValid(formData.get("lastName"))){
            this.setState({ errorLastName: "Please enter a valid last name" });
        } else if (!this.isTelValid(formData.get("tel"))){
            this.setState({ errorTel: "Pattern: 555-____" });
        } else {
            this.createAccount(formData);
        }
    }

    resetDisplayedErrors(){
        this.setState({ errorEmail: '' });
        this.setState({ errorPassword: '' });
        this.setState({ errorFirstName: '' });
        this.setState({ errorLastName: '' });
        this.setState({ errorTel: '' });
    }

    isPasswordValid(password){
        var regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$");
        return regex.test(password);
    }

    isNameValid(name){
        var regex = new RegExp("^[^0-9]{2,}$");
        return regex.test(name);
    }

    isTelValid(telNumber){
        var regex = new RegExp("^555-[0-9]{4}$");
        return regex.test(telNumber);
    }

    createAccount(formData){
        var nowDate = new Date();
        var nowDateWithoutTimeZone = nowDate.setTime(nowDate.getTime() - new Date().getTimezoneOffset()*60*1000)

        var data = {
            email: formData.get("email"),
            password: formData.get("password"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            tel: formData.get("tel"),
            dateBirth: Moment(formData.get("dateBirth")).format('YYYY-MM-DD'),
            dateRegistration: nowDateWithoutTimeZone,
            type: "Member"
        }

        UserService.createUser(data).then((resp) => {
            var createdUser = resp.data;

            if (createdUser == ""){
                this.setState({ errorEmail: "Email address already used" });
            } else {
                this.props.logIn(createdUser);
            }         
        });
    };
    


    render() {
        
        return (
            <>
                <Modal.Header closeButton className="text-center d-block">
                    <Modal.Title id="contained-modal-title-vcenter" className="d-inline-block">
                        Sign up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.tryToSignUp}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" required/>
                            <Form.Text className="error-form">{this.state.errorEmail}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" required/>
                            <Form.Text className="error-form">{this.state.errorPassword}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="firstName" required/>
                            <Form.Text className="error-form">{this.state.errorFirstName}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control name="lastName" required/>
                            <Form.Text className="error-form">{this.state.errorLastName}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birth date</Form.Label>
                            <Form.Control type="date" name="dateBirth" required/>
                            <Form.Text className="error-form"></Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tel</Form.Label>
                            <Form.Control type="tel" name="tel" defaultValue="555-" maxlength="8" required/>
                            <Form.Text className="error-form">{this.state.errorTel}</Form.Text>
                        </Form.Group>
                        <div className="div-center-content">
                            <Button className="center strong-button" type="submit">Sign up</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </>
        );
    }
} export default SignUpPopUpContent;