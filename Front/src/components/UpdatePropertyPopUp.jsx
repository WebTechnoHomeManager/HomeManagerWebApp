import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, Accordion, Card } from 'react-bootstrap';
import PropertyService from '../services/PropertyService';
import RestrictionService from '../services/RestrictionService';
import ServiceService from '../services/ServiceService';
import TypeService from '../services/TypeService';
import { Pencil, CardChecklist, CardList, XCircle } from 'react-bootstrap-icons';

class UpdatePropertyPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.propertyId,
            allServices: [],
            allRestrictions: [],
            allPropertyTypes: [],
            property: {
                propertyServices: [],
                propertyRestrictions: [],
                propertyType: {},
                owner: {}
            }
        }
        this.handleClickService = this.handleClickService.bind(this);
        this.handleClickRestriction = this.handleClickRestriction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        PropertyService.getPropertyById(this.state.id).then(res => {
            this.setState({ property: res.data });
        })
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
        let property = { ...this.state.property };
        PropertyService.updateProperty(property, this.state.id).then(res => {
            //this.props.history.push('/myproperties');
            alert("Property updated");
            console.log('property => ' + JSON.stringify(property));
            console.log('id => ' + JSON.stringify(this.state.id));
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


    handleClickService(e, service) {
        var checked = e.target.checked;
        let property = { ...this.state.property };
        const services = property.propertyServices.slice();

        if (checked) {
            property.propertyServices = services.concat([service]);
            this.setState({ property });
        } else {
            property.propertyServices = services.splice(services.indexOf(service), 1)
            this.setState({ property });
        }
    }

    handleClickRestriction(e, restriction) {
        var checked = e.target.checked;
        let property = { ...this.state.property };
        const restrictions = property.propertyRestrictions.slice();

        if (checked) {
            property.propertyRestrictions = restrictions.concat([restriction]);
            this.setState({ property });
        } else {
            property.propertyRestrictions = restrictions.splice(restrictions.indexOf(restriction), 1)
            this.setState({ property });
        }
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
                                    <Form.Group controlId="totalOccupancy">
                                        <Form.Label>Total occupancy:</Form.Label>
                                        <Form.Control type="text" name="totalOccupancy" defaultValue={this.state.property.totalOccupancy} />
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
                                                                defaultChecked={this.state.property.propertyServices.some(item => service.name === item.name)}
                                                                name={"service" + service.id}
                                                                label={service.name}
                                                                id={"service" + service.id} onClick={(e) => { this.handleClickService(e, service) }}
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
                                                                defaultChecked={this.state.property.propertyRestrictions.some(item => restriction.name === item.name)}
                                                                name={"restriction" + restriction.id}
                                                                label={restriction.name}
                                                                id={"restriction" + restriction.id} onClick={(e) => { this.handleClickRestriction(e, restriction) }}
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
                    <Button className="strong-button" onClick={this.props.onHide}> <XCircle /> Close</Button>
                    <Button className="strong-button" variant="primary" onClick={this.handleSubmit}> <Pencil /> Update</Button>
                </Modal.Footer>
            </Modal>

        );
    }
} export default UpdatePropertyPopUp;
