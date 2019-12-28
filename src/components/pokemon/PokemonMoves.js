import React, { Component } from 'react';

class PokemonMoves extends Component {

  render() {
    const { moves } = this.props;

    // moves.forEach(info => {
    //   console.log(info.move.name, info.move.url);
    //   console.log(info.move.url.split('/')[6]);
    // });

    return (
      <div>
        {
          moves.map(info => <div key={info.move.url.split('/')[6]}>{info.move.name} | {info.move.url}</div>)
        }
      </div>
    );
  }
}

export default PokemonMoves;