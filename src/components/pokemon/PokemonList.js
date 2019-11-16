import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import Navigate from '../layouts/Navigate';

class PokemonList extends Component {
  state = {
    url: `https://pokeapi.co/api/v2/pokemon?offset=${this.props.setPageNumber.pageNumber * 20}&limit=20`,
    pokemons: null,
    nextUrl: null,
    previousUrl: null,
    this: this,
  };

  fetchUpdatedData() {
    // To get page number from offset
    this.props.setPageNumber.pageNumber = this.state.url.split('?')[1].split('&')[0].split('=')[1] / 20;

    fetch(this.state.url)
      .then(res => res.json())
      .then((resObj) => {
        this.setState({
          pokemons: resObj.results,
          nextUrl: resObj.next,
          previousUrl: resObj.previous
        });
      })
  }

  componentDidMount() {
    this.fetchUpdatedData();
  }

  render() {
    return (
      <React.Fragment>
        {
          (this.state.pokemons) ? (
            <div>
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
              <Navigate pokemonListState={this.state} />
            </div>
          ) : (
              <h1 className='loading-text'>Loading Pokemons...</h1>
            )
        }
      </React.Fragment>
    );
  }
}

export default PokemonList;