import React, { Component } from 'react';
import { Form, Button, Row, Col, Accordion, Card, Modal } from 'react-bootstrap';

class LogInPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.show
        };

        this.onHide = this.onHide.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    onHide(){
        this.setState({ showModal: false });
    };

    logIn(){
        
    };
    
    render() {
        return (
               
            <Modal aria-labelledby="contained-modal-title-vcenter" centered 
                   show={this.state.showModal}
                   onHide={this.onHide}>

                <Modal.Header closeButton className="text-center d-block">
                    <Modal.Title id="contained-modal-title-vcenter" className="d-inline-block">
                        Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="" />
                    </Form.Group>
                    <div className="div-center-content">
                        <Button className="center" onClick={this.logIn}>Log in</Button>
                    </div>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

        );
      }
} export default LogInPopUp;