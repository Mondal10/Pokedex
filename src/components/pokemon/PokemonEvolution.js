import React, { Component } from 'react';

import PokemonCard from './PokemonCard';

class PokemonEvolution extends Component {
  state = {
    evolutionChainUrl: '',
    pokemonEvolutionData: {},
    evolutionChain: [],
    imageLoading: true
  }

  componentDidMount() {
    const { evolutionChainUrl } = this.props;

    this.setState({
      evolutionChainUrl
    }, this.fetchData(evolutionChainUrl)); // Since setState is asynchronous, setting callback to fetch
  }

  fetchData(url) {
    fetch(url).then(res => res.json()).then(resObj => {
      this.setState({ pokemonEvolutionData: { ...resObj } }, this.extractPokemonData);
    })
  }

  /**
   * Recursively call the function to check `evolves_to` in the nested obj
   * and push species data to array evolutionChain
   * @param {Object} obj 
   * @param {Array} evolutionChain 
   */
  getEvolvesTo(obj, evolutionChain) {
    if (obj.evolves_to.length) {
      const { evolves_to } = obj;

      evolutionChain.push(evolves_to[0].species);
      this.getEvolvesTo(evolves_to[0], evolutionChain);
    } else return;
  }

  /**
   * Get pokemon species data
   * 1. chain->species->name,url
   * 2. chain->evolves_to[0]->species->name,url
   * 3. chain->evolves_to[0]->evolves_to[0]->species->name,url
   * 4. Go more deep and check for evolves_to.length or else return
   */
  extractPokemonData() {
    const { pokemonEvolutionData } = this.state;
    const evolutionChain = [];

    // Level 1 pokemon in evolution chain
    evolutionChain.push(pokemonEvolutionData.chain.species);

    // Other levels of evolution chain
    this.getEvolvesTo(pokemonEvolutionData.chain, evolutionChain);

    this.setState({
      evolutionChain
    });
  }

  render() {

    return (
      <div>
        <div
          className="row mt-5"
          style={{
            justifyContent: 'center'
          }}
        >
          {
            this.state.evolutionChain.map(evolution => {
              return (
                <PokemonCard
                  key={evolution.name}
                  pokemonName={evolution.name}
                  pokemonUrl={evolution.url}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default PokemonEvolution;