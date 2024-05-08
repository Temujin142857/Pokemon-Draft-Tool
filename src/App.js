// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SelectedMatchup from './Pages/SelectedMatchup';


const App = () => {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/selectedMatchup">Selected Matchup</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/selectedMatchup">
              <SelectedMatchup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
};

export default App;