import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, Accordion, Card } from 'react-bootstrap';
import { PlusCircle, CardChecklist, CardList, XCircle } from 'react-bootstrap-icons';

import PropertyPhotoService from '../../services/PropertyPhotoService';
import PropertyService from '../../services/PropertyService';
import RestrictionService from '../../services/RestrictionService';
import ServiceService from '../../services/ServiceService';
import TypeService from '../../services/TypeService';
import UserService from '../../services/UserService';

class CreatePropertyPopUp extends Component {
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
                owner: JSON.parse(localStorage.getItem('user')),
                propertyType: { id: "1", name: "House" },
                reservations: [],
                propertyServices: [],
                propertyRestrictions: []
            },
            selectedFiles: undefined,
            currentFile: undefined,
            message: "",
            fileInfos: [],
        }
        this.handleClickService = this.handleClickService.bind(this);
        this.handleClickRestriction = this.handleClickRestriction.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);
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
        PropertyPhotoService.getFiles().then((res) => {
            this.setState({
                fileInfos: res.data,
            });
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
            alert("Property created");
            this.props.onCreateDone(res.data);
        }).catch(error => {
            console.log(error.response);
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];
    
        this.setState({
            currentFile: currentFile,
        });
    
        PropertyPhotoService.upload(currentFile)
            .then((response) => {
                this.setState({
                message: response.data.message,
                });
                return PropertyPhotoService.getFiles();
            })
            .then((files) => {
                this.setState({
                fileInfos: files.data,
                });
            })
            .catch(() => {
                this.setState({
                message: "Could not upload the file!",
                currentFile: undefined,
                });
            });
    
        this.setState({
          selectedFiles: undefined,
        });
    }

    render() {
        const {
            selectedFiles,
            currentFile,
            message,
            fileInfos,
        } = this.state;

        return (
            <Modal onHide={() => alert("okes")}
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
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
                                        <Form.Control type="text" name="title" required/>
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description:</Form.Label>
                                        <Form.Control as="textarea" rows={3} type="text" name="description" required/>
                                    </Form.Group>
                                    <Form.Group controlId="address">
                                        <Form.Label>Address:</Form.Label>
                                        <Form.Control type="text" name="address" required/>
                                    </Form.Group>
                                    <Form.Group controlId="city">
                                        <Form.Label>City:</Form.Label>
                                        <Form.Control type="text" name="city" required/>
                                    </Form.Group>
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

                            <div>
                                <label className="btn btn-default">
                                    <input type="file" onChange={this.selectFile} />
                                </label>

                                <Button disabled={!selectedFiles} onClick={this.upload} >
                                    Upload
                                </Button>

                                <div className="alert alert-light" role="alert">
                                    {message}
                                </div>

                                <div className="card">
                                    <div className="card-header">List of pictures</div>
                                    <ul className="list-group list-group-flush">
                                        {fileInfos &&
                                        fileInfos.map((file, index) => (
                                            <li className="list-group-item" key={index}>
                                            <a href={file.url}>{file.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

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
            </Modal>

        );
    }
}
export default CreatePropertyPopUp;
