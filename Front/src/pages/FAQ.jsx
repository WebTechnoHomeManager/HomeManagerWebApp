import React, { Component } from 'react';
import FAQService from '../services/FAQService';
import '../css/App.scss';
import { Accordion, Card, Button } from 'react-bootstrap';
import { ArrowDownCircle, Pencil } from 'react-bootstrap-icons';

class FAQ extends Component {
    constructor(props) {
        super(props)

        this.state = {
            faq: []
        }
    }

    componentDidMount() {
        FAQService.getFAQ().then(res => {
            this.setState({ faq: res.data });
        })
    }



    render() {

        var userType = JSON.parse(localStorage.getItem("user")).type;
        var editButton = null;

        if (userType !== undefined) {
            if (userType.toLowerCase() === 'admin') {
                editButton = <Button href="/faq-admin"><Pencil></Pencil>Edit FAQ</Button>
            }
        }

        return (
            <div>
                <h1 style={{ textAlign: 'center', margin: '20px' }}>FAQ</h1>
                <div style={{ textAlign: 'center', margin: '20px' }}>{editButton}</div>
                <Accordion defaultActiveKey="0">
                    {
                        this.state.faq.map(faq =>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} key={faq.id} eventKey={faq.id}>
                                        <ArrowDownCircle></ArrowDownCircle>  {faq.question}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse key={faq.id} eventKey={faq.id}>
                                    <Card.Body>{faq.answer}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        )}
                </Accordion>

            </div>

        )
    }

}

export default FAQ;
