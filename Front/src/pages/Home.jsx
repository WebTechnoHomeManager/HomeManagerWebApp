//import logo from '../logo.svg';
import '../css/App.scss';
import banner from '../images/banner/banner2-cropped2.jpg';
import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import HighlightedProperties from '../components/HighlightedProperties';
import Image from 'react-bootstrap/Image';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <Container fluid>
                    <Row className="div-banner">
                        <Image src={banner} className="img-fluid mx-auto d-block banner" />
                    </Row>
                </Container>
                <Container className="my-5">
                    <Row>
                        {/* history attribute : to allow the use of "this.props.history.push" in the child component
                        (normally it works only if the component has a defined Route in App.js) */}
                        <SearchBar history={this.props.history}></SearchBar>
                    </Row>
                </Container>
                <Container className="my-5">
                    <Row>
                        <HighlightedProperties history={this.props.history}></HighlightedProperties>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Home;


