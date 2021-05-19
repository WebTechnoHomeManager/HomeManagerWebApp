import '../css/App.scss';
import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ChatService from '../services/ChatService';

class Messaging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idSender: 2,
            idRecipient: 1,
            message: ""
        }
        this.sendMessage = this.sendMessage.bind(this); 
        this.handleChangeMessage = this.handleChangeMessage.bind(this); 
        this.handleEnterMessage = this.handleEnterMessage.bind(this);
        this.displayMessages = this.displayMessages.bind(this); 
    }

    sendMessage(){
        var newMessage = {
            idSender: this.state.idSender, 
            idRecipient: this.state.idRecipient, 
            message: this.state.message,
            datetime: new Date()
        };
        this.setState({ message: "" }); // not in the then so the input is cleared with no delay

        ChatService.sendMessage(newMessage).then((resp) => {
            
        });
    }

    handleChangeMessage(e){
        var message = e.target.value;
        this.setState({ message: message });
    }

    handleEnterMessage(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // So the page won't refresh after hitting enter
            this.sendMessage();
        }
    }

    componentDidMount(){
        this.displayMessages();
    }

    displayMessages(){
        ChatService.getMessagesBySenderAndRecipient(this.state.idSender, this.state.idRecipient).then((resp) => {
            console.log(resp.data)
            //this.setState({properties: resp.data});
        });
    }

    render(){
        return (
            <div>
                <Container id="messaging">
                    <h1 className="center">My messaging</h1>
                    <Row>
                        <Col sm={3} className="col-messaging">
                            <Row id="messaging-user-list">
                                <Col sm={12}>cd</Col>
                                <Col sm={12}>cd</Col>
                                <Col sm={12}>cd</Col>
                            </Row>
                        </Col>
                        <Col className="col-messaging">
                            <Row id="messaging-chat">
                                <div id="message-view" className="m-2">cd</div>
                                <div id="message-input" className="m-2">
                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Control onChange={this.handleChangeMessage}
                                                              value={this.state.message}
                                                              onKeyDown={this.handleEnterMessage}/>
                                            </Col>
                                            <Col sm="auto" className="ps-0">
                                                <Button as="input" type="button" value="↑"
                                                        onClick={this.sendMessage}/>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Messaging;


