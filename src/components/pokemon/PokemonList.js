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
      .then((result) => {
        console.log(result);
        this.setState({ pokemons: result.results });
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
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
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