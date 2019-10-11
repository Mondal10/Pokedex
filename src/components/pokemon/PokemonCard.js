import React, { Component } from 'react';

class PokemonCard extends Component {
  state = {
    name: '',
    index: '',
    imageUrl: ''
  };

  render() {
    const name = this.props.name;
    const url = this.props.url;

    return (
      <div className='col-md-auto col-sm-auto mb-auto'>
        <div className='card'>
          <div className='card-header'></div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;