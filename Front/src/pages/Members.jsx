import React, { Component } from 'react';
import { Table, Button, Row } from 'react-bootstrap';
import UserService from '../services/UserService';
import { Trash, EnvelopeFill } from 'react-bootstrap-icons';
import { Redirect } from "react-router-dom";

class Members extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem('user') != "" ? JSON.parse(localStorage.getItem('user')) : {},
            users: []
        }
        this.deleteMember = this.deleteMember.bind(this);
        this.goToMessagingPage = this.goToMessagingPage.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data });
        });
    }

    deleteMember(userId) {
        UserService.deleteUser(userId).then((res) => {
            this.setState({ users: this.state.users.filter(user => user.id !== res.data.deletedId) });
        }).catch(error => {
            console.log(error.response);
        });
    }

    goToMessagingPage(user) {
        this.props.history.push({
            pathname: '/messaging',
            state: { newInterlocutor: user }
        });
    }

    render() {
        if (this.state.user == "" || this.state.user.type != "Admin") {
            return <Redirect to='/' />;
        }
        return (
            <div style={{ margin: '20px' }}>
                <h2 className="center">Members List</h2>
                <br></br>
                <div className="div-center-content">
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
                                    this.state.users
                                    .filter(user => user.type != "Admin")
                                    .map(
                                        user =>
                                            <tr key={user.id}>
                                                <td> {user.firstName} </td>
                                                <td> {user.lastName}</td>
                                                <td> {user.email}</td>
                                                <td style={{display: "flex"}}>
                                                    <Button style={{ marginLeft: "10px"}} 
                                                    onClick={() => { if (window.confirm('Are you sure you wish to delete ' + user.firstName + ' ' + user.lastName + '\'s profile?')) this.deleteMember(user.id) }} 
                                                    className="soft-button red-soft-button btn-danger">
                                                        <div style={{flexDirection:"row", display:"flex"}}>
                                                            <Trash style={{margin:"auto"}}/>  Delete 
                                                        </div>
                                                    </Button>
                                                    <Button className="soft-button blue-soft-button btn-secondary"
                                                        onClick={() => this.goToMessagingPage(user)}>
                                                        <div style={{display:"flex"}}>
                                                            <EnvelopeFill style={{margin:"auto"}}/>  Contact
                                                        </div>
                                                    </Button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Row>
                </div>


            </div>
        )
    }
} export default Members;
