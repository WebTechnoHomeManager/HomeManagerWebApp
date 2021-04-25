import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

class Navbar extends Component {
    render() {
        return (

            <div className="container-fluid py-2" id="header">
                <div className="row">
                    <div className="col-auto">HomeManager</div>
                    <div className="col" />
                    <div className="col-auto">FAQ</div>
                    <DropdownButton id="dropdown-basic-button" className="col-auto" title="Connexion">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </div>

            </div>
        )
    }
} export default Navbar;
