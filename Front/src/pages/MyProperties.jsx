//import logo from './logo.svg';
import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Form, Accordion } from 'react-bootstrap';
import photo from '../images/houses/house1.jpg';
import { Pencil, Trash, PlusCircle, ArrowDown } from 'react-bootstrap-icons';
import UpdatePropertyPopUp from '../components/PopUp/UpdatePropertyPopUp';
import CreatePropertyPopUp from '../components/PopUp/CreatePropertyPopUp';
import { Redirect } from "react-router-dom";
import Moment from 'moment';

class MyProperties extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            properties: [],
            addModalShow1: false,
            addModalShow2: false,
            propertyID: null
        }
        this.deleteProperty = this.deleteProperty.bind(this);
        this.showUpdatePopUp = this.showUpdatePopUp.bind(this);
        this.updateDone = this.updateDone.bind(this);
        this.createDone = this.createDone.bind(this);
    }


    componentDidMount() {
        PropertyService.getPropertiesByOwnerId(this.state.user.id).then((res) => {
            this.setState({ properties: res.data });
        });
    }

    deleteProperty(propertyId) {
        PropertyService.deleteProperty(propertyId).then((res) => {
            this.setState({properties: this.state.properties.filter(property => property.id !== res.data.deletedId)});
        });
    }

    showUpdatePopUp(propertyId) {
        this.setState({ propertyID: propertyId, addModalShow2: true });
    }

    updateDone(updatedProperty){
        this.setState({ addModalShow2: false });

        const properties = this.state.properties.slice();
        var index = this.state.properties.findIndex(property => property.id == this.state.propertyID)

        properties[index] = updatedProperty;
        this.setState({ properties: properties });
    }

    createDone(createdProperty){
        this.setState({ addModalShow1: false });

        var properties = this.state.properties;
        properties.unshift(createdProperty);
        this.setState({ properties: properties });
    }

    render() {

        if (JSON.parse(localStorage.getItem('user')).type != "Member") {
            return <Redirect to='/' />;
        }
        return (

            <div>
                <h1 className="center">My Properties</h1>
                <div className="div-center-content">
                    <Button className="strong-button" variant="primary" onClick={() => this.setState({ addModalShow1: true })}>
                        <PlusCircle /> Add a property
                    </Button>
                    <CreatePropertyPopUp
                        show={this.state.addModalShow1}
                        onCreateDone={this.createDone}
                    />
                </div>
                <Container className="my-5">
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={10}>
                            <h4>{this.state.properties.length + (this.state.properties.length > 1 ? " properties" : " property")}</h4>
                            {this.state.properties.map(property => 
                                <Card className="my-3">
                                    <Card.Header>
                                        <Card.Title style={{marginBottom: 0}}>{property.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col style={{ textAlign: 'center' }}>
                                                <Card.Img variant="top" src={photo} style={{marginBottom: "10px"}}/>
                                                <Button className="soft-button" onClick={() => this.showUpdatePopUp(property.id)}>
                                                    <Pencil /> Update
                                                </Button>
                                                <Button className="soft-button" onClick={() => { if (window.confirm('Are you sure you wish to delete this property?')) this.deleteProperty(property.id) }}>
                                                    <Trash /> Delete</Button>
                                            </Col>
                                            <Col>
                                                <Card.Text>Type: {property.propertyType.name}</Card.Text>
                                                <Card.Text>Total occupancy: {property.totalOccupancy}</Card.Text>
                                                <Card.Text>Address: {property.address}</Card.Text>
                                                <Card.Text>City: {property.city}</Card.Text>
                                                <Card.Text>Services: {property.propertyServices.map(function (d, idx) {
                                                    return (<li key={idx}>{d.name}</li>)
                                                })}</Card.Text>
                                                <Card.Text>Constraints: {property.propertyRestrictions.map(function (d, idx) {
                                                    return (<li key={idx}>{d.name}</li>)
                                                })}</Card.Text>
                                            </Col>
                                            <Col style={{borderLeft: "1px solid #d8d8d8"}}>
                                                <Accordion style={{ color: "white" }} className="col-auto">
                                                    <Card style={{ backgroundColor: "#FF584D" }}>
                                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                                            <ArrowDown/> Upcoming reservations
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                                <Form.Check
                                                                    name={"upcoming"}
                                                                    label={"Upcoming Reservations"}></Form.Check>
                                                                <Form.Check
                                                                    name={"previous"}
                                                                    label={"Previous Reservations"}></Form.Check>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                                <Card.Text>{property.reservations.map(function (d, idx) {
                                                    return (<li key={idx}> From {Moment(d.start_date).format('DD-MM-YYYY')} to {Moment(d.end_date).format('DD-MM-YYYY')} - by {d.reservationUser.firstName} {d.reservationUser.lastName}</li>)
                                                })}</Card.Text></Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>

                {this.state.propertyID != null &&
                    <UpdatePropertyPopUp
                        show={this.state.addModalShow2}
                        onUpdateDone={this.updateDone}
                        propertyId={this.state.propertyID} key={this.state.propertyID}>
                    </UpdatePropertyPopUp>
                }
            </div >


        )
    }
}

export default MyProperties;
