import React, { Component } from 'react';

import PokemonCard from './PokemonCard';

import Utility from '../../Utility';

const { toCapitalize } = Utility;

class PokemonEvolution extends Component {
  state = {
    evolutionChainUrl: '',
    pokemonEvolutionData: {},
    evolutionChain: [],
    normalEvolution: [],
    branchedEvolution: [],
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
   * and push species data to array evolutionChain.
   *
   * If branch chaining is encountered the push the created branch array
   * to the evolutionChain.
   * @param {Object} obj 
   * @param {Array} evolutionChain 
   */
  getEvolvesToData(obj, evolutionChain) {
    if (obj.evolves_to.length) {
      const { evolves_to } = obj;

      // If a pokemon of certain evolution level have multiple evolutions
      // eg. Evee can evolve into any of the 8 pokemons
      // eg. Poliwhirl can evolve into either Poliwrath or Politoed
      if (obj.evolves_to.length > 1) {
        const branchedEvolution = obj.evolves_to.map(branchPokemon => branchPokemon.species);

        evolutionChain.push(branchedEvolution);
      } else {
        evolutionChain.push(evolves_to[0].species);
      }

      this.getEvolvesToData(evolves_to[0], evolutionChain);
    } else {
      return;
    };
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
    const normalEvolution = [];
    const branchedEvolution = [];

    // Level 1 pokemon in evolution chain
    evolutionChain.push(pokemonEvolutionData.chain.species);

    // Other levels of evolution chain
    this.getEvolvesToData(pokemonEvolutionData.chain, evolutionChain);

    // Segregating normal evolution and branched evolution
    evolutionChain.forEach(pokemonData => {
      if (!Array.isArray(pokemonData)) {
        normalEvolution.push(pokemonData);
      } else {
        branchedEvolution.push(...pokemonData);
      }
    });

    this.setState({
      evolutionChain,
      normalEvolution,
      branchedEvolution
    });
  }

  render() {

    return (
      <div>
        <hr></hr>
        <h5>Normal Evolution:</h5>
        <hr></hr>
        <div
          className="row mt-5"
          style={{
            justifyContent: 'center'
          }}
        >
          {
            this.state.normalEvolution.map(evolution => {
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
        <div style={{
          display: this.state.branchedEvolution.length ? 'block' : 'none'
        }}>
          <hr></hr>
          <h5>Branched Evolution of {
            (this.state.normalEvolution[this.state.normalEvolution.length - 1])
              ? toCapitalize(this.state.normalEvolution[this.state.normalEvolution.length - 1].name)
              : null
          }:
          </h5>
          <hr></hr>
        </div>
        <div
          className="row mt-5"
          style={{
            justifyContent: 'center'
          }}
        >
          {
            this.state.branchedEvolution.map(evolution => {
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