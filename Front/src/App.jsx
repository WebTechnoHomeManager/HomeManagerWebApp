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
import Members from './pages/Members';
import Offers from './pages/Offers';
import FAQmanagement from './pages/FAQmanagement';


function App() {
    return (

        <Router>
            <Navbar></Navbar>
            <div id="body-content">
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/search' component={Search}></Route>
                    <Route exact path='/property/:id' component={Property}></Route>
                    <Route exact path='/faq' component={FAQ}></Route>

                    {/* User only pages */}
                    <Route exact path='/messaging' component={Messaging}></Route>
                    <Route exact path='/myreservations' component={MyReservations}></Route>
                    <Route exact path='/myproperties' component={MyProperties}></Route>
                    <Route exact path='/profile' component={Profile}></Route>

                    {/* Admin only pages */}
                    <Route exact path='/members' component={Members}></Route>
                    <Route exact path='/offers' component={Offers}></Route>
                    <Route exact path='/faq-admin' component={FAQmanagement}></Route>

                    <Route path="*" component={NotFoundRoute} />

                </Switch>
            </div>
            <Footer></Footer>
        </Router>

    );
}

export default App;
