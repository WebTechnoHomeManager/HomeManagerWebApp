import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import house1 from '../images/houses/house1.jpg';
import house2 from '../images/houses/house2.jpg';
import house3 from '../images/houses/house3.jpg';
import house4 from '../images/houses/house4.jpg';

class HighlightedProperties extends Component {

    render() {
        return (
            <Row>
                <h2>Recently added...</h2>
                <Col>
                    <h4>Paris</h4>
                    <Image src={house1} className="img-fluid mx-auto d-block" />
                </Col>
                <Col>
                    <h4>Lille</h4>
                    <Image src={house2} className="img-fluid mx-auto d-block" />
                </Col>
                <Col>
                    <h4>Marseille</h4>
                    <Image src={house3} className="img-fluid mx-auto d-block" />
                </Col>
                <Col>
                    <h4>Nice</h4>
                    <Image src={house4} className="img-fluid mx-auto d-block" />
                </Col>
            </Row>
        )
    }
} export default HighlightedProperties;