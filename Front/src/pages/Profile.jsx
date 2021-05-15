import React, { Component } from 'react';
import UserService from '../services/UserService';
import '../css/App.scss';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 2,
            user: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            this.setState({ user: res.data });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let user = this.state.user;
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));
        UserService.updateUser(user, this.state.id).then(res => {
            this.props.history.push('/profile');
            alert("Profil modifié");
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
                <form onChange={this.handleChange} >
                    <label className="div-center-content">
                        Last name :
    <input type="text" name="last_name" defaultValue={this.state.user.last_name} style={{ width: "250px" }} />
                    </label>
                    <label className="div-center-content">
                        First name :
    <input type="text" name="first_name" defaultValue={this.state.user.first_name} style={{ width: "250px" }} />
                    </label>
                    <br></br>
                    <label className="div-center-content">
                        Email :
    <input type="text" name="email" defaultValue={this.state.user.email} style={{ width: "250px" }} />
                    </label>
                    <label className="div-center-content">
                        Password :
    <input type="password" name="password" defaultValue={this.state.user.password} style={{ width: "250px" }} />
                    </label>
                    <br></br>
                </form>


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
