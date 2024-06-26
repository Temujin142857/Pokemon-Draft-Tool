// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SelectedMatchup from './Pages/SelectedMatchup';
import CreateRoster from './Pages/CreateRoster';
import SelectMoves from './Pages/SelectMoves';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/selectedMatchup" element={<SelectedMatchup />} />
              <Route path="/createRoster" element={<CreateRoster />} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;