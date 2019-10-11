import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navbar from './components/layouts/Navbar';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
      </div>
    );
  }
}

export default App;
