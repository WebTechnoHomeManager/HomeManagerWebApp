import React, { Component, useState } from 'react';
import { Container, Form, Button, Row, Col, Accordion, Card, Image } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MapProperties from '../components/MapProperties';
import PropertyService from '../services/PropertyService';
import photo from '../images/houses/house1.jpg';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: []
        }

        this.launchSearch = this.launchSearch.bind(this);
        this.viewProperty = this.viewProperty.bind(this);
        this.selectCard = this.selectCard.bind(this);

        var dataFromSearch = this.props.location.state;
        if (dataFromSearch) {
            this.launchSearch(dataFromSearch);
        }
    }

    launchSearch(data) {
        PropertyService.getPropertiesBy(data).then((resp) => {
            this.setState({ properties: resp.data });
        });
    }

    viewProperty(id) {
        this.props.history.push({
            pathname: `/property/${id}`,
            state: this.props.location.state
        })
    }

    selectCard(id){
        var cards = document.querySelectorAll('[id^="property"]');
        for (var card of cards){
            card.style.backgroundColor = "white";
        }
        document.getElementById("property"+id).style.backgroundColor = "#e3e3e3";
        document.getElementById("property"+id).scrollIntoView();
    }

    render() {
       

        return (
            <div>
                <Container className="my-5">
                    <h3>Your search</h3>
                    <Row>
                        {/* history attribute : to allow the use of "this.props.history.push" in the child component
                        (normally it works only if the component has a defined Route in App.js) */}
                        <SearchBar history={this.props.history}
                            data={this.props.location.state}
                            launchSearch={this.launchSearch}></SearchBar>
                    </Row>
                </Container>
                <Container className="my-5" id="search-results" fluid style={{paddingLeft: 50, paddingRight: 50}}>
                    <Row style={{height: "100%"}}>
                        <h4>{this.state.properties.length} result(s)</h4>
                        <Col sm={6} id="search-results-list">
                            {
                                this.state.properties.map(property =>
                                    <Card id={"property"+property.id} className="my-3 card-with-link" key={"property" + property.id}
                                        onClick={() => this.viewProperty(property.id)}>
                                        <Card.Body>
                                            <Row>
                                                <Col sm={6}>
                                                    <Card.Img variant="top" src={photo} />
                                                </Col>
                                                <Col sm={6}>
                                                    <Card.Title>{property.title}</Card.Title>
                                                    <Card.Text>{property.city}</Card.Text>
                                                    <Card.Text>For {property.totalOccupancy} occupant(s)</Card.Text>
                                                    <Card.Text>Required services:
                                                        <ul>
                                                            {property.propertyServices
                                                                .sort((a, b) => a.id > b.id ? 1 : -1)
                                                                .map(service =>
                                                                    <li key={service.id} className="card-list-items">{service.name}</li>
                                                                )}
                                                        </ul>
                                                    </Card.Text>
                                                    <Card.Text>Constraints to respect:
                                                        <ul>
                                                            {property.propertyRestrictions
                                                                .sort((a, b) => a.id > b.id ? 1 : -1)
                                                                .map(restriction =>
                                                                    <li key={restriction.id} className="card-list-items">{restriction.name}</li>
                                                                )}
                                                        </ul>
                                                    </Card.Text>
                                                    {/* <Card.Text>
                                                        <small className="text-muted">Last updated 3 mins ago</small>
                                                    </Card.Text> */}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                )
                            }

                        </Col>
                        <Col sm={6}>
                            <MapProperties properties={this.state.properties}
                                           onClickOnPoint={this.selectCard}></MapProperties>
                        </Col>
                    </Row>
                </Container>

                {/* <pre>{JSON.stringify(this.state.properties, null, 2)}</pre> */}

            </div>
        )
    }
} export default Search;
