import React, { Component } from 'react';
import UserService from '../services/UserService';
import '../css/App.scss';
import { Button, Form } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let user = this.state.user;
        console.log('user => ' + JSON.stringify(user));

        UserService.updateUser(user, this.state.user.id).then(res => {
            this.props.history.push('/profile');
            alert("Profile updated");
        });
    }

    handleChange = (event) => {
        let user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    render() {
        return (<div>
            <h1 style={{ textAlign: 'center' }}>My profile</h1>
            <br></br>

            <div className="div-center-content">

                <Form onChange={this.handleChange}>
                    <Form.Group controlId="last_name">
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control type="text" name="last_name" defaultValue={this.state.user.last_name} />
                    </Form.Group>
                    <Form.Group controlId="first_name">
                        <Form.Label>First name:</Form.Label>
                        <Form.Control type="text" name="first_name" defaultValue={this.state.user.first_name} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" name="email" defaultValue={this.state.user.email} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" defaultValue={this.state.user.password} />
                    </Form.Group>
                </Form>
            </div>
                )

            <div className="div-center-content">
                <Button variant="primary" onClick={this.handleSubmit}> <Pencil /> Update</Button>
            </div>
            <br></br>
            <div className="div-center-content">
                <Button variant="primary"> <Trash />Delete my profile</Button>
            </div>


        </div>);
    }
}

export default Profile;
