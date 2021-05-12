import React, { Component } from 'react';
import UserService from '../services/UserService';
import '../css/App.scss';
import { Button } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    render() {
        return (<div>
            <h1 style={{ textAlign: 'center' }}>My profile</h1>
            <br></br>

            {
                this.state.users.map(
                    user => <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                        <form>
                            <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                Last name :
    <input type="text" name="name" value={user.last_name} />
                            </label>
                            <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                First name :
    <input type="text" name="surname" value={user.first_name} />
                            </label>
                            <br></br>
                            <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                Email :
    <input type="text" name="email" value={user.email} />
                            </label>
                            <label style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                                Password :
    <input type="text" name="psw" value={user.password} />
                            </label>
                            <br></br>
                        </form>

                    </div>
                )
            }
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
