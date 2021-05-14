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
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            console.log(res);
            this.setState({ user: res.data });
        });
    }

    render() {
        return (<div>
            <h1 style={{ textAlign: 'center' }}>My profile</h1>
            <br></br>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                <form>
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        Last name :
    <input type="text" name="name" value={this.state.user.last_name} style={{ width: "250px" }} />
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        First name :
    <input type="text" name="surname" value={this.state.user.first_name} style={{ width: "250px" }} />
                    </label>
                    <br></br>
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        Email :
    <input type="text" name="email" value={this.state.user.email} style={{ width: "250px" }} />
                    </label>
                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        Password :
    <input type="text" name="psw" value={this.state.user.password} style={{ width: "250px" }} />
                    </label>
                    <br></br>
                </form>


            </div>
                )

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="primary"> <Pencil /> Update</Button>
            </div>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="primary"> <Trash />Delete my profile</Button>
            </div>


        </div>);
    }
}

export default Profile;
