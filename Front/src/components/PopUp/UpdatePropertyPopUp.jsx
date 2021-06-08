import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, Accordion, Card } from 'react-bootstrap';
import PropertyService from '../../services/PropertyService';
import RestrictionService from '../../services/RestrictionService';
import ServiceService from '../../services/ServiceService';
import TypeService from '../../services/TypeService';
import { Pencil, CardChecklist, CardList, XCircle } from 'react-bootstrap-icons';
import AdressService from "../../services/AddressService"

class UpdatePropertyPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.propertyId,
            suggestedAddresses: [],
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
        this.doesServiceNeedToBeChecked = this.doesServiceNeedToBeChecked.bind(this);
        this.doesRestrictionNeedToBeChecked = this.doesRestrictionNeedToBeChecked.bind(this);
        this.addressAutocomplete = this.addressAutocomplete.bind(this);
        this.handleAddressSelection = this.handleAddressSelection.bind(this);
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
            alert("Property updated");
            console.log('property => ' + JSON.stringify(property));
            console.log('id => ' + JSON.stringify(this.state.id));
            this.props.onUpdateDone(res.data);
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

    doesServiceNeedToBeChecked(id){
        return this.state.property.propertyServices.some(item => item.id == id);
    } 

    doesRestrictionNeedToBeChecked(id){
        return this.state.property.propertyRestrictions.some(item => item.id == id);
    } 

    addressAutocomplete(address){
        AdressService.getAddress(encodeURI(address)).then((resp) => {
            console.log(resp.data); 
            const suggestedAddresses = resp.data.results.filter(address => address.type == "Point Address");
            this.setState({ suggestedAddresses: suggestedAddresses.slice(0, 5) }); 
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

    
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div style={{paddingLeft:"25px", paddingRight:"25px", paddingTop:"10px",paddingBottom:"10px"}}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Property
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <div className="div-center-content">

                                    <Form id="update-property-popup" onChange={this.handleChange}>
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
                                            <Form.Control type="text" name="address" autocomplete="off"
                                                          defaultValue={this.state.property.address}
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
                                        {/* <Form.Group controlId="city">
                                            <Form.Label>City:</Form.Label>
                                            <Form.Control type="text" name="city" defaultValue={this.state.property.city} />
                                        </Form.Group> */}
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
                                                type => <option key={type.id} value={[type.id, type.name]} 
                                                selected={type.name === this.state.property.propertyType.name} > {type.name} </option>
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
                                                                    checked={this.doesServiceNeedToBeChecked(service.id)}
                                                                    name={"service" + service.id}
                                                                    label={service.name}
                                                                    id={"service" + service.id} 
                                                                    onChange={(e) => { this.handleClickService(e, service) }}
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
                                                                    checked={this.doesRestrictionNeedToBeChecked(restriction.id)}
                                                                    name={"restriction" + restriction.id}
                                                                    label={restriction.name}
                                                                    id={"restriction" + restriction.id} 
                                                                    onChange={(e) => { this.handleClickRestriction(e, restriction) }}
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
                        <Button className="strong-button" onClick={this.handleSubmit}> <Pencil /> Update</Button>
                    </Modal.Footer>
                </div>
            </Modal>

        );
    }
} export default UpdatePropertyPopUp;
