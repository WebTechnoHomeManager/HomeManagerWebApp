import '../css/App.scss';
import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ChatService from '../services/ChatService';
import sendIcon from '../images/icons/send-message.png';

class Messaging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idUser: 2,
            idRecipient: 1,
            message: "",
            sentMessages: []
        }
        this.sendMessage = this.sendMessage.bind(this); 
        this.handleChangeMessage = this.handleChangeMessage.bind(this); 
        this.handleEnterMessage = this.handleEnterMessage.bind(this);
        this.getSentMessages = this.getSentMessages.bind(this); 
    }

    sendMessage(){
        var message = this.state.message.trim();

        if (message != ""){
            var nowDate = new Date();
            var nowDateWithoutTimeZone = nowDate.setTime(nowDate.getTime() - new Date().getTimezoneOffset()*60*1000)
    
            var newMessage = {
                idSender: this.state.idUser, 
                idRecipient: this.state.idRecipient, 
                message: message,
                datetime: nowDateWithoutTimeZone
            };
    
    
            this.setState({ message: "" }); // not in the then so the input is cleared with no delay
    
            ChatService.sendMessage(newMessage).then((resp) => {
                
            });
        }
        
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
        this.getSentMessages();
    }

    scrollBarToBottom(){
        var scrollDiv = document.getElementById("message-view");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }

    getSentMessages(){
        ChatService.getMessagesBetweenTwoUsers(this.state.idUser, this.state.idRecipient).then((resp) => {
            console.log(resp.data)
            this.setState({sentMessages: resp.data});
            this.scrollBarToBottom();
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
                            <div id="message-view" className="m-2">
                                {this.state.sentMessages.map(message => 

                                    <div>
                                    {message.idSender == this.state.idUser ?

                                        (<Col key={message.id} style={{padding:0, "text-align":"right"}}>
                                            <div className="message sentMessage">
                                                {message.message}
                                            </div>
                                        </Col>)
                                        :
                                        (<Col key={message.id} style={{padding:0}}>
                                            <div className="message receivedMessage">
                                                {message.message}
                                            </div>
                                        </Col>)
                                    }
                                    </div>

                                    
                                )}
                                </div>
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
                                                        onClick={this.sendMessage} />
                                                
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


