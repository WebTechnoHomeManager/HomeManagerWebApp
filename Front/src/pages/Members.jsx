import React, { Component } from 'react';
import { Table, Button, Row } from 'react-bootstrap';
import UserService from '../services/UserService';


class Members extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
        this.deleteMember = this.deleteMember.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    deleteMember(userId) {
        UserService.deleteUser(userId).then((res) => {
            this.setState({ users: this.state.users.filter(user => user.id !== res.data.deletedId) }, () => {
                this.props.history.push("/members");
            });
        }).catch(error => {
            console.log(error.response);
        });
    }

    render() {

        return (
            <div style={{ margin: '20px' }}>
                <h2 className="center">Members List</h2>
                <br></br>
                <Row>
                    <Table striped bordered hover style={{ width: "90%", textAlign: "center" }}>

                        <thead>
                            <tr>
                                <th> Member's First Name</th>
                                <th> Member's Last Name</th>
                                <th> Member's Email</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td> {user.firstName} </td>
                                            <td> {user.lastName}</td>
                                            <td> {user.email}</td>
                                            <td>
                                                <Button className="btn btn-info">Update </Button>
                                                <Button style={{ marginLeft: "10px" }} onClick={() => { if (window.confirm('Are you sure you wish to delete ' + user.firstName + ' ' + user.lastName + '\'s profile?')) this.deleteMember(user.id) }} className="btn btn-danger">Delete </Button>
                                                <Button style={{ marginLeft: "10px" }} className="btn btn-info">View </Button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>

                </Row>

            </div>
        )
    }
} export default Members;
