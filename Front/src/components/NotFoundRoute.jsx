import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class NotFoundRoute extends Component {

    constructor(props) {
        super(props)

        this.props.history.push({
            pathname: '/'
        });

    }

    render() {
        return (
            <></>
        )
    }
} export default NotFoundRoute;
