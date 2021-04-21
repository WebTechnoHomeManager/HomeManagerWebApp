import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            constraintes: [],
            tags: [{ id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' }],
            suggestions: suggestions,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);         
      }

    // Update the state according to the checked boxes
    handleClick(e, type) {

        var label = e.target.labels[0].innerText; 
        var checked = e.target.checked; 
        var key;

        if (type == "serv"){
            key = "services";
        } else if (type == "const"){
            key = "constraintes";
        }

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

    // Refresh the display of the selected items as string
    updateDisplay(type){

        var key;
        var stringDefault;

        if (type == "serv"){
            key = "services";
            stringDefault = "Services..."
        } else if (type == "const"){
            key = "constraintes";
            stringDefault = "Constraintes..."
        }

        const state = this.state[key];

        if (state.length == 0){
            return stringDefault
        } else {
            var stringState = state.map((obj) => obj).join(', ');
            return stringState;
        }
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <Form>
                <Row>
                    <Col>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Location
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                    <Col>
                        <Form.Group controlId="dates">
                            <Form.Label>Dates</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.updateDisplay("serv")}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                    <Form.Check name="service1"
                                                label="Service 1"
                                                id="service1" onClick={(e) => this.handleClick(e, "serv")}
                                    />
                                    <Form.Check name="service2"
                                                label="Service 2"
                                                id="service2" onClick={(e) => this.handleClick(e, "serv")}
                                    />
                                    <Form.Check name="service3"
                                                label="Service 3"
                                                id="service3" onClick={(e) => this.handleClick(e, "serv")}
                                    />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                    <Col>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {this.updateDisplay("const")}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Form.Check name="constrainte1"
                                                    label="Contrainte 1"
                                                    id="constrainte1" onClick={(e) => this.handleClick(e, "const")}
                                        />
                                        <Form.Check name="constrainte2"
                                                    label="Contrainte 2"
                                                    id="constrainte2" onClick={(e) => this.handleClick(e, "const")}
                                        />
                                        <Form.Check name="constrainte3"
                                                    label="Contrainte 3"
                                                    id="constrainte3" onClick={(e) => this.handleClick(e, "const")}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>  
                    </Col>
                </Row>

            </Form>
        )
    }
} export default SearchBar;