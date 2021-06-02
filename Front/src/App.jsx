import './css/App.scss';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import NotFoundRoute from './components/NotFoundRoute';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MyProperties from './pages/MyProperties';
import Property from './pages/Property';
import MyReservations from './pages/MyReservations';
import Profile from './pages/Profile';
import Messaging from './pages/Messaging';
import FAQ from './pages/FAQ';


function App() {
    return (

        <Router>
            <Navbar></Navbar>
            <div id="body-content">
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/search' component={Search}></Route>
                    <Route exact path='/property/:id' component={Property}></Route>

                    {localStorage.getItem('user') &&
                        <>
                            <Route exact path='/messaging' component={Messaging}></Route>
                            <Route exact path='/myproperties' component={MyProperties}></Route>
                            <Route exact path='/profile' component={Profile}></Route>
                            <Route exact path='/myreservations' component={MyReservations}></Route>
                            <Route exact path='/faq' component={FAQ}></Route>
                        </>
                    }

                    {/* Avec conditions (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type == "Member"),
                    marche mais si admin accède à /profile par exemple, on aura page vide sur l'url /profile,
                    au lieu d'aller sur NotFoundRoute.
                    Du coup je redirige dans le render() des pages concernées */}
                    <Route path="*" component={NotFoundRoute} />

                </Switch>
            </div>
            <Footer></Footer>
        </Router>

    );
}

export default App;
