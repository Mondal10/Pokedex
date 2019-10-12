import React, { Component } from 'react';

import PokemonCard from './PokemonCard';

class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    pokemons: null
  };

  componentDidMount() {
    fetch(this.state.url)
      .then(res => res.json())
      .then((resObj) => {
        this.setState({ pokemons: resObj.results });
      })
  }

  render() {
    return (
      <React.Fragment>
        {
          (this.state.pokemons) ? (
            <div className='row'>
              {this.state.pokemons.map(pokemon =>
                <PokemonCard
                  // If possible use the pokemon index as pokemon key later 
                  key={pokemon.name}
                  pokemonName={pokemon.name}
                  pokemonUrl={pokemon.url}
                />
              )}
            </div>
          ) : (
              <h1>Loading Pokemons...</h1>
            )
        }
      </React.Fragment>
    );
  }
}

export default PokemonList;