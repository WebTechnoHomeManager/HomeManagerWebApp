import React, { Component } from 'react';
import FAQService from '../services/FAQService';
import '../css/App.scss';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { ArrowDownCircle, Check, PlusCircle, Trash } from 'react-bootstrap-icons';

class FAQmanagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            faq: [],
            showNewField: false,
            newFAQ: {
                question: "",
                answer: ""
            }
        }
        this.deleteFAQ = this.deleteFAQ.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showNewField = this.showNewField.bind(this);
        this.handleNewFAQ = this.handleNewFAQ.bind(this);
        this.submitNewFAQ = this.submitNewFAQ.bind(this);
    }

    componentDidMount() {
        FAQService.getFAQ().then(res => {
            this.setState({ faq: res.data });
        })
    }

    deleteFAQ(faqid) {
        FAQService.deleteFAQ(faqid).then((res) => {
            this.setState({ faq: this.state.faq.filter(faq => faq.id !== res.data.deletedId) });
            this.props.history.push("/faq");
            document.location.reload();
        }).catch(error => {
            console.log(error.response);
        });
        console.log(faqid);
    }

    handleSubmit = (faqid) => (e) => {
        e.preventDefault();
        let faq = this.state.faq.filter(faq => { return faq.id === faqid })
        console.log('faq => ' + JSON.stringify(faq[0]));

        FAQService.updateFAQ(faq[0], faqid).then(res => {
            this.props.history.push('/faq');
            document.location.reload();
            alert("FAQ updated");
        }).catch(error => {
            console.log(error.response);
        });
    }

    handleChange = (faqid) => (event) => {
        let question = this.state.faq.filter(faq => { return faq.id === faqid });
        question[0][event.target.id] = event.target.value;
        console.log(question);
        console.log(this.state.faq);
    }

    showNewField() {
        this.setState({
            showNewField: true
        })
    }

    handleNewFAQ = (e) => {
        let newFAQ = { ...this.state.newFAQ };
        newFAQ[e.target.name] = e.target.value;
        this.setState({ newFAQ });
    }

    submitNewFAQ = (e) => {
        e.preventDefault();
        let faq = { ...this.state.newFAQ };
        console.log('faq => ' + JSON.stringify(faq));
        FAQService.createFAQ(faq).then(res => {
            this.props.history.push('/faq');
            document.location.reload();
            alert("FAQ created");
        }).catch(error => {
            console.log(error.response);
        });
    }


    render() {

        return (
            <div>
                <h1 style={{ textAlign: 'center', margin: '20px' }}>FAQ</h1>
                <div style={{ textAlign: 'center', margin: '20px' }}><Button onClick={() => this.showNewField()}><PlusCircle></PlusCircle> New question/answer</Button></div>

                <Accordion >
                    {this.state.showNewField ?
                        <Form key="newfaq" onChange={this.handleNewFAQ} onSubmit={this.submitNewFAQ}>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} key="newfaq" eventKey='0'>
                                        <ArrowDownCircle></ArrowDownCircle> <Form.Group controlId="question"> <Form.Control type="text" name="question"></Form.Control></Form.Group>
                                        <div>
                                            <Button className="soft-button blue-soft-button" type="submit"><PlusCircle></PlusCircle>Add</Button>
                                        </div>
                                    </Accordion.Toggle>

                                </Card.Header>
                                <Accordion.Collapse key="newfaq" eventKey='0'>
                                    <Card.Body><Form.Group controlId="answer"> <Form.Control as="textarea" type="text" name="answer"></Form.Control></Form.Group></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Form>
                        :
                        <div></div>
                    }

                    {
                        this.state.faq.map(faq =>
                            <Form onChange={this.handleChange(faq.id)} onSubmit={this.handleSubmit(faq.id)} key={faq.id}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} key={faq.id} eventKey={faq.id}>
                                            <ArrowDownCircle></ArrowDownCircle> <Form.Group controlId="question"> <Form.Control type="text" name={faq.id - 1} defaultValue={faq.question}></Form.Control></Form.Group>
                                            <div>
                                                <Button className="soft-button blue-soft-button" type="submit"><Check></Check>Edit</Button>
                                                <Button className="soft-button red-soft-button" onClick={() => { if (window.confirm('Are you sure you wish to delete FAQ number ' + faq.id + '?')) this.deleteFAQ(faq.id) }}><Trash></Trash>Delete</Button>
                                            </div>
                                        </Accordion.Toggle>

                                    </Card.Header>
                                    <Accordion.Collapse key={faq.id} eventKey={faq.id}>
                                        <Card.Body><Form.Group controlId="answer"> <Form.Control as="textarea" type="text" name={faq.id - 1} defaultValue={faq.answer}></Form.Control></Form.Group></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Form>
                        )}
                </Accordion>

            </div>

        )
    }

}

export default FAQmanagement;
