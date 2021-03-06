import React, { Component } from 'react';
import { Form, Button, Modal, Row } from 'react-bootstrap';
import { PlusCircle, XCircle } from 'react-bootstrap-icons';
import PropertyService from '../../services/PropertyService';
import ReservationService from '../../services/ReservationService';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';

class BookingPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            propertyId: this.props.propertyId,
            propertyReservations: [],
            reservation: {
                reservationUser: JSON.parse(localStorage.getItem('user')),
                property: {
                    propertyServices: [],
                    propertyRestrictions: []
                },
                start_date: this.props.dateFrom == null ? new Date() : this.props.dateFrom,
                end_date: this.props.dateTo == null ? new Date() : this.props.dateTo
            }
        }
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDatesBetweenDates = this.getDatesBetweenDates.bind(this);
        this.flatDeep = this.flatDeep.bind(this);
    }

    componentDidMount() {
        let reservation = { ...this.state.reservation };
        let propertyReservations = { ...this.state.propertyReservations };
        PropertyService.getPropertyById(this.props.propertyId).then(res => {
            reservation.property = res.data;
            propertyReservations = res.data.reservations;
            this.setState({ reservation });
            this.setState({ propertyReservations });
        })
    }

    handleChangeEndDate = (event) => {
        console.log(event);
        console.log(typeof event);
        console.log(Moment(event).format("YYYY-MM-DD"));
        let reservation = { ...this.state.reservation };
        reservation.end_date = Moment(event).format("YYYY-MM-DD");
        this.setState({ reservation },
            console.log(this.state));
    }

    handleChangeStartDate = (event) => {
        console.log(Moment(event).format("YYYY-MM-DD"));
        let reservation = { ...this.state.reservation };
        reservation.start_date = Moment(event).format("YYYY-MM-DD");
        this.setState({ reservation },
            console.log(this.state));
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

    getDatesBetweenDates = (startDate, endDate) => {
        let dates = []
        //to avoid modifying the original date
        const theDate = new Date(startDate)
        while (theDate < endDate) {
            dates = [...dates, new Date(theDate)]
            theDate.setDate(theDate.getDate() + 1)
        }
        dates = [...dates, endDate]
        return dates
    }

    flatDeep(arr) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                ret = ret.concat(this.flatDeep(arr[i]));
            } else {
                ret.push(arr[i]);
            }
        }
        return ret;
    };



    render() {
        //map function
        var bookedDates = this.state.propertyReservations.map(reservation =>
            this.getDatesBetweenDates(new Date(reservation.start_date), new Date(reservation.end_date))
        );

        const isAvailable = (date) => {
            return !(bookedDates.flat(this.state.propertyReservations.length).some(arrVal => Moment(date).format("YYYY-MM-DD") === Moment(arrVal).format("YYYY-MM-DD")));
        };

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
                        <Form onSubmit={this.handleSubmit}>
                            <Modal.Body>
                                <Form.Group controlId="start_date">
                                    <Form.Label>From:</Form.Label>
                                    <DatePicker
                                        name='start_date'
                                        minDate={new Date()}
                                        selected={this.state.reservation.start_date ? new Date(this.state.reservation.start_date) : new Date()}
                                        filterDate={isAvailable}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.handleChangeStartDate}
                                    />
                                </Form.Group>
                                <Form.Group controlId="end_date">
                                    <Form.Label>To:</Form.Label>
                                    <DatePicker
                                        name='end_date'
                                        minDate={this.state.reservation.start_date ? new Date(this.state.reservation.start_date) : new Date()}
                                        selected={this.state.reservation.end_date ? new Date(this.state.reservation.end_date) : new Date()}
                                        filterDate={isAvailable}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.handleChangeEndDate}
                                    />
                                </Form.Group>

                                <p>I agree to respect the following services and constraints:</p>

                                {
                                    this.state.reservation.property.propertyServices.map(
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
                                    this.state.reservation.property.propertyRestrictions.map(
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
