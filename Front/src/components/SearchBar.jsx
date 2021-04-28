import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import moment from 'moment';
//var moment = require('moment');
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            constraints: [],
            dates: {
                from: '',
                to: ''
            }
        };      
      }

    // Update the state according to the checked boxes
    handleClick(e, key) {

        var label = e.target.labels[0].innerText; 
        var checked = e.target.checked; 

        const state = this.state[key].slice();

        if (checked){
            this.setState({
                [key]: state.concat([label])
            });
        } else if (checked == false){
            state.splice(state.indexOf(label), 1)
            this.setState({
                [key]: state
            });
        }

    }

    // Update the state according to the date inputs
    handleChangeDate(e, key) {
        var input = e.target.value;  

        this.setState(prevState => ({
            dates: {                   // object that we want to update
                ...prevState.dates,    // keep all other key-value pairs
                [key]: input      // update the value of specific key
            }
        }));
    }

    // Refresh the display of the selected items as string
    updateDisplayCheckBox(key){

        const stringDefault = {
            services: "Services...",
            constraints: "Constraintes..."
        }

        const state = this.state[key];

        if (state.length == 0){
            return stringDefault[key];
        } else {
            var stringState = state.map((obj) => obj).join(', ');
            return stringState;
        }
    }

    // Refresh the display of inputs
    updateDisplayDate(){

        const from = this.state.dates.from;
        const to = this.state.dates.to;

        if (from != '' && to != ''){
            var fromFormat = moment(from).format('ddd, MMM Do YYYY');
            var toFormat = moment(to).format('ddd, MMM Do YYYY');
            return "From " + fromFormat + " to " + toFormat;
        } else {
            return "Dates...";
        }
    }


    render() {
        return (
            <Form id="searchBar">
                <Row>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Location
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form.Control />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col className="inputSearch">
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.updateDisplayDate()}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Row>
                                            <Col sm={6}>
                                                <Form.Control type="date" onChange={(e) => this.handleChangeDate(e, "from")}/>
                                            </Col>
                                            <Col sm={6}>
                                                <Form.Control type="date" onChange={(e) => this.handleChangeDate(e, "to")}/>
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
                                    {this.updateDisplayCheckBox("services")}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    <Form.Check name="service1"
                                                label="Service 1"
                                                id="service1" onClick={(e) => this.handleClick(e, "services")}
                                    />
                                    <Form.Check name="service2"
                                                label="Service 2"
                                                id="service2" onClick={(e) => this.handleClick(e, "services")}
                                    />
                                    <Form.Check name="service3"
                                                label="Service 3"
                                                id="service3" onClick={(e) => this.handleClick(e, "services")}
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
                                    {this.updateDisplayCheckBox("constraints")}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form.Check name="constrainte1"
                                                    label="Contrainte 1"
                                                    id="constrainte1" onClick={(e) => this.handleClick(e, "constraints")}
                                        />
                                        <Form.Check name="constrainte2"
                                                    label="Contrainte 2"
                                                    id="constrainte2" onClick={(e) => this.handleClick(e, "constraints")}
                                        />
                                        <Form.Check name="constrainte3"
                                                    label="Contrainte 3"
                                                    id="constrainte3" onClick={(e) => this.handleClick(e, "constraints")}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                    <Col sm={1}>
                        <Button as="input" type="submit" value="Search"/>
                    </Col>
                </Row>

            </Form>
        )
    }
} export default SearchBar;