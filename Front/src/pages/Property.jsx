import React, { Component, useState } from 'react';
import { Container, Form, Button, Row, Col, Accordion, Card, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import PropertyService from '../services/PropertyService';
import photo from '../images/houses/house1.jpg';
import userIcon from '../images/icons/user.png';

class Property extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            property: {
                property_services: [],
                property_restrictions: [],
                property_type: {},
                owner: {}
            }
        }
    }

    componentDidMount(){
        PropertyService.getPropertyById(this.state.id).then(res => {
            this.setState({property: res.data});
        })
    }

    render() {
        return (
            
            <div>
                <Container className="my-5">
                    <h3 className="center">{this.state.property.title}</h3>
                    <Row>
                        <Image src={photo} className="my-3 img-fluid mx-auto d-block banner" style={{width: "30%"}}/>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Card className="my-3">
                                <Card.Body>
                                    <Row>
                                        <Card.Title>{this.state.property.property_type.name} for {this.state.property.total_occupancy} occupant(s)</Card.Title>
                                        <Card.Text>{this.state.property.description}</Card.Text>
                                        <Card.Text>Address: {this.state.property.address}, {this.state.property.city}</Card.Text>
                                        
                                        <Card.Text>Required services:
                                            <ul>
                                                {this.state.property.property_services.map(service => 
                                                    <li key={service.id} className="card-list-items">{service.name}</li>
                                                )}
                                            </ul>
                                        </Card.Text>
                                        <Card.Text>Constraints to respect:
                                            <ul>
                                                {this.state.property.property_restrictions.map(restriction => 
                                                    <li key={restriction.id} className="card-list-items">{restriction.name}</li>
                                                )}
                                            </ul>
                                        </Card.Text>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6}>
                            <Card className="my-3">
                                <Card.Body>
                                    <Card.Title>Owner</Card.Title>
                                    <Image src={userIcon} className="my-3 d-block" style={{width: "65px"}}/>
                                    <Card.Text>{this.state.property.owner.first_name} {this.state.property.owner.last_name}</Card.Text>
                                    <Button as="input" type="button" value="More information"/>
                                    <Button as="input" type="button" value="Contact the owner"/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {/* <pre>{JSON.stringify(this.state.property, null, 2)}</pre> */}
            </div>
        )
    }
} export default Property;