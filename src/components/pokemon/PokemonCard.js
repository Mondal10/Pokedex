import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import loadSpinner from '../assets/loader-1.gif';

const SpriteImage = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
`;

class PokemonCard extends Component {
  state = {
    pokemonName: '',
    pokemonIndex: '',
    pokemonUrl: '',
    pokemonImageUrl: '',
    imageLoading: true,
    tooManyRequests: false,
  };

  componentDidMount() {
    const { pokemonName, pokemonUrl } = this.props;
    const pokemonIndex = pokemonUrl.split('/')[pokemonUrl.split('/').length - 2];
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

    this.setState({
      pokemonName,
      pokemonIndex,
      pokemonUrl,
      pokemonImageUrl
    });
  }

  render() {
    return (
      <div className='col-md-3 col-sm-6 mb-5'>
        <Link className='route-link' to={`pokemoninfo/${this.state.pokemonIndex}`}>
          <Card className='card'>
            <h5 className='card-header'>#{this.state.pokemonIndex}</h5>
            {this.state.imageLoading ? (
              <img
                className='card-img-top rounded mx-auto d-block mt-2'
                alt='loading spinner'
                src={loadSpinner}
                style={{
                  width: '5em',
                  height: '5em'
                }}
              />
            ) : null}
            <SpriteImage
              className='card-img-top rounded mx-auto mt-2'
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ tooManyRequests: true })}
              alt={this.state.pokemonName}
              src={this.state.pokemonImageUrl}
              style={
                this.state.tooManyRequests ? { display: 'none' } :
                  this.state.imageLoading ? null : { 'display': 'block' }
              }
            />
            {this.state.tooManyRequests ? (<h6 mx-auto>
              <span className='badge badge-danger mt-2'>Too Many Requests</span>
            </h6>) : null}
            <div className='card-body mx-auto'>
              <h5 className='card-title capitalize'>{this.state.pokemonName}</h5>
            </div>
          </Card>
        </Link>
      </div>
    );
  }
}

export default PokemonCard;