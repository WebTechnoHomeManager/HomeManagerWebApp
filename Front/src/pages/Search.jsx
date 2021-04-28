import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';


class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: {}
        }
    }

    componentDidMount(){
        PropertyService.getProperties().then((resp) => {
            this.setState({ properties: resp.data});
        });
    }

    render() {
        return (
            <div>
                { this.state.properties }
            </div>
        )
    }
} export default Search;