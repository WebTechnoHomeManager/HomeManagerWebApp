import logo from './logo.svg';
import './css/App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import banner from './images/banner2-cropped2.jpg';
import Image from 'react-bootstrap/Image'
import { Container, Row, Col } from 'react-bootstrap'

function App() {
    return (
        <div>
            <Navbar></Navbar>
            <Container fluid>
                <Row className="div-banner">
                    <Image src={banner} className="img-fluid mx-auto d-block banner" />
                </Row>
            </Container>
            <Container className="my-5">
                <Row>
                    <SearchBar></SearchBar>
                </Row>
            </Container>
            <Footer></Footer>
        </div>

    );
}

export default App;
