import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, Accordion, Card } from 'react-bootstrap';
import PropertyService from '../services/PropertyService';
import { Pencil, CardChecklist, CardList, XCircle } from 'react-bootstrap-icons';

class UpdatePropertyPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 2,
            property: {
                property_services: [],
                property_restrictions: [],
                property_type: {},
                owner: {}
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        PropertyService.getPropertyById(this.state.id).then(res => {
            this.setState({ property: res.data });
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let property = this.state.property;
        console.log('property => ' + JSON.stringify(property));
        console.log('id => ' + JSON.stringify(this.state.id));
        PropertyService.updateProperty(property, this.state.id).then(res => {
            //this.props.history.push('/myproperties');
            alert("Property updated");
        });
    }

    handleChange = (event) => {
        let property = { ...this.state.property };
        property[event.target.name] = event.target.value;
        this.setState({ property });
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
                        Update Property
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div className="div-center-content">

                                <Form onChange={this.handleChange}>
                                    <Form.Group controlId="title">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control type="text" name="title" defaultValue={this.state.property.title} />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control as="textarea" rows={3} type="text" name="description" defaultValue={this.state.property.description} />
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>Address:</Form.Label>
                                        <Form.Control type="text" name="address" defaultValue={this.state.property.address} />
                                    </Form.Group>
                                    <Form.Group controlId="city">
                                        <Form.Label>City:</Form.Label>
                                        <Form.Control type="text" name="city" defaultValue={this.state.property.city} />
                                    </Form.Group>
                                    <Form.Group controlId="total_occupancy">
                                        <Form.Label>Total occupancy:</Form.Label>
                                        <Form.Control type="text" name="total_occupancy" defaultValue={this.state.property.total_occupancy} />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                        <Col>

                            <Form.Group controlId="property_type">
                                <Form.Label>Property type:</Form.Label>
                                <Form.Control as="select">
                                    <option>  {this.state.property.property_type.name}</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="property_services">
                                <Accordion className="col-auto">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <CardChecklist></CardChecklist>  Services
                                </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {
                                                    this.state.property.property_services.map(
                                                        service =>
                                                            <Form.Check key={"service" + service.id}
                                                                defaultChecked={service}
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
                            <Form.Group controlId="property_restrictions">
                                <Accordion className="col-auto">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <CardList></CardList>  Restrictions
                                </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                {
                                                    this.state.property.property_restrictions.map(
                                                        restriction =>
                                                            <Form.Check key={"restriction" + restriction.id}
                                                                defaultChecked={restriction}
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
                    <Button variant="primary" onClick={this.handleSubmit}> <Pencil /> Update</Button>
                </Modal.Footer>
            </Modal>

        );
    }
} export default UpdatePropertyPopUp;
