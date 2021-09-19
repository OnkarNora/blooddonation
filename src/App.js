import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Search from './Search';
import Home from './Home';
import Register from './Register';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
            <Header />
            <Switch>
                <Route path="/register" ><Register /></Route>
                <Route path="/search" ><Search /></Route>
                <Route path="/" ><Home /></Route>
            </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
