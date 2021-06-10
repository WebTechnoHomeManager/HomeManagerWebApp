import React, { Component, useState } from 'react';
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'

import PropertyPhotoService from '../services/PropertyPhotoService';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFiles: [],
            uploadedFiles: [],
            message: "",
        }
        this.uploadFiles = this.uploadFiles.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
    }
    
    uploadFiles() {
    
        PropertyPhotoService.upload(this.state.selectedFiles).then((response) => {

            this.setState(prevState => ({
                message: response.data.message,
                uploadedFiles: prevState.uploadedFiles.concat(Array.from(prevState.selectedFiles)),
                selectedFiles: []
            }))
            document.getElementById("fileInput").value = "";
            this.props.onPhotoUpload(JSON.parse(response.data.photoIds));

        //     return PropertyPhotoService.getFiles();


        // }).then((files) => {
        //     this.setState({ fileInfos: files.data });
        }).catch(() => {
            this.setState({
                message: "Could not upload the file!",
                selectedFiles: []
            });
        });
    }
    
    onFileSelect(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>Photos:</Form.Label>
                <div style={{flexDirection:"row", display:"flex", justifyContent: "space-between"}}>
                    <div style={{margin:"auto", width:"100%"}}>
                        <Form.Control type="file" multiple onChange={this.onFileSelect} id="fileInput" name="file"
                                      style={{border:"1px solid #d8d8d8"}}/>
                        {/* <input type="button" value="Custom Button Name" onClick={() => document.getElementById('file').click()} /> */}
                    </div>
                    
                    <Button disabled={this.state.selectedFiles.length == 0} onClick={this.uploadFiles}
                            className="soft-button2 gray-soft-button btn-secondary"
                            style={{fontSize:"0.9rem"}}>
                        Upload
                    </Button>
                </div>
                
                <div className="alert alert-light" role="alert">
                    {this.state.message}
                </div>

                <Card className="my-3">
                    <Card.Body>
                        <Row>
                            {this.state.uploadedFiles.map((file, index) => (
                                <Col sm={3} key={index}>
                                    <p>{file.name}</p>
                                    <Image src={URL.createObjectURL(file)}  
                                        className="img-fluid mx-auto d-block"/>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Form.Group>
        )
    }
} export default FileUpload;