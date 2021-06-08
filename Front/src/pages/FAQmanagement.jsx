import React, { Component } from 'react';
import FAQService from '../services/FAQService';
import '../css/App.scss';
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { ArrowDownCircle, Check, PlusCircle, Pencil, Trash } from 'react-bootstrap-icons';

class FAQmanagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            faq: []
        }
        this.deleteFAQ = this.deleteFAQ.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        FAQService.getFAQ().then(res => {
            this.setState({ faq: res.data });
        })
    }

    deleteFAQ(faqid) {
        /*FAQService.deleteFAQ(faqid).then((res) => {
            this.setState({ faq: this.state.faq.filter(faq => faq.id !== res.data.deletedId) });
            this.props.history.push("/faq-admin");
            document.location.reload();
        }).catch(error => {
            console.log(error.response);
        });*/
        console.log(faqid);
    }

    handleSubmit = (faqid) => (e) => {
        e.preventDefault();
        let faq = this.state.faq[faqid];
        console.log('faq => ' + JSON.stringify(faq));

        FAQService.updateFAQ(faq, faq.id).then(res => {
            this.props.history.push('/faq-admin');
            alert("FAQ updated");
        }).catch(error => {
            console.log(error.response);
        });
    }

    handleChange = (event) => {
        let faq = { ...this.state.faq };
        let question = faq[event.target.name];
        question[event.target.id] = event.target.value;
        console.log(faq);
    }
    render() {

        return (
            <div>
                <h1 style={{ textAlign: 'center', margin: '20px' }}>FAQ</h1>
                <div style={{ textAlign: 'center', margin: '20px' }}><Button ><Check></Check> Update FAQ</Button></div>
                <div style={{ textAlign: 'center', margin: '20px' }}><Button ><PlusCircle></PlusCircle> New question/answer</Button></div>
                <Accordion >
                    {
                        this.state.faq.map(faq =>
                            <Form onChange={this.handleChange} onSubmit={this.handleSubmit(faq.id - 1)} key={faq.id}>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Header} key={faq.id} eventKey={faq.id}>
                                            <ArrowDownCircle></ArrowDownCircle> <Form.Group controlId="question"> <Form.Control type="text" name={faq.id - 1} defaultValue={faq.question}></Form.Control></Form.Group>
                                            <div>
                                                <Button className="soft-button blue-soft-button" type="submit"><Pencil></Pencil>Edit</Button>
                                                <Button className="soft-button red-soft-button" onClick={() => { if (window.confirm('Are you sure you wish to delete FAQ number ' + faq.id + '?')) this.deleteFAQ(faq.id) }}><Trash></Trash>Delete</Button>
                                            </div>
                                        </Accordion.Toggle>

                                    </Card.Header>
                                    <Accordion.Collapse key={faq.id} eventKey={faq.id}>
                                        <Card.Body><Form.Group controlId="answer"> <Form.Control type="text" name={faq.id - 1} defaultValue={faq.answer}></Form.Control></Form.Group></Card.Body>
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
