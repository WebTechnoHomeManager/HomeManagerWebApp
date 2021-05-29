import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import moment from 'moment';
import ServiceService from '../services/ServiceService';
import RestrictionService from '../services/RestrictionService';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            services: [],
            restrictions: [],
            dateFrom: '',
            dateTo: '',
            allServices: [],
            allRestrictions: []
        }

        // If not, it won't recognize the right "this" in the functions
        this.handleClickService = this.handleClickService.bind(this); 
        this.handleClickRestriction = this.handleClickRestriction.bind(this); 
        this.handleChangeDateFrom = this.handleChangeDateFrom.bind(this); 
        this.handleChangeDateTo = this.handleChangeDateTo.bind(this); 
        this.handleEnterLocation = this.handleEnterLocation.bind(this); 
        this.handleRemoveLocation = this.handleRemoveLocation.bind(this);

        this.displayDateValue = this.displayDateValue.bind(this); 
        this.displayLocationValue = this.displayLocationValue.bind(this); 
        this.displayServicesValue = this.displayServicesValue.bind(this); 
        this.displayRestrictionsValue = this.displayRestrictionsValue.bind(this); 

        this.searchProperties = this.searchProperties.bind(this); 
        this.doesServiceNeedToBeChecked = this.doesServiceNeedToBeChecked.bind(this); 
        this.doesRestrictionNeedToBeChecked = this.doesRestrictionNeedToBeChecked.bind(this); 
        
        console.log(this.props);
        
    }


    handleEnterLocation(e) {
        var value = e.target.value.trim();

        if (e.key === 'Enter') {
            e.preventDefault(); // So the page won't refresh after hitting enter
            if (value != ""){
                const locations = this.state.locations.slice();
                if (!locations.includes(value)){
                   this.setState({locations: locations.concat([value])}); 
                }
                e.target.value = "";
            }
        }
    }

    handleRemoveLocation(city){
        const locations = this.state.locations.slice();
        locations.splice(locations.indexOf(city), 1);
        this.setState({locations: locations});
    }

    handleClickService(e, service) {
        var checked = e.target.checked; 

        const services = this.state.services.slice();

        if (checked){
            this.setState({services: services.concat([service])});
        } else {
            services.splice(services.indexOf(service), 1)
            this.setState({services: services});
        }
    }

    handleClickRestriction(e, restriction) {
        var checked = e.target.checked; 

        const restrictions = this.state.restrictions.slice();

        if (checked){
            this.setState({restrictions: restrictions.concat([restriction])});
        } else {
            restrictions.splice(restrictions.indexOf(restriction), 1)
            this.setState({restrictions: restrictions});
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
            //moment(from).format('ddd, MMM Do YYYY');
            var fromFormat = moment(from).format('DD/MM/YYYY');
            var toFormat = moment(to).format('DD/MM/YYYY');
            return "From " + fromFormat + " to " + toFormat;
        }
        
        return "Dates...";
    }

    displayLocationValue(){

        const locations = this.state.locations;

        if (locations.length == 1){
            // var stringLocations = locations.map((obj) => obj).join(', ');
            return locations.length + " selected city";
        } else if (locations.length != 0){
            return locations.length + " selected cities";
        }
        return "Locations...";
    }

    displayServicesValue(){
        const services = this.state.services;

        /*if (services.length != 0){
            var stringServices = services.map((obj) => obj).join(', ');
            return stringServices;
        }
        return "Services...";*/

        if (services.length == 1){
            return services.length + " possible service";
        } else if (services.length != 0){
            return services.length + " possible services";
        }
        return "Services...";
    }

    displayRestrictionsValue(){
        const restrictions = this.state.restrictions;

        /*if (restrictions.length != 0){
            var stringRestrictions = restrictions.map((obj) => obj).join(', ');
            return stringRestrictions;
        }
        return "Constraints...";*/
        if (restrictions.length == 1){
            return restrictions.length + " possible constraint";
        } else if (restrictions.length != 0){
            return restrictions.length + " possible constraints";
        }
        return "Constraints...";
    }

    searchProperties(e){
        // e.preventDefault();
        // console.log('data => ' + JSON.stringify(this.state));
        
        if (this.props.history && this.props.history.location.pathname == "/search"){
            this.props.launchSearch(this.state);
        } else {
            this.props.history.push({
                pathname: '/search',
                state: this.state
            });
        }
    }

    componentDidMount() {

        var dataFromPreviousSearch = this.props.data;
        if (dataFromPreviousSearch != undefined){
            this.setState(dataFromPreviousSearch);
        } else {
            ServiceService.getServices().then((res) => {
                this.setState({ allServices: res.data,
                                services: res.data });
            });
            RestrictionService.getRestrictions().then((res) => {
                this.setState({ allRestrictions: res.data,
                                restrictions: res.data });
            });
        }
    }

    doesServiceNeedToBeChecked(id){
        return this.state.services.filter(service => service.id == id).length != 0;
    } 

    doesRestrictionNeedToBeChecked(id){
        return this.state.restrictions.filter(restriction => restriction.id == id).length != 0;
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
                                        <Form.Control onKeyDown={this.handleEnterLocation}
                                                      style={{marginBottom: "10px"}}/>
                                        {this.state.locations.map(
                                            city => 
                                            <div key={city} className="tag-input">
                                                {city}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"
                                                className="tag-input-close-button"
                                                onClick={() => this.handleRemoveLocation(city)}>
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>  
                                        )}
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
                                            <Col style={{marginBottom: "10px"}}>
                                                <Form.Control type="date" onChange={this.handleChangeDateFrom}/>
                                            </Col>
                                            <Col>
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
                                    {
                                        this.state.allServices.map(
                                            service => 
                                            <Form.Check key={"service" + service.id}
                                                    defaultChecked={this.doesServiceNeedToBeChecked(service.id)} 
                                                    name={"service" + service.id}
                                                    label={service.name}
                                                    id={"service" + service.id} onClick={(e) => {this.handleClickService(e, service)}}
                                            />
                                        )
                                    }

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.displayRestrictionsValue()}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {
                                            this.state.allRestrictions.map(
                                                restriction => 
                                                <Form.Check key={"restriction" + restriction.id}
                                                        defaultChecked={this.doesRestrictionNeedToBeChecked(restriction.id)} 
                                                        name={"restriction" + restriction.id}
                                                        label={restriction.name}
                                                        id={"restriction" + restriction.id} onClick={(e) => {this.handleClickRestriction(e, restriction)}}
                                                />
                                            )
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                    <Col sm={1}>
                        <Button as="input" type="button" value="Search" onClick={this.searchProperties}/>
                    </Col>
                </Row>

            </Form>
        )
    }
} export default SearchBar;