import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import house1 from '../images/houses/house1.jpg';
import house2 from '../images/houses/house2.jpg';
import house3 from '../images/houses/house3.jpg';
import house4 from '../images/houses/house4.jpg';
import PropertyService from '../services/PropertyService';

class HighlightedProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentProperties: []
        }
        
        PropertyService.getFourMostRecentProperties().then(res => {
            this.setState({ recentProperties: res.data });
            console.log(res.data);
        })

        this.viewProperty = this.viewProperty.bind(this);
    }
    
    
    viewProperty(id) {
        this.props.history.push({
            pathname: `/property/${id}`,
            //state: this.props.location.state
        })
    }

    render() {
        return (
            <Row>
                <h4>Recently added...</h4>
                {this.state.recentProperties.map(property => 
                    <Col key={property.id}>
                        <h5>{property.city}</h5>
                        <Image src={house1} className="img-fluid mx-auto d-block card-with-link" 
                               onClick={() => this.viewProperty(property.id)}/>
                    </Col>
                )}
            </Row>
        )
    }
} export default HighlightedProperties;