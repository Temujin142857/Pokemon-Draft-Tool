// App.js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SelectedMatchup from './Pages/SelectedMatchup';


const App = () => {
  return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        {/* Define other routes here if needed */}
      </BrowserRouter>
  );
};

export default App;