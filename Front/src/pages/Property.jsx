import React, { Component, useState } from 'react';
import { Container, Form, Button, Row, Col, Accordion, Card, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import PropertyService from '../services/PropertyService';
import photo from '../images/houses/house1.jpg';
import userIcon from '../images/icons/user.png';
import { Envelope, EnvelopeFill, InfoCircle, InfoCircleFill } from 'react-bootstrap-icons';

class Property extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            property: {
                propertyServices: [],
                propertyRestrictions: [],
                propertyType: {},
                owner: {}
            }
        }

        this.showPublicProfilePopUp = this.showPublicProfilePopUp.bind(this);
        this.goToMessagingPage = this.goToMessagingPage.bind(this);
    }

    componentDidMount() {
        PropertyService.getPropertyById(this.state.id).then(res => {
            this.setState({ property: res.data });
        })
    }

    showPublicProfilePopUp(){
        alert("TODO: Public profile popup");
    }

    goToMessagingPage(){
        this.props.history.push({
            pathname: '/messaging',
            state: {newInterlocutor: this.state.property.owner}
        });
    }

    render() {
        return (

            <div>
                <Container className="my-5">
                    <h3 className="center">{this.state.property.title}</h3>
                    <Row>
                        <Image src={photo} className="my-3 img-fluid mx-auto d-block banner" style={{ width: "30%" }} />
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Card className="my-3">
                                <Card.Body>
                                    <Row>
                                        <Card.Title>{this.state.property.propertyType.name} for {this.state.property.totalOccupancy} occupant(s)</Card.Title>
                                        <Card.Text>{this.state.property.description}</Card.Text>
                                        <Card.Text>Address: {this.state.property.address}, {this.state.property.city}</Card.Text>

                                        <Card.Text>Required services:
                                            <ul>
                                                {this.state.property.propertyServices.map(service =>
                                                    <li key={service.id} className="card-list-items">{service.name}</li>
                                                )}
                                            </ul>
                                        </Card.Text>
                                        <Card.Text>Constraints to respect:
                                            <ul>
                                                {this.state.property.propertyRestrictions.map(restriction =>
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
                                    <Row>
                                        <Col sm={"auto"} style={{paddingRight: 0}}>
                                            <Image style={{width: "50px"}} src={userIcon} className="my-3 d-block"/>
                                        </Col>
                                        <Col>
                                            <Card.Text style={{marginBottom: "0.2rem"}}>
                                                {this.state.property.owner.firstName} {(this.state.property.owner.lastName ? this.state.property.owner.lastName[0] : "") + "."}
                                            </Card.Text>
                                            <Button className="strong-button" style={{fontSize: "0.8rem"}}
                                                    onClick={this.showPublicProfilePopUp} >
                                                <InfoCircleFill/>
                                                  More information
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="div-center-content">
                                            <Button className="soft-button btn-secondary"
                                                    onClick={() => this.goToMessagingPage()}>
                                                <EnvelopeFill/>  Contact the owner
                                            </Button>
                                        </Col>
                                    </Row>
                                    
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
