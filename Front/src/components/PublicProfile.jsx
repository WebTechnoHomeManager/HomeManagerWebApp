import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import '../css/App.scss';
import { Button, Modal, Row, Col, Image, Card, Container } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import userIcon from '../images/icons/user.png';
import photo from '../images/banner/banner2.jpg';

class PublicProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            properties: []
        }
    }

    componentDidMount() {
        PropertyService.getPropertiesByOwnerId(this.state.user.id).then((res) => {
            this.setState({ properties: res.data });
        });
    }

    render() {
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Public Profile
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <div style={{ textAlign: 'center' }}>
                                <h1>{this.state.user.lastName} {this.state.user.firstName} </h1>
                                <Image src={userIcon} className="d-block mx-auto img-fluid w-3" style={{ width: "65px" }} />
                                <p>{this.state.user.email}</p>
                                <br></br>

                                <div className="div-center-content">
                                    {
                                        this.state.properties.map(
                                            property => <div className="div-center-content" style={{ marginTop: '30px' }}><Card style={{ width: '100%' }}> <Card.Header>{property.title}</Card.Header>
                                                <Card.Body>
                                                    <Card.Img variant="top" src={photo} />
                                                    <Card.Text>Type: {property.propertyType.name}</Card.Text>
                                                    <Card.Text>Total occupancy: {property.totalOccupancy}</Card.Text>
                                                    <Card.Text>City: {property.city}</Card.Text>
                                                </Card.Body >
                                            </Card >
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.onHide}> <XCircle /> Close</Button>
                </Modal.Footer>

            </Modal>);
    }

} export default PublicProfile;
