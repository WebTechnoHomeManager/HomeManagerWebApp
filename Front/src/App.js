import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import banner from './images/banner2.jpg';
import { Container, Row, Col } from 'react-bootstrap'

function App() {
    return (
        <div>
            <Navbar></Navbar>
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
            <Footer></Footer>
        </div>

    );
}

export default App;
