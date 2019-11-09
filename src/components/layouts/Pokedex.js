import React, { Component } from 'react';

import PokemonList from '../pokemon/PokemonList';

class Pokedex extends Component {
  render() {
    return (
      <div className='row'>
        <div className='column'>
          <PokemonList setPageNumber={this.props.match.params} />
        </div>
      </div>
    );
  }
}

export default Pokedex;