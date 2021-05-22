//import logo from './logo.svg';
import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton, Form, Accordion } from 'react-bootstrap';
import photo from '../images/banner/banner2.jpg';
import { Pencil, Trash, PlusCircle, ArrowDown } from 'react-bootstrap-icons';
import UpdatePropertyPopUp from '../components/UpdatePropertyPopUp';

class MyProperties extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            properties: [],
            addModalShow: false
        }
    }


    componentDidMount() {
        PropertyService.getPropertiesByOwnerId(this.state.user.id).then((res) => {
            this.setState({ properties: res.data });
        });
    }

    render() {

        let addModalClose = () => this.setState({ addModalShow: false });
        return (

            < div >
                <h1 className="center">My Properties</h1>
                <div className="div-center-content"><Button variant="primary"><PlusCircle />Add a property</Button></div>
                {
                    this.state.properties.map(
                        property => <div className="div-center-content" style={{ marginTop: '30px' }}><Card style={{ width: '70%' }}> <Card.Header>{property.title}</Card.Header>
                            <Card.Body>
                                <Container><Row>
                                    <Col style={{ textAlign: 'center' }}>
                                        <Card.Title>{property.title}</Card.Title>
                                        <Card.Img variant="top" src={photo} />
                                        <Button variant="primary" style={{ margin: '3px' }} onClick={() => this.setState({ addModalShow: true })}> <Pencil /> Update</Button>

                                        <UpdatePropertyPopUp
                                            show={this.state.addModalShow}
                                            onHide={addModalClose}
                                        />

                                        <Button variant="primary" style={{ margin: '3px' }}> <Trash />Delete</Button>
                                    </Col>
                                    <Col>
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
                                    </Col>
                                    <Col>

                                        <Accordion style={{ color: "white" }} className="col-auto">
                                            <Card style={{ backgroundColor: "#FF584D" }}>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    <ArrowDown></ArrowDown>Upcoming reservations
                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Form.Check
                                                            name={"something"}
                                                            label={"something"}></Form.Check>
                                                        <Form.Check
                                                            name={"something"}
                                                            label={"something"}></Form.Check>
                                                        <Form.Check
                                                            name={"something"}
                                                            label={"something"}></Form.Check>
                                                        <Form.Check
                                                            name={"something"}
                                                            label={"something"}></Form.Check>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>



                                        <Card.Text>{property.reservations.map(function (d, idx) {
                                            return (<li key={idx}> From {d.start_date} to {d.end_date} - by {d.reservation_user.first_name} {d.reservation_user.last_name}</li>)
                                        })}</Card.Text></Col>
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
