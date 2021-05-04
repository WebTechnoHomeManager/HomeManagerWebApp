import './css/App.scss';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import MesBiens from './pages/MesBiens';
import Messaging from './pages/Messaging';


function App() {
    return (

        <Router>
            <Navbar></Navbar>
            <div id="body-content">
                <Switch> 
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/search' component={Search}></Route>
                    <Route exact path='/mesbiens' component={MesBiens}></Route>
                    <Route exact path='/messaging' component={Messaging}></Route>
                </Switch>
            </div>
            <Footer></Footer>
        </Router>

    );
}

export default App;
