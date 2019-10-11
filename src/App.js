import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navbar from './components/layouts/Navbar';
import Pokedex from './components/layouts/Pokedex';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Pokedex />
        </div>
      </div>
    );
  }
}

export default App;
