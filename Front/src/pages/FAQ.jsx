import React, { Component } from 'react';
import FAQService from '../services/FAQService';
import '../css/App.scss';
import { Accordion, Card } from 'react-bootstrap';
import { ArrowDownCircle } from 'react-bootstrap-icons';

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
        return (
            <div>
                <h1 style={{ textAlign: 'center', margin: '20px' }}>FAQ</h1>
                <Accordion defaultActiveKey="0">
                    {
                        this.state.faq.map(faq =>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <ArrowDownCircle></ArrowDownCircle>  {faq.question}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
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
