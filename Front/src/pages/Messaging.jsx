import '../css/App.scss';
import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ChatService from '../services/ChatService';
import sendIcon from '../images/icons/send-message.png';
import { Redirect } from "react-router-dom";
import { ArrowClockwise, PersonCircle, StarFill } from 'react-bootstrap-icons';

class Messaging extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {},
            recipient: {},
            message: "",
            sentMessagesBetweenTheTwo: [],
            distinctDatesMessages: [],
            interlocutorsList: [],
            newContact: this.props.location.state ? this.props.location.state.newInterlocutor : {}
        }

        this.sendMessage = this.sendMessage.bind(this); 
        this.handleChangeMessage = this.handleChangeMessage.bind(this); 
        this.handleEnterMessage = this.handleEnterMessage.bind(this);
        this.getSentMessages = this.getSentMessages.bind(this); 
        this.getInterlocutors = this.getInterlocutors.bind(this); 
        this.handleClickInterlocutor = this.handleClickInterlocutor.bind(this);
        this.groupMessagesByDate = this.groupMessagesByDate.bind(this); 
        this.formatTime = this.formatTime.bind(this);

        this.getInterlocutors();
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
                this.getSentMessages();
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

    scrollBarToBottom(){
        var scrollDiv = document.getElementById("message-view");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }

    getSentMessages(){
        ChatService.getMessagesBetweenTwoUsers(this.state.user.id, this.state.recipient.id).then((resp) => {
            this.groupMessagesByDate(resp.data);
            this.scrollBarToBottom();
        });
    }

    groupMessagesByDate(messages){

        var messagesListByDate = messages.reduce(
            function (result, message) {
                var date = new Date(message.datetime);
                var formattedDate = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "-"
                                    + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" 
                                    + date.getFullYear();
                result[formattedDate] = result[formattedDate] || [];
                result[formattedDate].push(message);
                return result;
            }, Object.create(null));

        this.setState({sentMessagesBetweenTheTwo: messagesListByDate});
    }

    formatTime(datetime){
        var date = new Date(datetime);
        var hours = date.getUTCHours() < 10 ? ("0" + date.getUTCHours()) : date.getUTCHours();
        var minutes = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes();

        return hours + ":" + minutes;
    }

    getInterlocutors(){
        ChatService.getIntercutorsWith(this.state.user.id).then((resp) => {
            var interlocutorsList = resp.data;
            var indexToSelect = 0;

            if (this.state.newContact.id != undefined){
                var indexNewContactIndexInInterlocutorsList = resp.data.findIndex(x => x.id === this.state.newContact.id);
                if (indexNewContactIndexInInterlocutorsList == -1){
                    interlocutorsList.unshift(this.state.newContact); // unshift = push at the beginning
                } else {
                    indexToSelect = indexNewContactIndexInInterlocutorsList
                }
            }
            this.setState({interlocutorsList: interlocutorsList});
            if (interlocutorsList.length > 0){
                this.setState({recipient: this.state.interlocutorsList[indexToSelect]});
                this.getSentMessages();
            }
            
        });
    }

    handleClickInterlocutor(interlocutor){
        this.setState({recipient: interlocutor}, this.getSentMessages);
        // callback : permet d'attendre que le setState soit fait pour appeler la fonction

    }

    render(){
        if (this.state.user == "") {
            return <Redirect to='/' />;
        }
        var that = this;
        return (
            <div>
                <Container id="messaging">
                    <h1 className="center">My messaging</h1>
                    <div style={{flexDirection:"row", display:"flex", justifyContent: "flex-end", marginBottom:"-10px", padding:0}}>
                        <Button className="arrow-button shadow-none" style={{ fontSize: "0.8rem", padding:0}}
                                onClick={function(){ that.getSentMessages(); /*that.getInterlocutors()*/}}>
                            <ArrowClockwise style={{fontSize: "2rem"}}/>
                        </Button>
                    </div>
                    <Row id="messaging-row">
                        <Col md={3} sm={2} className="col-messaging" style={{padding: 0}}>
                            <Row id="messaging-user-list">
                                {this.state.interlocutorsList.map(interlocutor => 

                                    <Col sm={12} key={interlocutor.id} 
                                         className={"interlocutor " + (interlocutor.id == this.state.recipient.id ? "interlocutor-active" : "")}
                                         onClick={() => this.handleClickInterlocutor(interlocutor)}>
                                        {interlocutor.type == "Admin" &&
                                            <StarFill style={{marginRight:"10px", color:"#ffbb00"}}/>
                                        }
                                        {interlocutor.type == "Member" &&
                                            <PersonCircle style={{marginRight:"10px"}}/>
                                        }
                                        {interlocutor.firstName} {interlocutor.lastName} 
                                    </Col>
                                )}
                            </Row>
                        </Col>
                        <Col className="col-messaging">
                            <Row id="messaging-chat">
                                <div id="message-view" className="m-2">
                                    {Object.keys(this.state.sentMessagesBetweenTheTwo).map(date => 
                                        <>
                                            <Col className="messages-date">{date}</Col>
                                            {this.state.sentMessagesBetweenTheTwo[date].map(message => 

                                                <Col key={message.id} 
                                                    className={"p-0 " + (message.sender.id == this.state.user.id ? "sentMessage-parent" : "")}>
                                                    <div className="messages-time">{this.formatTime(message.datetime)}</div>
                                                    <div className={"message " + (message.sender.id == this.state.user.id ? "sentMessage" : "receivedMessage")}>
                                                        {message.message}
                                                    </div>
                                                
                                                </Col>
                                            )}
                                        </>    
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
                                                <Button className="strong-button" as="input" type="button" value="↑"
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


