import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import PropertyService from '../services/PropertyService';
import PropertyPhotoService from '../services/PropertyPhotoService';
import photoPlaceholder from '../images/houses/placeholder.jpg';

class HighlightedProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recentProperties: [],
            propertiesPhotos: []
        }
        
        PropertyService.getFourMostRecentProperties().then(res => {
            this.setState({ recentProperties: res.data });
            for (var index in res.data){
                this.getPropertyPhoto(res.data[index]);
            }
        })

        this.viewProperty = this.viewProperty.bind(this);
        this.getPropertyPhoto = this.getPropertyPhoto.bind(this);
    }
    

    getPropertyPhoto(property){
        var propertyId = property.id;
        var that = this;
        PropertyPhotoService.getPhotoByPropertyId(propertyId).then((res) => {
            var photos = res.data;
            var firstPhoto = photos[0];
            var blobData = ""
            if (firstPhoto != undefined){
                var propertyId = firstPhoto.property.id;
                blobData = photos[0].data

                that.setState(prevState => ({
                    propertiesPhotos: {
                        ...prevState.propertiesPhotos,
                        [propertyId]: blobData
                    }
                }))
            }
        })
    }

    viewProperty(id) {
        this.props.history.push({
            pathname: `/property/${id}`,
            //state: this.props.location.state
        })
    }

    render() {
        return (
            <Row>
                <h4>Recently added...</h4>
                {this.state.recentProperties.map(property => {
                    var blob = this.state.propertiesPhotos[property.id];
                    var photo = blob != undefined ? "data:image/png;base64," + blob : photoPlaceholder;
                    return (
                        <Col key={property.id}>
                            <h5>{property.city}</h5>
                            <Image src={photo} className="img-fluid mx-auto d-block card-with-link" 
                                onClick={() => this.viewProperty(property.id)}/>
                        </Col>
                    )
            })}
            </Row>
        )
    }
} export default HighlightedProperties;