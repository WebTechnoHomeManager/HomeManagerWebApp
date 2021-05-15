//import logo from './logo.svg';
import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import photo from '../images/banner/banner2.jpg';
import { Pencil, Trash, PlusCircle } from 'react-bootstrap-icons';

class MyProperties extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ownerId: 2,
            properties: []
        }
    }

    componentDidMount() {
        PropertyService.getPropertiesByOwnerId(this.state.ownerId).then((res) => {
            this.setState({ properties: res.data });
        });
    }

    render() {
        return (
            <div>
                <h1 className="center">My Properties</h1>
                <div className="div-center-content"><Button variant="primary"><PlusCircle />Add a property</Button></div>
                {
                    this.state.properties.map(
                        property => <div className="div-center-content"><Card style={{ width: '70%' }}> <Card.Header>{property.title}</Card.Header>
                            <Card.Body>
                                <Container><Row>
                                    <Col>
                                        <Card.Title>{property.title}</Card.Title>
                                        <Card.Img variant="top" src={photo} />
                                        <Card.Text>Type: {property.property_type.name}</Card.Text>
                                        <Card.Text>Total occupancy: {property.total_occupancy}</Card.Text>
                                        <Card.Text>Address: {property.address}</Card.Text>
                                        <Card.Text>City: {property.city}</Card.Text>
                                        <Card.Text>Services: {property.property_services.map(function (d, idx) {
                                            return (<li key={idx}>{d.name}</li>)
                                        })}</Card.Text>
                                        <Card.Text>Constraints: {property.property_restrictions.map(function (d, idx) {
                                            return (<li key={idx}>{d.name}</li>)
                                        })}</Card.Text>
                                        <Button variant="primary"> <Pencil /> Update</Button>
                                        <Button variant="primary"> <Trash />Delete</Button>
                                    </Col>
                                    <Col><Card.Text>Réservations
                            </Card.Text>
                                        <DropdownButton id="dropdown-basic-button" className="col-auto" title="Future reservations">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>

                                        <Card.Text>{property.reservations.map(function (d, idx) {
                                            return (<li key={idx}> From {d.start_date} to {d.end_date} - by {d.reservation_user.first_name} {d.reservation_user.last_name}</li>)
                                        })}</Card.Text>
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

export default MyProperties;
