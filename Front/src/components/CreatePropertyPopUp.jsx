import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, Accordion, Card } from 'react-bootstrap';
import PropertyService from '../services/PropertyService';
import RestrictionService from '../services/RestrictionService';
import ServiceService from '../services/ServiceService';
import TypeService from '../services/TypeService';
import UserService from '../services/UserService';
import { PlusCircle, CardChecklist, CardList, XCircle } from 'react-bootstrap-icons';


class UpdatePropertyPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allServices: [],
            allRestrictions: [],
            allPropertyTypes: [],
            property: {
                title: "",
                description: "",
                address: "",
                city: "",
                totalOccupancy: "",
                latitude: 0,
                longitude: 0,
                owner: {},
                propertyType: { id: "1", name: "House" },
                reservations: [],
                propertyServices: [],
                propertyRestrictions: []
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(localStorage.userId).then((res) => {
            let property = { ...this.state.property };
            property["owner"] = res.data;
            this.setState({
                property: property
            });
        });
        ServiceService.getServices().then((res) => {
            this.setState({
                allServices: res.data
            });
        });
        RestrictionService.getRestrictions().then((res) => {
            this.setState({
                allRestrictions: res.data
            });
        });
        TypeService.getPropertyTypes().then((res) => {
            this.setState({
                allPropertyTypes: res.data
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let property = this.state.property;
        console.log('property => ' + JSON.stringify(property));
        PropertyService.createProperty(property).then(res => {
            //this.props.history.push('/myproperties');
            alert("Property created");
        }).catch(error => {
            console.log(error.response);
        });
    }

    handleChange = (event) => {
        let property = { ...this.state.property };
        property[event.target.name] = event.target.value;
        this.setState({ property });
    }

    handleTypeChange = (event) => {
        let property = { ...this.state.property };
        const [id, name] = event.target.value.split(',');
        property.propertyType["id"] = id;
        property.propertyType["name"] = name;
        console.log(property.propertyType);
        this.setState({ property });
        console.log(this.state)
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Property
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div className="div-center-content">

                                <Form onChange={this.handleChange}>
                                    <Form.Group controlId="title">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control type="text" name="title" />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control as="textarea" rows={3} type="text" name="description" />
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>Address:</Form.Label>
                                        <Form.Control type="text" name="address" />
                                    </Form.Group>
                                    <Form.Group controlId="city">
                                        <Form.Label>City:</Form.Label>
                                        <Form.Control type="text" name="city" />
                                    </Form.Group>
                                    <Form.Group controlId="totalOccupancy">
                                        <Form.Label>Total occupancy:</Form.Label>
                                        <Form.Control type="text" name="totalOccupancy" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                        <Col>

                            <Form.Group controlId="propertyType" onChange={this.handleTypeChange}>
                                <Form.Label>Property type:</Form.Label>
                                <Form.Control as="select" name="propertyType">
                                    {
                                        this.state.allPropertyTypes.map(
                                            type => <option key={type.id} value={[type.id, type.name]} selected={type.name === this.state.property.propertyType.name} > {type.name} </option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="propertyServices">
                                <Accordion className="col-auto">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <CardChecklist></CardChecklist>  Services
                                </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {
                                                    this.state.allServices.map(
                                                        service =>
                                                            <Form.Check key={"service" + service.id}
                                                                defaultChecked={service.name}
                                                                name={"service" + service.id}
                                                                label={service.name}
                                                                id={"service" + service.id} onClick={(e) => { }}
                                                            />
                                                    )
                                                }
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Form.Group>
                            <Form.Group controlId="propertyRestrictions">
                                <Accordion className="col-auto">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <CardList></CardList>  Restrictions
                                </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {
                                                    this.state.allRestrictions.map(
                                                        restriction =>
                                                            <Form.Check key={"restriction" + restriction.id}
                                                                defaultChecked={restriction.name}
                                                                name={"service" + restriction.id}
                                                                label={restriction.name}
                                                                id={"service" + restriction.id} onClick={(e) => { }}
                                                            />
                                                    )
                                                }
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Form.Group>

                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}> <XCircle /> Close</Button>
                    <Button variant="primary" onClick={this.handleSubmit}> <PlusCircle /> Add</Button>
                </Modal.Footer>
            </Modal>

        );
    }
}
export default UpdatePropertyPopUp;
