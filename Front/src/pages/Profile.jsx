import React, { Component } from 'react';
import UserService from '../services/UserService';
import '../css/App.scss';
import { Button, Form } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { Redirect } from "react-router-dom";
import Moment from "moment";

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.askForDelete = this.askForDelete.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let user = this.state.user;
        console.log('user => ' + JSON.stringify(user));

        UserService.updateUser(user, this.state.user.id).then(res => {
            localStorage.setItem('user', JSON.stringify(user));
            this.props.history.push('/profile');
            alert("Profile updated");
        });
    }

    handleChange = (event) => {
        let user = { ...this.state.user };
        if (event.target.name == "dateBirth") {
            user[event.target.name] = Moment(event.target.value).format("YYYY-MM-DD HH:mm:ss.SSS");
        }
        else {
            user[event.target.name] = event.target.value;
        }
        console.log(user);
        this.setState({ user });
    }


    deleteProfile(userId) {
        UserService.deleteUser(userId).then((res) => {
            localStorage.setItem('user', '');
            this.setState({ user: "" });
            this.props.history.push("/");
            document.location.reload();
        }).catch(error => {
            console.log(error.response);
        });
    }

    askForDelete(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete your profile?')) {
            this.deleteProfile(this.state.user.id);
        }
    }

    render() {
        if (this.state.user == "" || this.state.user.type != "Member") {
            return <Redirect to='/' />;
        }
        return (<div>
            <h1 style={{ textAlign: 'center' }}>My profile</h1>
            <br></br>

            <div className="div-center-content">

                <Form onChange={this.handleChange}>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control type="text" name="lastName" defaultValue={this.state.user.lastName} />
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Label>First name:</Form.Label>
                        <Form.Control type="text" name="firstName" defaultValue={this.state.user.firstName} />
                    </Form.Group>
                    <Form.Group controlId="dateBirth">
                        <Form.Label>Date of Birth:</Form.Label>
                        <Form.Control type="date" name="dateBirth" defaultValue={Moment(this.state.user.dateBirth).format('YYYY-MM-DD')} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" defaultValue={this.state.user.email} />
                    </Form.Group>
                    <Form.Group controlId="tel">
                        <Form.Label>Tel:</Form.Label>
                        <Form.Control type="text" name="tel" defaultValue={this.state.user.tel} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" defaultValue={this.state.user.password} />
                    </Form.Group>
                </Form>
            </div>
                )

            <div className="div-center-content">
                <Button className="strong-button" variant="primary" onClick={this.handleSubmit}> <Pencil /> Update</Button>
            </div>
            <br></br>
            <div className="div-center-content">
                <Button className="strong-button"
                    onClick={this.askForDelete} href="/"> <Trash />Delete my profile</Button>
            </div>


        </div>);
    }
}

export default Profile;
