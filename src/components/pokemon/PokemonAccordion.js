import React, { Component } from 'react';

import PokemonMoves from "./PokemonMoves";
import PokemonEvolution from "./PokemonEvolution";

class PokemonAccordion extends Component {

  render() {
    const { moves, evolutionChainUrl } = this.props;

    return (
      <div>
        <div className="accordion" id="information-accordion">
          {/* Card1 Moves*/}
          <div className="card">
            <button className="btn btn-outline-dark btn-block collapsed" type="button" data-toggle="collapse" data-target="#pokemon-moves" aria-expanded="false" aria-controls="pokemon-moves">
              Moves
            </button>
            <div id="pokemon-moves" className="collapse" aria-labelledby="Pokemon Moves" data-parent="#information-accordion">
              <div className="card-body">
                <PokemonMoves moves={moves} />
              </div>
            </div>
          </div>

          {/* Card2 Evolution*/}
          <div className="card">
            <button className="btn btn-outline-dark btn-block collapsed" type="button" data-toggle="collapse" data-target="#pokemon-evolution" aria-expanded="false" aria-controls="pokemon-evolution">
              Evolution Chain
            </button>
            <div id="pokemon-evolution" className="collapse" aria-labelledby="Pokemon Evolution" data-parent="#information-accordion">
              <div className="card-body">
                <PokemonEvolution evolutionChainUrl={evolutionChainUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonAccordion;