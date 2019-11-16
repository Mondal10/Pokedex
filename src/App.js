import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Had to install jQuery because of bootstrap modal's requirement
// If jquery is required while coding use `import $ from 'jquery';`
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import Navbar from './components/layouts/Navbar';
import Pokedex from './components/layouts/Pokedex';
import Footer from './components/layouts/Footer';
import PokemonInfo from './components/pokemon/PokemonInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/page=:pageNumber' component={Pokedex} />
              <Route exact path='/pokemoninfo/:pokemonIndex' component={PokemonInfo} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
