import React, { Component } from 'react';

import PokemonCard from './PokemonCard';

// import styled from 'styled-components';
// import loadSpinner from '../assets/loader-1.gif';
// import Utility from '../../Utility';

// const { getPokemonNumber, splitIdFromURL, toCapitalize } = Utility;

// const PokemonImage = styled.img`
//   display: none;
// `;

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

              /**
               * I can use two components here:
               * 1. Re-using the PokemonCard (routing is enabled) might have some CSS issues.
               * 2. New component (no routing) no css issues.
               */
              // This is 1.
              return (
                <PokemonCard
                  // If possible use the pokemon index as pokemon key later 
                  key={evolution.name}
                  pokemonName={evolution.name}
                  pokemonUrl={evolution.url}
                />
              );

              // This is 2.
              // const pokemonIndex = splitIdFromURL(evolution.url);
              // const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getPokemonNumber(pokemonIndex)}.png`;

              // return (
              //   <div className="col" key={evolution.name}>
              //     <div className="card">
              //       <div className="card-header">
              //         #{getPokemonNumber(pokemonIndex)} {toCapitalize(evolution.name)}
              //       </div>
              //       {this.state.imageLoading ? (
              //         <img
              //           className='card-img-top rounded mx-auto d-block mt-2'
              //           alt='loading spinner'
              //           src={loadSpinner}
              //           style={{
              //             width: '4em',
              //             height: '4em'
              //           }}
              //         />
              //       ) : null}
              //       <PokemonImage
              //         className='card-img-top rounded mx-auto'
              //         onLoad={() => this.setState({ imageLoading: false })}
              //         alt={evolution.name}
              //         src={pokemonImageUrl}
              //         style={
              //           this.state.imageLoading ? null : {
              //             'display': 'block',
              //             'backgroundColor': Utility.convertHex('#ff8c69', 0.5)
              //           }
              //         }
              //       />
              //     </div>
              //   </div>
              // );
            })
          }
        </div>
      </div>
    );
  }
}

export default PokemonEvolution;