import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (

            <div className="container-fluid py-2" id="header">
                <div className="row">
                    <div className="col-auto">HomeManager</div>
                    <div className="col" />
                    <div className="col-auto">FAQ</div>
                    <div className="col-auto">Connexion</div>
                </div>
            </div>
        )
    }
} export default Navbar;
