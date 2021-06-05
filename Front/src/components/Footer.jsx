import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (

            <Container fluid className="py-2" id="footer">
                <p>Contact us - Sarah HEOUAINE, My-Linh LE THIEN, Elia TSO, Caroline YAN</p>
                <p>General Conditions of Use</p>
                <p>© 2021 Home Manager</p>
            </Container>
        )
    }
} export default Footer;
