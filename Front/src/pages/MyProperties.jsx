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
            properties: []
        }
    }

    componentDidMount() {
        PropertyService.getProperties().then((res) => {
            this.setState({ properties: res.data });
        });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>My Properties</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}><Button variant="primary"><PlusCircle />Add a property</Button></div>
                {
                    this.state.properties.map(
                        property => <div style={{ display: 'flex', justifyContent: 'center' }}><Card style={{ width: '70%' }}> <Card.Header>{property.title}</Card.Header>
                            <Card.Body>
                                <Container><Row>
                                    <Col>
                                        <Card.Title>{property.title}</Card.Title>
                                        <Card.Img variant="top" src={photo} />
                                        <Card.Text>Type : {property.property_type_id}</Card.Text>
                                        <Card.Text>Address : {property.address}</Card.Text>
                                        <Card.Text>City : {property.city}</Card.Text>
                                        <Card.Text>Services :</Card.Text>
                                        <Card.Text>Constraints :</Card.Text>
                                        <Button variant="primary"> <Pencil /> Update</Button>
                                        <Button variant="primary"> <Trash />Delete</Button>
                                    </Col>
                                    <Col><Card.Text>Réservations
                            </Card.Text>
                                        <DropdownButton id="dropdown-basic-button" className="col-auto" title="à venir">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                        <Card.Text>
                                            From xx to xx 2021 - par First name NAME
                            </Card.Text>
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
