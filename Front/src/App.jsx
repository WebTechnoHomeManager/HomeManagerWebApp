import './css/App.scss';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MyProperties from './pages/MyProperties';
import Property from './pages/Property';
import MyReservations from './pages/MyReservations';
import Profile from './pages/Profile';
import Messaging from './pages/Messaging';


function App() {
    return (

        <Router>
            <Navbar></Navbar>
            <div id="body-content">
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/search' component={Search}></Route>
                    <Route exact path='/property/:id' component={Property}></Route>
                    <Route exact path='/myproperties' component={MyProperties}></Route>
                    <Route exact path='/profile' component={Profile}></Route>
                    <Route exact path='/messaging' component={Messaging}></Route>
                    <Route exact path='/myreservations' component={MyReservations}></Route>
                </Switch>
            </div>
            <Footer></Footer>
        </Router>

    );
}

export default App;
