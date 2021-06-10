import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, Accordion, Card, DropdownButton, Dropdown, Image } from 'react-bootstrap';
import PropertyService from '../../services/PropertyService';
import RestrictionService from '../../services/RestrictionService';
import ServiceService from '../../services/ServiceService';
import TypeService from '../../services/TypeService';
import { PlusCircle, CardChecklist, CardList, XCircle } from 'react-bootstrap-icons';
import AdressService from "../../services/AddressService"
import UserService from '../../services/UserService';
import FileUpload from '../FileUpload';

class CreatePropertyPopUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestedAddresses: [],
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
                owner: JSON.parse(localStorage.getItem('user')),
                propertyType: { id: "1", name: "House" },
                reservations: [],
                propertyServices: [],
                propertyRestrictions: []
            },
            propertyPhotoIds: []
        }
        this.handleClickService = this.handleClickService.bind(this);
        this.handleClickRestriction = this.handleClickRestriction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addressAutocomplete = this.addressAutocomplete.bind(this);
        this.handleAddressSelection = this.handleAddressSelection.bind(this);
        this.savePhotoIds = this.savePhotoIds.bind(this);
    }

    componentDidMount() {
        ServiceService.getServices().then((res) => {
            this.setState({ allServices: res.data });
        });
        RestrictionService.getRestrictions().then((res) => {
            this.setState({ allRestrictions: res.data });
        });
        TypeService.getPropertyTypes().then((res) => {
            this.setState({ allPropertyTypes: res.data });
        });
    }

    handleChange = (event) => {
        let property = { ...this.state.property };
        property[event.target.name] = event.target.value;
        this.setState({ property }); 

        if (event.target.name == "address" && event.target.value.trim() != ""){
            this.addressAutocomplete(event.target.value);
        }
    }

    addressAutocomplete(address){
        AdressService.getAddress(encodeURI(address)).then((resp) => {
            console.log(resp.data); 
            const suggestedAddresses = resp.data.results.filter(address => address.type == "Point Address");
            this.setState({ suggestedAddresses: suggestedAddresses.slice(0, 5) }); 
        });
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
        let property = this.state.property;

        var checked = e.target.checked;
        if (checked) {
            var newPropertyServices = property.propertyServices.concat([service])
            this.setState(prevState => ({
                property: {
                    ...prevState.property,
                    propertyServices: newPropertyServices
                }
            }))
        } else {
            var indexServiceToRemove = property.propertyServices.findIndex(serv => serv.id == service.id);
            var newPropertyServices = property.propertyServices;
            newPropertyServices.splice(indexServiceToRemove, 1);
            this.setState(prevState => ({
                property: {
                    ...prevState.property,
                    propertyServices: newPropertyServices
                }
            }))
        }
    }

    handleClickRestriction(e, restriction) {
        let property = this.state.property;
        
        var checked = e.target.checked;
        if (checked) {
            var newPropertyRestrictions = property.propertyRestrictions.concat([restriction])
            this.setState(prevState => ({
                property: {
                    ...prevState.property,
                    propertyRestrictions: newPropertyRestrictions
                }
            }))
        } else {
            var indexRestrictionToRemove = property.propertyRestrictions.findIndex(restr => restr.id == restriction.id);
            var newPropertyRestrictions = property.propertyRestrictions;
            newPropertyRestrictions.splice(indexRestrictionToRemove, 1);
            this.setState(prevState => ({
                property: {
                    ...prevState.property,
                    propertyRestrictions: newPropertyRestrictions
                }
            }))
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let property = { ...this.state.property };
        console.log('property => ' + JSON.stringify(property));

        PropertyService.createProperty(property).then(res => {
            PropertyService.addPhotosToProperty(res.data.id, this.state.propertyPhotoIds).then(res => {
                alert("Property created");
                this.props.onCreateDone(res.data);
            })
        }).catch(error => {
            console.log(error.response);
        });
    }

    handleAddressSelection(address){
        let property = { ...this.state.property };
        property["address"] = address.address.freeformAddress;
        property["city"] = address.address.municipality;
        property["latitude"] = address.position.lat;
        property["longitude"] = address.position.lon;
        this.setState({ property });
        this.setState({ suggestedAddresses: [] });
    }

    savePhotoIds(ids){
        const propertyPhotoIds = this.state.propertyPhotoIds;
        propertyPhotoIds.push(...ids);
        this.setState({ propertyPhotoIds: propertyPhotoIds })
    }

    render() {

        return (
            <Modal onHide={() => alert("okes")}
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <div style={{paddingLeft:"25px", paddingRight:"25px", paddingTop:"10px",paddingBottom:"10px"}}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Property
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <div className="div-center-content">

                                    <Form id="create-property-popup" onChange={this.handleChange}>
                                        <Form.Group controlId="title">
                                            <Form.Label>Title:</Form.Label>
                                            <Form.Control type="text" name="title" required/>
                                        </Form.Group>
                                        <Form.Group controlId="description">
                                            <Form.Label>Description:</Form.Label>
                                            <Form.Control as="textarea" rows={3} type="text" name="description" required/>
                                        </Form.Group>
                                        <Form.Group controlId="address">
                                            <Form.Label>Address:</Form.Label>
                                            <Form.Control type="text" name="address" required autocomplete="off"
                                                          value={this.state.property.address}/>
                                        </Form.Group>

                                        {this.state.suggestedAddresses.length != 0 &&
                                            <div className="dropdown-autocomplete">
                                                {this.state.suggestedAddresses.map(address =>
                                                    <div className="dropdown-item"
                                                        onClick={() => this.handleAddressSelection(address)}>
                                                        {address.address.freeformAddress}
                                                    </div>
                                                )}
                                            </div>
                                        }

                                        <Form.Group controlId="totalOccupancy">
                                            <Form.Label>Total occupancy:</Form.Label>
                                            <Form.Control type="number" name="totalOccupancy" required/>
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
                                    <Accordion className="col-auto" defaultActiveKey="0">
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
                                    <Accordion className="col-auto" defaultActiveKey="0">
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
                        <Row>
                            <Col>
                                <FileUpload onPhotoUpload={this.savePhotoIds}></FileUpload>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="strong-button" onClick={this.props.onHide}>
                            <XCircle /> Close
                        </Button>
                        <Button className="strong-button" variant="primary" onClick={this.handleSubmit}>
                            <PlusCircle /> Add
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

        );
    }
}
export default CreatePropertyPopUp;
