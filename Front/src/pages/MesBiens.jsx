//import logo from './logo.svg';
import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import '../css/App.scss';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import photo from '../images/banner/banner2.jpg';
import { Pencil, Trash, PlusCircle } from 'react-bootstrap-icons';

class MesBiens extends Component {
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
                <h1 style={{ textAlign: 'center' }}>Mes biens</h1>

                {
                    this.state.properties.map(
                        property => <div style={{ display: 'flex', justifyContent: 'center' }}><Card style={{ width: '70%' }}> <Card.Header>{property.title}</Card.Header>
                            <Card.Body>
                                <Container><Row>
                                    <Col>
                                        <Card.Title>{property.title}</Card.Title>
                                        <Card.Img variant="top" src={photo} />
                                        <Card.Text>Type : {property.property_type}</Card.Text>
                                        <Card.Text>Adresse : {property.address}</Card.Text>
                                        <Card.Text>Liste de services :</Card.Text>
                                        <Card.Text>Liste de contraintes :</Card.Text>
                                        <Button variant="primary"> <Pencil /> Modifier</Button>
                                        <Button variant="primary"> <Trash />Supprimer</Button>
                                    </Col>
                                    <Col><Card.Text>Réservations
                            </Card.Text>
                                        <DropdownButton id="dropdown-basic-button" className="col-auto" title="à venir">
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </DropdownButton>
                                        <Card.Text>
                                            Du xx au xx 2021 - par Prénom NOM
                            </Card.Text>
                                    </Col>
                                </Row>
                                </Container>
                            </Card.Body >
                        </Card >
                        </div>
                    )
                }

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '70%' }}>
                        <Card.Header>Grande maison blablabla</Card.Header>
                        <Card.Body>
                            <Container><Row>
                                <Col>
                                    <Card.Title>Grande maison blablabla</Card.Title>
                                    <Card.Img variant="top" src={photo} />
                                    <Card.Text>Nom :</Card.Text>
                                    <Card.Text>Adresse :</Card.Text>
                                    <Card.Text>Liste de services :</Card.Text>
                                    <Card.Text>Liste de contraintes :</Card.Text>
                                    <Button variant="primary"> <Pencil /> Modifier</Button>
                                    <Button variant="primary"> <Trash />Supprimer</Button>
                                </Col>
                                <Col><Card.Text>
                                    Réservations
                            </Card.Text>
                                    <DropdownButton id="dropdown-basic-button" className="col-auto" title="à venir">
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </DropdownButton>
                                    <Card.Text>
                                        Du xx au xx 2021 - par Prénom NOM
                            </Card.Text>
                                </Col>
                            </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </div>
                <Button variant="primary"><PlusCircle />Ajouter un bien</Button>
            </div >
        )
    }
}

export default MesBiens;
