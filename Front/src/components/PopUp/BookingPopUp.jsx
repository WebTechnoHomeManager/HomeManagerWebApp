import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { PlusCircle, XCircle } from 'react-bootstrap-icons';
import PropertyService from '../../services/PropertyService';

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
                start_date: null,
                end_date: null
            }
        }
    }

    componentDidMount() {
        let reservation = { ...this.state.reservation };
        PropertyService.getPropertyById(this.props.propertyId).then(res => {
            reservation.property_reservation = res.data;
            this.setState({ reservation });
            console.log(this.state.reservation.property_reservation);
        })
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
                <Modal.Body>
                    <Row>
                        <div className="div-center-content">

                            <Form onChange={this.handleChange}>
                                <Form.Group controlId="start_date">
                                    <Form.Label>From:</Form.Label>
                                    <Form.Control type="date" name="start_date" required />
                                </Form.Group>
                                <Form.Group controlId="end_date">
                                    <Form.Label>To:</Form.Label>
                                    <Form.Control type="date" name="end_date" required />
                                </Form.Group>
                            </Form>
                        </div>
                    </Row>
                    <Row>
                        <p>I agree to respect the following services and constraints:</p>
                        <Form onChange={this.handleChange}>
                            {
                                this.state.reservation.property_reservation.propertyServices.map(
                                    service =>
                                        <Form.Check key={"service" + service.id}
                                            name={"service" + service.id}
                                            label={service.name}
                                            id={"service" + service.id}
                                        />
                                )
                            }
                            {
                                this.state.reservation.property_reservation.propertyRestrictions.map(
                                    restriction =>
                                        <Form.Check key={"restriction" + restriction.id}
                                            name={"restriction" + restriction.id}
                                            label={restriction.name}
                                            id={"restriction" + restriction.id}
                                        />
                                )
                            }
                        </Form>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="strong-button" onClick={this.props.onHide}>
                        <XCircle /> Close
                    </Button>
                    <Button className="strong-button" variant="primary">
                        <PlusCircle /> Make the reservation
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}
export default BookingPopUp;
