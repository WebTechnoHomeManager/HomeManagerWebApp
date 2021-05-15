import React, { Component } from 'react';
import ReservationService from '../services/ReservationService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import photo from '../images/banner/banner2.jpg';
import { Trash, PersonLinesFill } from 'react-bootstrap-icons';
import Moment from 'moment';

class MyReservations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        ReservationService.getReservations().then((res) => {
            this.setState({ reservations: res.data });
        });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center', margin: '20px' }}>My reservations</h1>

                {
                    this.state.reservations.map(
                        reservation => <div className="div-center-content" style={{marginTop: '30px' }}><Card style={{ width: '70%' }}>
                            <Card.Header>
                                From&nbsp;
                                {Moment(reservation.start_date).format('DD MMMM YYYY')}
                                &nbsp;to&nbsp;
                                {Moment(reservation.end_date).format('DD MMMM YYYY')}</Card.Header>
                            <Card.Body>
                                <Container><Row>
                                    <Col>
                                        <img class="card-img" src={photo} alt="Card image"></img>
                                    </Col>
                                    <Col>
                                        <Card.Text>Title : {reservation.property_reservation.title}</Card.Text>
                                        <Card.Text>Total occupancy: {reservation.total_occupancy}</Card.Text>
                                        <Card.Text>Address: {reservation.property_reservation.address}</Card.Text>
                                        <Card.Text>City: {reservation.property_reservation.city}</Card.Text>
                                        <Card.Text>Services: {reservation.property_reservation.property_services.map(function (d, idx) {
                                            return (<li key={idx}>{d.name}</li>)
                                        })}</Card.Text>
                                        <Card.Text>Constraints: {reservation.property_reservation.property_restrictions.map(function (d, idx) {
                                            return (<li key={idx}>{d.name}</li>)
                                        })}</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text style={{ textAlign: 'center' }}>
                                            Owner : {reservation.property_reservation.owner.first_name} {reservation.property_reservation.owner.last_name}
                                        </Card.Text>
                                        <div style={{ textAlign: 'center' }}>
                                            <Button variant="primary" style={{ margin: '3px' }}> <PersonLinesFill /> Contact</Button>
                                            <Button variant="primary" style={{ margin: '3px' }}> <Trash />Cancel</Button>
                                        </div>
                                    </Col>
                                </Row>
                                </Container>
                            </Card.Body >
                        </Card >
                        </div>
                    )
                }

            </div >
        )
    }
}

export default MyReservations;
