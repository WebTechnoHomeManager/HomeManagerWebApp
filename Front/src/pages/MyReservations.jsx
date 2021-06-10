import React, { Component } from 'react';
import ReservationService from '../services/ReservationService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { Trash, PersonLinesFill } from 'react-bootstrap-icons';
import Moment from 'moment';
import { Redirect } from "react-router-dom";
import PropertyPhotoService from '../services/PropertyPhotoService';
import photoPlaceholder from '../images/houses/placeholder.jpg';
import { Envelope, EnvelopeFill, InfoCircle, InfoCircleFill } from 'react-bootstrap-icons';

class MyReservations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {},
            reservations: [],
            selectedOption: 1,
            propertiesPhotos: []
        }
        this.goToMessagingPage = this.goToMessagingPage.bind(this);
        this.displayPastReservations = this.displayPastReservations.bind(this);
        this.displayReservationsToCome = this.displayReservationsToCome.bind(this);
        this.deleteReservation = this.deleteReservation.bind(this);
        this.getPropertyPhoto = this.getPropertyPhoto.bind(this);
    }

    componentDidMount() {
        ReservationService.getReservationsByReservationUserId(this.state.user.id).then((res) => {
            this.setState({ reservations: res.data });
            for (var index in res.data) {
                this.getPropertyPhoto(res.data[index].property);
            }
        });
    }

    getPropertyPhoto(property) {
        var propertyId = property.id;
        var that = this;
        PropertyPhotoService.getPhotoByPropertyId(propertyId).then((res) => {
            var photos = res.data;
            var firstPhoto = photos[0];
            var blobData = ""
            if (firstPhoto != undefined) {
                var propertyId = firstPhoto.property.id;
                blobData = photos[0].data

                that.setState(prevState => ({
                    propertiesPhotos: {
                        ...prevState.propertiesPhotos,
                        [propertyId]: blobData
                    }
                }))
            }
        })
    }


    goToMessagingPage(owner) {
        this.props.history.push({
            pathname: '/messaging',
            state: { newInterlocutor: owner }
        });
        console.log(owner);
    }

    displayPastReservations() {
        var newSelectedOption = this.state.selectedOption;
        newSelectedOption = 0;
        this.setState({ selectedOption: newSelectedOption });
    }

    displayReservationsToCome() {
        var newSelectedOption = this.state.selectedOption;
        newSelectedOption = 1;
        this.setState({ selectedOption: newSelectedOption });
    }

    getFilterTitle() {
        var selectedOption = this.state.selectedOption;
        if (selectedOption === 0) {
            return "Past reservations";
        }
        return "Reservations to come";
    }

    deleteReservation(reservationId) {
        ReservationService.deleteReservation(reservationId).then((res) => {
            this.setState({ reservations: this.state.reservations.filter(reservation => reservation.id !== res.data.deletedId) });
        });
    }

    render() {
        if (this.state.user == "" || this.state.user.type != "Member") {
            return <Redirect to='/' />;
        }
        return (
            <Container className="my-5" fluid>
                <h1 style={{ textAlign: 'center', margin: '20px' }}>My reservations</h1>
                <div className="div-center-content" >
                    <div style={{ width: '70%' }}>
                        <DropdownButton className="col-auto dropdown-filter" style={{ marginBottom: "-15px" }}
                            title={this.getFilterTitle()} >
                            <Dropdown.Item onClick={() => this.displayReservationsToCome()}
                                active={this.state.selectedOption === 1 || this.state.selectedOption === undefined}>
                                Reservations to come
                    </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.displayPastReservations()}
                                active={this.state.selectedOption === 0}>
                                Past reservations
                    </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                {this.state.selectedOption === 0 &&
                    this.state.reservations
                        .filter(reservation => new Date(reservation.end_date) < new Date())
                        .sort((a, b) => a.start_date < b.start_date ? 1 : -1)
                        .map(pastReservation => {
                            var blob = this.state.propertiesPhotos[pastReservation.property.id];
                            var photo = blob != undefined ? "data:image/png;base64," + blob : photoPlaceholder;
                            return (
                                <div key={pastReservation.id} className="div-center-content" style={{ marginTop: '30px' }}>
                                    <Card style={{ width: '70%' }}>
                                        <Card.Header>
                                            From&nbsp;
                                        {Moment(pastReservation.start_date).format('DD MMMM YYYY')}
                                        &nbsp;to&nbsp;
                                        {Moment(pastReservation.end_date).format('DD MMMM YYYY')}</Card.Header>
                                        <Card.Body>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <img class="card-img" src={photo} alt="Card image"></img>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text>Title : {pastReservation.property.title}</Card.Text>
                                                        <Card.Text>Total occupancy: {pastReservation.totalOccupancy}</Card.Text>
                                                        <Card.Text>Address: {pastReservation.property.address}</Card.Text>
                                                        <Card.Text>Services: {pastReservation.property.propertyServices.map(function (d, idx) {
                                                            return (<li key={idx}>{d.name}</li>)
                                                        })}</Card.Text>
                                                        <Card.Text>Constraints: {pastReservation.property.propertyRestrictions.map(function (d, idx) {
                                                            return (<li key={idx}>{d.name}</li>)
                                                        })}</Card.Text>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text style={{ textAlign: 'center' }}>
                                                            Owner : {pastReservation.property.owner.firstName} {pastReservation.property.owner.lastName}
                                                        </Card.Text>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <Button className="soft-button blue-soft-button" variant="primary" style={{ margin: '3px' }}
                                                                onClick={() => this.goToMessagingPage(pastReservation.property.owner)}>
                                                                <EnvelopeFill /> Contact the owner
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body >
                                    </Card>
                                </div>
                            )
                        }
                        )
                }

                {this.state.selectedOption === 1 &&
                    this.state.reservations
                        .filter(reservation => new Date(reservation.start_date) > new Date() || (new Date(reservation.start_date) <= new Date() && new Date(reservation.end_date) >= new Date()))
                        .sort((a, b) => a.start_date < b.start_date ? 1 : -1)
                        .map(upcomingReservation => {
                            var blob = this.state.propertiesPhotos[upcomingReservation.property.id];
                            var photo = blob != undefined ? "data:image/png;base64," + blob : photoPlaceholder;
                            return (
                                <div key={upcomingReservation.id} className="div-center-content" style={{ marginTop: '30px' }}>
                                    <Card style={{ width: '70%' }}>
                                        <Card.Header>
                                            From&nbsp;
                                        {Moment(upcomingReservation.start_date).format('DD MMMM YYYY')}
                                        &nbsp;to&nbsp;
                                        {Moment(upcomingReservation.end_date).format('DD MMMM YYYY')}</Card.Header>
                                        <Card.Body>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <img class="card-img" src={photo} alt="Card image"></img>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text>Title : {upcomingReservation.property.title}</Card.Text>
                                                        <Card.Text>{upcomingReservation.property.description}</Card.Text>
                                                        <Card.Text>Total occupancy: {upcomingReservation.totalOccupancy}</Card.Text>
                                                        <Card.Text>Address: {upcomingReservation.property.address}</Card.Text>
                                                        <Card.Text>Services: {upcomingReservation.property.propertyServices.map(function (d, idx) {
                                                            return (<li key={idx}>{d.name}</li>)
                                                        })}</Card.Text>
                                                        <Card.Text>Constraints: {upcomingReservation.property.propertyRestrictions.map(function (d, idx) {
                                                            return (<li key={idx}>{d.name}</li>)
                                                        })}</Card.Text>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text style={{ textAlign: 'center' }}>
                                                            Owner : {upcomingReservation.property.owner.firstName} {upcomingReservation.property.owner.lastName}
                                                        </Card.Text>
                                                        <div style={{ textAlign: 'center' }}>
                                                            <Button className="soft-button blue-soft-button" variant="primary" style={{ margin: '3px' }}
                                                                onClick={() => this.goToMessagingPage(upcomingReservation.property.owner)}>
                                                                <EnvelopeFill /> Contact the owner
                                                            </Button>
                                                            <Button className="strong-button" variant="primary" style={{ margin: '3px' }}
                                                                onClick={() => { if (window.confirm('Are you sure you wish to cancel this reservation?')) this.deleteReservation(upcomingReservation.id) }}>
                                                                <Trash />Cancel
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body >
                                    </Card>
                                </div>
                            )
                        }
                        )
                }

            </Container >
        )
    }
}

export default MyReservations;
