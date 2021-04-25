//import logo from './logo.svg';
import '../App.css';
import { Container, Row, Col, Card, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import photo from '../images/banner2.jpg';

function MesBiens() {
    return (
        <div>
            <h1>Mes biens</h1>

            <Card style={{ width: '70%' }}>
                <Card.Header>Grande maison blablabla</Card.Header>
                <Card.Body>
                    <Container><Row>
                        <Col>
                            <Card.Title>Grande maison blablabla</Card.Title>
                            <Card.Img variant="top" src={photo} />
                            <Card.Text>Nom :</Card.Text>
                            <Card.Text>Adresse :</Card.Text>
                            <Card.Text>Liste de services :</Card.Text>
                            <Card.Text>Liste de contraintes :</Card.Text>
                            <Button variant="primary">Modifier</Button>
                            <Button variant="primary">Supprimer</Button>
                        </Col>
                        <Col><Card.Text>
                            Réservations
                        </Card.Text>
                            <DropdownButton id="dropdown-basic-button" className="col-auto" title="à venir">
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton>
                            <Card.Text>
                                Du xx au xx 2021 - par Prénom NOM
                        </Card.Text>
                        </Col>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>

            <Card style={{ width: '70%' }}>
                <Card.Header>Grande maison blablabla</Card.Header>
                <Card.Body>
                    <Container><Row>
                        <Col>
                            <Card.Title>Grande maison blablabla</Card.Title>
                            <Card.Img variant="top" src={photo} />
                            <Card.Text>Nom :</Card.Text>
                            <Card.Text>Adresse :</Card.Text>
                            <Card.Text>Liste de services :</Card.Text>
                            <Card.Text>Liste de contraintes :</Card.Text>
                            <Button variant="primary">Modifier</Button>
                            <Button variant="primary">Supprimer</Button>
                        </Col>
                        <Col><Card.Text>
                            Réservations
                        </Card.Text>
                            <Card.Text>
                                Du xx au xx 2021 - par Prénom NOM
                        </Card.Text>
                        </Col>
                    </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>

    );
}

export default MesBiens;
