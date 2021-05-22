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
            user: localStorage.getItem('user'),
            recipient: 3,
            message: "",
            sentMessagesBetweenTheTwo: [],
            interlocutorsList: []
        }



        this.sendMessage = this.sendMessage.bind(this); 
        this.handleChangeMessage = this.handleChangeMessage.bind(this); 
        this.handleEnterMessage = this.handleEnterMessage.bind(this);
        this.getSentMessages = this.getSentMessages.bind(this); 
        this.getInterlocutors = this.getInterlocutors.bind(this); 
    }

    sendMessage(){
        var message = this.state.message.trim();

        if (message != ""){
            var nowDate = new Date();
            var nowDateWithoutTimeZone = nowDate.setTime(nowDate.getTime() - new Date().getTimezoneOffset()*60*1000)
    
            var newMessage = {
                sender: this.state.user, 
                recipient: this.state.recipient, 
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
        this.getInterlocutors();
    }

    scrollBarToBottom(){
        var scrollDiv = document.getElementById("message-view");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }

    getSentMessages(){
        //changer ici
        ChatService.getMessagesBetweenTwoUsers(this.state.user.id, this.state.recipient.id).then((resp) => {
            console.log(resp.data)
            this.setState({sentMessagesBetweenTheTwo: resp.data});
            this.scrollBarToBottom();
        });
    }

    getInterlocutors(){
        //changer ici
        ChatService.getIntercutorsWith(this.state.user.id).then((resp) => {
            console.log(resp.data)
            this.setState({interlocutorsList: resp.data});
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
                                {this.state.interlocutorsList.map(message => 

                                    <Col sm={12} key={message.id}>
                                        cd
                                    </Col>
                                )}
                            </Row>
                        </Col>
                        <Col className="col-messaging">
                            <Row id="messaging-chat">
                            <div id="message-view" className="m-2">
                                {this.state.sentMessagesBetweenTheTwo.map(message => 

                                    <Col key={message.id} 
                                         className={"p-0 " + (message.sender.id == this.state.idUser ? "sentMessage-parent" : "")}>

                                        <div className={"message " + (message.sender.id == this.state.idUser ? "sentMessage" : "receivedMessage")}>
                                            {message.message}
                                        </div>
                                    </Col>
                                    
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


