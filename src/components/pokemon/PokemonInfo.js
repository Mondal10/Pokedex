import React, { Component } from 'react';

class PokemonInfo extends Component {
  state = {
    pokemonName: '',
    pokemonIndex: '',
    pokemonUrl: '',
    pokemonImageUrl: '',
  };

  /**
   * For converting #1 to #001 and #10 to #010
   * 
   * @param {Number} index 
   * @returns {String} modifiedIndex 
   */
  getPokemonNumber(index) {
    const length = index.toString().length;

    if (length === 1) {
      return `00${index}`;
    } else if (length === 2) {
      return `0${index}`;
    } else {
      return index;
    }
  }

  componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // Pokemon information URL
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    fetch(pokemonUrl)
      .then(res => res.json())
      .then((resObj) => {
        this.setState({
          pokemonName: resObj.name,
          pokemonImageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getPokemonNumber(pokemonIndex)}.png`
        });
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.pokemonName}</h1>
        <img
          alt={this.state.pokemonName}
          src={this.state.pokemonImageUrl}
        />
      </div>
    );
  }
}

export default PokemonInfo;