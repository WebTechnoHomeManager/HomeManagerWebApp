import './css/App.scss';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MyProperties from './pages/MyProperties';
import Profile from './pages/Profile';


function App() {
    return (

        <Router>
            <Navbar></Navbar>
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/search' component={Search}></Route>
                <Route exact path='/myproperties' component={MyProperties}></Route>
                <Route exact path='/profile' component={Profile}></Route>
            </Switch>
            <Footer></Footer>
        </Router>

    );
}

export default App;
