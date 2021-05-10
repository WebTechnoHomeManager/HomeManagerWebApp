import '../css/App.scss';
import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class Messaging extends Component {

    constructor(props) {
        super(props);
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
                        <Col className="col-messaging">cd</Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Messaging;


