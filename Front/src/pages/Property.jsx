import React, { Component, useState } from 'react';
import { Container, Form, Button, Row, Col, Accordion, Card, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import PropertyService from '../services/PropertyService';
import userIcon from '../images/icons/user.png';
import { Envelope, EnvelopeFill, InfoCircle, InfoCircleFill, ArrowLeftCircleFill, ArrowRightCircleFill, HouseFill } from 'react-bootstrap-icons';
import PublicProfile from '../components/PublicProfile';
import BookingPopUp from '../components/PopUp/BookingPopUp';
import LogInPopUp from '../components/PopUp/LogInPopUp';
import PropertyPhotoService from '../services/PropertyPhotoService';
import photoPlaceholder from '../images/houses/placeholder.jpg';

class Property extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {},
            property: {
                propertyServices: [],
                propertyRestrictions: [],
                propertyType: {},
                owner: {},
            },
            propertyPhotos: [],
            photoIndex: 0,
            showPublicProfilePopUp: false,
            showBookingPopUp: false,
            showLogInPopUp: false,
            userID: null,
            isUserLoggedIn: localStorage.getItem("user") != ""
        }
        this.goToMessagingPage = this.goToMessagingPage.bind(this);
        this.showPublicProfile = this.showPublicProfile.bind(this);
        this.hidePublicProfile = this.hidePublicProfile.bind(this);
        this.showBookingPopUp = this.showBookingPopUp.bind(this);
        this.hideBookingPopUp = this.hideBookingPopUp.bind(this);
        this.hideLogInPopUp = this.hideLogInPopUp.bind(this);
        this.createDone = this.createDone.bind(this);
        this.getPropertyPhotos = this.getPropertyPhotos.bind(this);
        this.browsePhoto = this.browsePhoto.bind(this);
    }

    componentDidMount() {
        PropertyService.getPropertyById(this.state.id).then(res => {
            this.setState({ property: res.data });
            this.getPropertyPhotos(res.data)
        })
        console.log(this.props.location.state);
    }

    getPropertyPhotos(property){
        var propertyId = property.id;
        var that = this;
        PropertyPhotoService.getPhotoByPropertyId(propertyId).then((res) => {
            var photos = res.data;
            if (photos.length > 0){
                var blobData = [];
                for (var index in photos){
                    blobData.push(photos[index].data);
                }
                that.setState({ propertyPhotos: blobData })
            }
        })
    }
    goToMessagingPage() {
        if (this.state.isUserLoggedIn){
            this.props.history.push({
                pathname: '/messaging',
                state: { newInterlocutor: this.state.property.owner }
            });
        } else {
            this.setState({ showLogInPopUp: true });
        }
    }

    showPublicProfile(ownerId) {
        if (this.state.isUserLoggedIn){
            this.setState({ userID: ownerId, showPublicProfilePopUp: true });
        } else {
            this.setState({ showLogInPopUp: true });
        }
    }

    hidePublicProfile() {
        this.setState({ showPublicProfilePopUp: false });
    }

    showBookingPopUp() {
        if (this.state.isUserLoggedIn){
            this.setState({ showBookingPopUp: true });
        } else {
            this.setState({ showLogInPopUp: true });
        }
    }

    hideBookingPopUp() {
        this.setState({ showBookingPopUp: false });
    }

    hideLogInPopUp() {
        this.setState({ showLogInPopUp: false });
    }

    createDone() {
        this.hideBookingPopUp();

        this.props.history.push({
            pathname: '/myreservations'
        });
    }

    browsePhoto(shift){
        var nbPhotos = this.state.propertyPhotos.length;
        var currentIndex = this.state.photoIndex;
        var newIndex = currentIndex + shift;
        if (newIndex < 0){
            newIndex = nbPhotos - 1;
        } else if (newIndex >= nbPhotos){
            newIndex = 0;
        }
        this.setState({ photoIndex: newIndex });
    }

    render() {
        var blob = this.state.propertyPhotos[this.state.photoIndex];
        var photo = blob != undefined ? "data:image/png;base64," + blob : photoPlaceholder;

        return (
            <>
                <div>
                    <Container className="my-5">
                        <h3 className="center">{this.state.property.title}</h3>
                        <Row>
                            <div style={{flexDirection:"row", display:"flex", justifyContent: "center", maxHeight:"500px", marginBottom: "10px"}}>
                                <Button className="arrow-button shadow-none" type="button" >
                                    <ArrowLeftCircleFill style={{fontSize: "2rem", marginRight: "15px"}}
                                        onClick={() => this.browsePhoto(-1)}/>
                                </Button>
                                <Image src={photo} style={{margin:0, width:"500px"}}/>
                                <Button className="arrow-button shadow-none" type="button" >
                                    <ArrowRightCircleFill style={{fontSize: "2rem", marginLeft: "15px"}}
                                                            onClick={() => this.browsePhoto(1)}/>
                                </Button>
                            </div>
                            <h5 style={{textAlign: "center"}}>
                                {this.state.propertyPhotos.length == 0 ? "Pas de photo" : "Photo " + (this.state.photoIndex+1) + "/" + this.state.propertyPhotos.length}
                            </h5>
                           
                        </Row>
                        <Row>
                            <div className="div-center-content">
                                <Button className="strong-button" variant="primary" onClick={() => this.showBookingPopUp()}
                                style={{fontSize: "1.2rem", marginTop: "10px", marginBottom:"5px"}}>
                                    <HouseFill style={{marginBottom: "1px"}}/>  Book this property
                                </Button>
                            </div>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Card className="my-3">
                                    <Card.Body>
                                        <Row>
                                            <Card.Title>{this.state.property.propertyType.name} for {this.state.property.totalOccupancy} occupant(s)</Card.Title>
                                            <Card.Text>{this.state.property.description}</Card.Text>
                                            <Card.Text>Address: {this.state.property.address}</Card.Text>

                                            <Card.Text>Required services:
                                            <ul>
                                                    {this.state.property.propertyServices.map(service =>
                                                        <li key={service.id} className="card-list-items">{service.name}</li>
                                                    )}
                                                </ul>
                                            </Card.Text>
                                            <Card.Text>Constraints to respect:
                                            <ul>
                                                    {this.state.property.propertyRestrictions.map(restriction =>
                                                        <li key={restriction.id} className="card-list-items">{restriction.name}</li>
                                                    )}
                                                </ul>
                                            </Card.Text>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6}>
                                <Card className="my-3">
                                    <Card.Body>
                                        <Card.Title>Owner</Card.Title>
                                        <Row>
                                            <Col sm={"auto"} style={{ paddingRight: 0 }}>
                                                <Image style={{ width: "50px" }} src={userIcon} className="my-3 d-block" />
                                            </Col>
                                            <Col>
                                                <Card.Text style={{ marginBottom: "0.2rem" }}>
                                                    {this.state.property.owner.firstName} {(this.state.property.owner.lastName ? this.state.property.owner.lastName[0] : "") + "."}
                                                </Card.Text>
                                                <Button className="strong-button" style={{ fontSize: "0.8rem" }}
                                                    onClick={() => this.showPublicProfile(this.state.property.owner.id)} >
                                                    <InfoCircleFill />
                                                  More information
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="div-center-content">
                                                <Button className="soft-button blue-soft-button btn-secondary"
                                                    onClick={() => this.goToMessagingPage()}
                                                    disabled={this.state.user.id != undefined && this.state.user.id == this.state.property.owner.id}>
                                                    <EnvelopeFill />  Contact the owner
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                    {/* <pre>{JSON.stringify(this.state.property, null, 2)}</pre> */}
                </div>

                {this.state.userID != null &&
                    <PublicProfile
                        show={this.state.showPublicProfilePopUp}
                        onHide={this.hidePublicProfile}
                        userId={this.state.userID} key={this.state.userID}
                        history={this.props.history}
                    />
                }
                {this.state.isUserLoggedIn &&
                    <BookingPopUp
                        show={this.state.showBookingPopUp}
                        onHide={this.hideBookingPopUp}
                        propertyId={this.state.id} key={this.state.id}
                        dateFrom={this.props.location.state != undefined ? this.props.location.state.dateFrom : null}
                        dateTo={this.props.location.state != undefined ? this.props.location.state.dateTo : null}
                        onCreateDone={this.createDone}
                    />
                }
                <LogInPopUp
                    show={this.state.showLogInPopUp} key={this.state.showLogInPopUp}
                    onHide={this.hideLogInPopUp}
                />
            </>
        )
    }
} export default Property;
