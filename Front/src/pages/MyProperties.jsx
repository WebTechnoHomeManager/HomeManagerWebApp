//import logo from './logo.svg';
import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Form, Accordion, DropdownButton, Dropdown, } from 'react-bootstrap';
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
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {},
            properties: [],
            showCreatePopUp: false,
            showUpdateModal: false,
            propertyID: null,
            selectedOptionByPropertyId: {}
        }
        this.deleteProperty = this.deleteProperty.bind(this);
        this.showUpdatePopUp = this.showUpdatePopUp.bind(this);
        this.updateDone = this.updateDone.bind(this);
        this.createDone = this.createDone.bind(this);
        this.hideCreatePopUp = this.hideCreatePopUp.bind(this);
        this.hideUpdatePopUp = this.hideUpdatePopUp.bind(this);
        this.displayPastReservations = this.displayPastReservations.bind(this);
        this.displayReservationsToCome = this.displayReservationsToCome.bind(this);
        
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
        this.setState({ 
            propertyID: propertyId, 
            showUpdateModal: true 
        });
    }

    updateDone(updatedProperty){
        this.hideUpdatePopUp();

        const properties = this.state.properties.slice();
        var index = this.state.properties.findIndex(property => property.id == this.state.propertyID)

        properties[index] = updatedProperty;
        this.setState({ properties: properties });
    }
    hideUpdatePopUp(){
        this.setState({ showUpdateModal: false });
    }

    createDone(createdProperty){
        this.hideCreatePopUp();

        var properties = this.state.properties;
        properties.unshift(createdProperty);
        this.setState({ properties: properties });
    }
    hideCreatePopUp(){
        this.setState({ showCreatePopUp: false });
    }

    displayPastReservations(propertyId){
        var newSelectedOptionByPropertyId = this.state.selectedOptionByPropertyId;
        newSelectedOptionByPropertyId[propertyId] = 0;
        this.setState({selectedOptionByPropertyId: newSelectedOptionByPropertyId});
    }

    displayReservationsToCome(propertyId){
        var newSelectedOptionByPropertyId = this.state.selectedOptionByPropertyId;
        newSelectedOptionByPropertyId[propertyId] = 1;
        this.setState({selectedOptionByPropertyId: newSelectedOptionByPropertyId});
    }

    getFilterTitle(propertyId){
        var selectedOption = this.state.selectedOptionByPropertyId[propertyId];
        if (selectedOption == 0){
            return "Past reservations";
        }
        return "Reservations to come";
    }

    render() {
        if (this.state.user == "" || this.state.user.type != "Member") {
            return <Redirect to='/' />;
        }
        return (
            <div>
                <h1 className="center">My Properties</h1>
                <div className="div-center-content">
                    <Button className="strong-button" variant="primary" onClick={() => this.setState({ showCreatePopUp: true })}>
                        <PlusCircle /> Add a property
                    </Button>
                    <CreatePropertyPopUp
                        show={this.state.showCreatePopUp} key={this.state.showCreatePopUp}
                        onCreateDone={this.createDone}
                        onHide={this.hideCreatePopUp} 
                    />
                </div>
                <Container className="my-5">
                    <Row>
                        <Col>
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
                                                <DropdownButton className="col-auto dropdown-filter" style={{marginBottom: "10px"}}
                                                                title={this.getFilterTitle(property.id)} >
                                                    <Dropdown.Item onClick={() => this.displayReservationsToCome(property.id)}
                                                                active={this.state.selectedOptionByPropertyId[property.id] == 1 || this.state.selectedOptionByPropertyId[property.id] == undefined}>
                                                        Reservations to come
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => this.displayPastReservations(property.id)}
                                                                active={this.state.selectedOptionByPropertyId[property.id] == 0}>
                                                        Past reservations
                                                    </Dropdown.Item>
                                                </DropdownButton>

                                                <Card.Text>
                                                    <ul>
                                                        {this.state.selectedOptionByPropertyId[property.id] == 0 &&
                                                        property.reservations
                                                        .filter(reservation => new Date(reservation.end_date) < new Date())
                                                        .sort((a, b) => a.start_date < b.start_date ? 1 : -1)
                                                        .map(pastReservation =>
                                                            <li key={pastReservation.id}> 
                                                                From {Moment(pastReservation.start_date).format('DD-MM-YYYY')} to {Moment(pastReservation.end_date).format('DD-MM-YYYY')} 
                                                                <p style={{textAlign: "right"}}>by {pastReservation.reservationUser.firstName} {pastReservation.reservationUser.lastName}</p>
                                                            </li>
                                                        )}

                                                        {(this.state.selectedOptionByPropertyId[property.id] == 1 || this.state.selectedOptionByPropertyId[property.id] == undefined) &&
                                                        property.reservations
                                                        .filter(reservation => new Date(reservation.start_date) > new Date() || (new Date(reservation.start_date) <= new Date() && new Date(reservation.end_date) >= new Date()))
                                                        .sort((a, b) => a.start_date > b.start_date ? 1 : -1)
                                                        .map(pastReservation =>
                                                            <li key={pastReservation.id}> 
                                                                From {Moment(pastReservation.start_date).format('DD-MM-YYYY')} to {Moment(pastReservation.end_date).format('DD-MM-YYYY')} 
                                                                <p style={{textAlign: "right"}}>by {pastReservation.reservationUser.firstName} {pastReservation.reservationUser.lastName}</p>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Container>

                {this.state.propertyID != null &&
                    <UpdatePropertyPopUp
                        show={this.state.showUpdateModal} 
                        onUpdateDone={this.updateDone}
                        onHide={this.hideUpdatePopUp} 
                        propertyId={this.state.propertyID} key={this.state.propertyID}>
                    </UpdatePropertyPopUp>
                }
            </div>
        )
    }
}

export default MyProperties;
