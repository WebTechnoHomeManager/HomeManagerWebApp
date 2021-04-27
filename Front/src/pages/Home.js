//import logo from '../logo.svg';
import '../App.css';
import banner from '../images/banner2.jpg';
import { Container, Row, Col } from 'react-bootstrap'

function Home() {
    return (
        <div>
            <Container fluid div-banner>
                <img src={banner} className="img-fluid mx-auto d-block test" alt="country house" />
            </Container>
            <Container>
                <Row>
                    <Col sm={8}></Col>
                    <Col sm={4}></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>

    );
}

export default Home;


