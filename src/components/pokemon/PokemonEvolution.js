import React, { Component } from 'react';

class PokemonEvolution extends Component {

  render() {
    const { evolutionChainUrl } = this.props;
    console.log(evolutionChainUrl);

    return (
      <div>
        Evolution chain url: {evolutionChainUrl}
      </div>
    );
  }
}

export default PokemonEvolution;