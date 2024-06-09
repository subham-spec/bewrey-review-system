import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import CascadingAutocomplete from './components/CascadingAutocomplete';
import BreweryList from './components/BreweryList';
import BreweryDetail from './components/BreweryDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/landingpage' element={<LandingPage />} />
          <Route path='/cascadingAutoComplete' element={< CascadingAutocomplete />}/>
          <Route path='/breweryList' element={< BreweryList />}/>
          <Route path="/brewery/:id" element={<BreweryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
