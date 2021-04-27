//import logo from '../logo.svg';
import '../css/App.scss';
import banner from '../images/banner/banner2-cropped2.jpg';
import { Container, Row } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import HProperties from '../components/HProperties';
import Image from 'react-bootstrap/Image'

function Home() {
    return (
        <div>
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
            <Container className="my-5">
                <Row>
                    <HProperties></HProperties>
                </Row>
            </Container>
        </div>

    );
}

export default Home;


