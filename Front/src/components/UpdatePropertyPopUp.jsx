import React, { Component } from 'react';
import { Form, Button, Modal, Row, Col, } from 'react-bootstrap';
import PropertyService from '../services/PropertyService';
import { Pencil } from 'react-bootstrap-icons';

class UpdatePropertyPopUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 2,
            property: {}
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
                                        <Form.Control type="text" name="description" defaultValue={this.state.property.description} />
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
                            <Button variant="primary" onClick={this.handleSubmit}> <Pencil /> Update</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        );
    }
} export default UpdatePropertyPopUp;
