import React, { Component, useState } from 'react';
import { Container, Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import PropertyService from '../services/PropertyService';
import SearchBar from '../components/SearchBar';

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
        });
    }

    render() {
        return (
            <div>

                <Container className="my-5">
                    <h3>Your search</h3>
                    <Row>
                        {/* history attribute : to allow the use of "this.props.history.push" in the child component
                        (normally it works only if the component has a defined Route in App.js) */}
                        <SearchBar history={this.props.history} data={this.props.location.state}></SearchBar>
                    </Row>
                </Container>
                <pre>{JSON.stringify(this.state.properties, null, 2)}</pre>

            </div>
        )
    }
} export default Search;