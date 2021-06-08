import React, { Component } from 'react';
import PropertyService from '../services/PropertyService';
import UserService from '../services/UserService';
import '../css/App.scss';
import { Button, Modal, Row, Col, Image, Card, Container } from 'react-bootstrap';
import { XCircle, Telephone, Envelope, CalendarCheck } from 'react-bootstrap-icons';
import userIcon from '../images/icons/user.png';
import photo from '../images/houses/house1.jpg';
import Moment from 'moment';

class PublicProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: this.props.userId,
            user: {},
            properties: []
        }

        this.viewProperty = this.viewProperty.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(this.state.userId).then((res) => {
            this.setState({ user: res.data });
        })
        PropertyService.getPropertiesByOwnerId(this.state.userId).then((res) => {
            this.setState({ properties: res.data });
        });
    }

    viewProperty(id) {
        this.props.history.push({
            pathname: `/property/${id}`,
            //state: this.props.location.state
        })
        document.location.reload();
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

                                <Card>
                                    <Card.Body>
                                        <Image src={userIcon} className="d-block mx-auto img-fluid w-3" style={{ width: "65px" }} />
                                        <Card.Text><Envelope></Envelope>Email: {this.state.user.email}</Card.Text>
                                        <Card.Text> <Telephone></Telephone>Tel: {this.state.user.tel}</Card.Text>
                                        <Card.Text><CalendarCheck></CalendarCheck>Member since: {Moment(this.state.user.dateRegistration).format('DD-MM-YYYY')}</Card.Text>
                                    </Card.Body>
                                </Card>

                                <br></br>

                                <div className="div-center-content">
                                    {
                                        this.state.properties.map(
                                            property => 
                                            <div className="div-center-content" style={{ marginTop: '30px' }}>
                                                <Card className="card-with-link" style={{ width: '100%' }}
                                                      onClick={() => this.viewProperty(property.id)}>
                                                    <Card.Header>{property.title}</Card.Header>
                                                    <Card.Body>
                                                        <Card.Img variant="top" src={photo} />
                                                        <Card.Text>Type: {property.propertyType.name}</Card.Text>
                                                        <Card.Text>Total occupancy: {property.totalOccupancy}</Card.Text>
                                                        <Card.Text>City: {property.city}</Card.Text>
                                                    </Card.Body >
                                                </Card>
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
