import './css/App.scss';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import MesBiens from './pages/MesBiens';


function App() {
    return (
        <div>
            <Navbar></Navbar>
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/mesbiens' component={MesBiens}></Route>
            </Switch>
            <Footer></Footer>
        </div >

    );
}

export default App;
