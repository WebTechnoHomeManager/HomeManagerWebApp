import React, { Component } from 'react';
import FAQService from '../services/FAQService';
import '../css/App.scss';
import { Accordion, Card, Button } from 'react-bootstrap';
import { ArrowDownCircle, Check, PlusCircle, Pencil } from 'react-bootstrap-icons';

class FAQmanagement extends Component {
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
                <div style={{ textAlign: 'center', margin: '20px' }}><Button><Check></Check> Update FAQ</Button></div>
                <div style={{ textAlign: 'center', margin: '20px' }}><Button><PlusCircle></PlusCircle> New question/answer</Button></div>
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

export default FAQmanagement;
