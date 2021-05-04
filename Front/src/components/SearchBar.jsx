import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import moment from 'moment';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            services: [],
            constraints: [],
            dateFrom: '',
            dateTo: ''
        }

        // If not, it won't recognize the right "this" in the functions
        this.handleClickService = this.handleClickService.bind(this); 
        this.handleClickConstraint = this.handleClickConstraint.bind(this); 
        this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this); 
        this.handleChangeDateTo = this.handleChangeDateTo.bind(this); 
        this.handleEnterLocation = this.handleEnterLocation.bind(this); 

        this.displayDateValue = this.displayDateValue.bind(this); 
        this.displayLocationValue = this.displayLocationValue.bind(this); 
        this.displayServicesValue = this.displayServicesValue.bind(this); 
        this.displayConstraintsValue = this.displayConstraintsValue.bind(this); 

        this.searchProperties = this.searchProperties.bind(this); 
        console.log(this.props);
      }


    handleEnterLocation(e) {

        var value = e.target.value;

        if (e.key === 'Enter') {
            e.preventDefault(); // So the page won't refresh after hitting enter
            console.log("ok");
            const locations = this.state.locations.slice();
    
            this.setState({locations: locations.concat([value])});

            // TODO : remove location
            e.target.value = "";
        }
    }

    handleClickService(e) {
        var label = e.target.labels[0].innerText; 
        var checked = e.target.checked; 

        const services = this.state.services.slice();

        if (checked){
            this.setState({services: services.concat([label])});
        } else {
            services.splice(services.indexOf(label), 1)
            this.setState({services: services});
        }
    }

    handleClickConstraint(e) {
        var label = e.target.labels[0].innerText; 
        var checked = e.target.checked; 

        const constraints = this.state.constraints.slice();

        if (checked){
            this.setState({constraints: constraints.concat([label])});
        } else {
            constraints.splice(constraints.indexOf(label), 1)
            this.setState({constraints: constraints});
        }
    }

    handleChangeDateFrom(e) {
        this.setState({dateFrom: e.target.value});
    }

    handleChangeDateTo(e) {
        this.setState({dateTo: e.target.value});
    }


    displayDateValue(){
        const from = this.state.dateFrom;
        const to = this.state.dateTo;

        if (from != '' && to != ''){
            var fromFormat = moment(from).format('ddd, MMM Do YYYY');
            var toFormat = moment(to).format('ddd, MMM Do YYYY');
            return "From " + fromFormat + " to " + toFormat;
        }
        
        return "Dates...";
    }

    displayLocationValue(){

        const locations = this.state.locations;

        if (locations.length != 0){
            var stringLocations = locations.map((obj) => obj).join(', ');
            return stringLocations;
        }
        return "Locations...";
    }

    displayServicesValue(){
        const services = this.state.services;

        if (services.length != 0){
            var stringServices = services.map((obj) => obj).join(', ');
            return stringServices;
        }
        return "Services...";
    }

    displayConstraintsValue(){
        const constraints = this.state.constraints;

        if (constraints.length != 0){
            var stringConstraints = constraints.map((obj) => obj).join(', ');
            return stringConstraints;
        }
        return "Constraints...";
    }

    searchProperties(e){
        // e.preventDefault();
        // console.log('data => ' + JSON.stringify(this.state));
        this.props.history.push({
            pathname: '/search',
            state: this.state
        });
    }


    render() {
        return (
            <Form id="searchBar">
                <Row>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.displayLocationValue()}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form.Control onKeyDown={this.handleEnterLocation}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.displayDateValue()}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row>
                                            <Col sm={6}>
                                                <Form.Control type="date" onChange={this.handleChangeDateFrom}/>
                                            </Col>
                                            <Col sm={6}>
                                                <Form.Control type="date" onChange={this.handleChangeDateTo}/>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.displayServicesValue()}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    <Form.Check name="service1"
                                                label="Service 1"
                                                id="service1" onClick={this.handleClickService}
                                    />
                                    <Form.Check name="service2"
                                                label="Service 2"
                                                id="service2" onClick={this.handleClickService}
                                    />
                                    <Form.Check name="service3"
                                                label="Service 3"
                                                id="service3" onClick={this.handleClickService}
                                    />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.displayConstraintsValue()}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form.Check name="constrainte1"
                                                    label="Contrainte 1"
                                                    id="constrainte1" onClick={this.handleClickConstraint}
                                        />
                                        <Form.Check name="constrainte2"
                                                    label="Contrainte 2"
                                                    id="constrainte2" onClick={this.handleClickConstraint}
                                        />
                                        <Form.Check name="constrainte3"
                                                    label="Contrainte 3"
                                                    id="constrainte3" onClick={this.handleClickConstraint}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                    <Col sm={1}>
                        <Button as="input" type="submit" value="Search" onClick={this.searchProperties}/>
                    </Col>
                </Row>

            </Form>
        )
    }
} export default SearchBar;