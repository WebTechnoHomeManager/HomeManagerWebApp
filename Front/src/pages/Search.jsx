import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import PropertyService from '../services/PropertyService';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            properties: []
        }
    }

    componentDidMount(){
        var dataFromSearch = this.props.location.state;
        PropertyService.getPropertiesBy(dataFromSearch).then((resp) => {
            this.setState({properties: resp.data});
            console.log("res" + resp.data);
        });
    }

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.state.properties, null, 2)}</pre>
            </div>
        )
    }
} export default Search;