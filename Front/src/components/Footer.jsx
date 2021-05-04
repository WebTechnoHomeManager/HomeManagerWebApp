import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (

            <Container fluid className="py-2" id="footer">
                <p>Nous contacter</p>
                <p>Mentions légales</p>
                <p>© 2021 Home Manager</p>
            </Container>
        )
    }
} export default Footer;
