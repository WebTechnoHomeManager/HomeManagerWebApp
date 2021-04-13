import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (

            <div className="container-fluid py-2" id="header">
                <div className="row">
                    <div className="col-auto">HomeManager</div>
                    <div className="col" />
                    <div className="col-auto">FAQ</div>
                    <button className="col-auto">Connexion</button>
                </div>
            </div>
        )
    }
} export default Navbar;
