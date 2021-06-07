import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { PlusCircle, XCircle } from 'react-bootstrap-icons';
import PropertyService from '../../services/PropertyService';
import ReservationService from '../../services/ReservationService';

class BookingPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyId: this.props.propertyId,
            reservation: {
                reservationUser: JSON.parse(localStorage.getItem('user')),
                property_reservation: {
                    propertyServices: [],
                    propertyRestrictions: []
                },
                start_date: this.props.dateFrom,
                end_date: this.props.dateTo
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let reservation = { ...this.state.reservation };
        PropertyService.getPropertyById(this.props.propertyId).then(res => {
            reservation.property_reservation = res.data;
            this.setState({ reservation });
        })
    }

    handleChange = (event) => {
        let reservation = { ...this.state.reservation };
        reservation[event.target.name] = event.target.value;
        this.setState({ reservation });
    }

    handleSubmit(e) {
        e.preventDefault();
        let reservation = { ...this.state.reservation };
        console.log('reservation => ' + JSON.stringify(reservation));
        ReservationService.createReservation(reservation).then(res => {
            alert("Reservation made with success!");
            this.props.onCreateDone();
        }).catch(error => {
            console.log(error.response);
        });
    }

    render() {
        return (
            <Modal onHide={() => alert("okes")}
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Make a reservation
                    </Modal.Title>
                </Modal.Header>

                <div className="div-center-content">
                    <Row>
                        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                            <Modal.Body>
                                <Form.Group controlId="start_date">
                                    <Form.Label>From:</Form.Label>
                                    <Form.Control type="date" name="start_date" defaultValue={this.props.dateFrom} required />
                                </Form.Group>
                                <Form.Group controlId="end_date">
                                    <Form.Label>To:</Form.Label>
                                    <Form.Control type="date" name="end_date" defaultValue={this.props.dateTo} required />
                                </Form.Group>

                                <p>I agree to respect the following services and constraints:</p>

                                {
                                    this.state.reservation.property_reservation.propertyServices.map(
                                        service =>
                                            <Form.Check key={"service" + service.id}
                                                name={"service" + service.id}
                                                label={service.name}
                                                id={"service" + service.id}
                                                type="checkbox"
                                                required />
                                    )
                                }
                                {
                                    this.state.reservation.property_reservation.propertyRestrictions.map(
                                        restriction =>
                                            <Form.Check key={"restriction" + restriction.id}
                                                name={"restriction" + restriction.id}
                                                label={restriction.name}
                                                id={"restriction" + restriction.id}
                                                type="checkbox"
                                                required />
                                    )
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="strong-button" onClick={this.props.onHide}>
                                    <XCircle /> Close
                    </Button>
                                <Button className="strong-button" variant="primary" type="submit">
                                    <PlusCircle /> Make the reservation
                    </Button>
                            </Modal.Footer>
                        </Form>
                    </Row>
                </div>


            </Modal>

        );
    }
}
export default BookingPopUp;
