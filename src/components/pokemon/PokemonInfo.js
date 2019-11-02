import React, { Component } from 'react';

import styled from 'styled-components';
import loadSpinner from '../assets/loader-1.gif';
import Utility from '../../Utility';
import { TYPE_COLORS } from '../../Utility';

import PokemonStats from './PokemonStats';
import PokemonProfile from './PokemonProfile';

const PokemonImage = styled.img`
  display: none;
`;

class PokemonInfo extends Component {
  state = {
    pokemonName: '',
    pokemonIndex: '',
    pokemonUrl: '',
    pokemonImageUrl: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
    imageLoading: true
  };

  /**
   * After Fetch function to set Pokemon Data
   * @param {Object} resObj 
   * @param {String} pokemonIndex 
   * @param {String} pokemonUrl 
   */
  setPokemonData(resObj, pokemonIndex, pokemonUrl) {
    // CORS for more information visit https://web.dev/samesite-cookies-explained
    // document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
    this.setState({
      pokemonIndex,
      pokemonUrl,
      pokemonName: resObj.name,
      pokemonImageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${Utility.getPokemonNumber(pokemonIndex)}.png`
    });

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    resObj.stats.forEach(info => {
      switch (info.stat.name) {
        case 'hp':
          hp = info['base_stat'];
          break;
        case 'attack':
          attack = info['base_stat'];
          break;
        case 'defense':
          defense = info['base_stat'];
          break;
        case 'speed':
          speed = info['base_stat'];
          break;
        case 'special-attack':
          specialAttack = info['base_stat'];
          break;
        case 'special-defense':
          specialDefense = info['base_stat'];
          break;
        default:
          console.warn('Something is wrong here');
      }
    });

    // Convert Decimeter to Feet.
    // Rounding to 2 decimal places (* 0.328084 + 0.0001)/100
    const height = Math.round((resObj.height * 0.328084 + 0.0001) * 100) / 100;

    // Convert Hectogram to Kilogram.
    // Rounding to 2 decimal places (* 0.328084 + 0.0001)/100
    const weight = Math.round((resObj.weight * 0.1 + 0.0001) * 100) / 100;

    const types = resObj.types.map(info => info.type.name);

    const abilities = resObj.abilities.map(info => {
      return Utility.toCapitalize(info.ability.name);
    }).join(', ');

    const evs = resObj.stats
      .filter(info => info.effort > 0)
      .map(info => Utility.toCapitalize(`${info.effort} ${info.stat.name}`))
      .join(', ');

    this.setState({
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs
    });
  }

  /**
   * After Fetch function to set Pokemon Species Data
   * @param {Object} resObj 
   */
  setSpeciesData(resObj) {
    let description = '';

    resObj.flavor_text_entries.map(info => {
      if (!description && info.language.name === 'en') {
        description = info.flavor_text;
      }
      return description;
    });

    const femaleRate = resObj.gender_rate;
    const genderRatioFemale = 12.5 * femaleRate;
    const genderRatioMale = 12.5 * (8 - femaleRate);

    const catchRate = Math.round((100 / 225) * resObj.capture_rate);

    const eggGroups = resObj.egg_groups
      .map(group => Utility.toCapitalize(group.name))
      .join(', ');

    const hatchSteps = 255 * (resObj.hatch_counter + 1);

    this.setState({
      description,
      genderRatioFemale,
      genderRatioMale,
      catchRate,
      eggGroups,
      hatchSteps
    });
  }

  componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // Pokemon information URL
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    fetch(pokemonUrl)
      .then(res => res.json())
      .then((resObj) => { this.setPokemonData(resObj, pokemonIndex, pokemonUrl) })

    // Get Pokemon Description, Catch Rate, Egg Groups, Gender Ratio, Hatch Steps, etc
    fetch(pokemonSpeciesUrl)
      .then(res => res.json())
      .then((resObj) => { this.setSpeciesData(resObj) })
  }

  render() {
    return (
      <div className='col'>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5>#{Utility.getPokemonNumber(this.state.pokemonIndex)}</h5>
              </div>
              {/* 12 - 7 = 7  'col' value*/}
              <div className='col-7'>
                <div className='float-right'>
                  Type: {this.state.types.map(type => (
                    <span
                      key={type}
                      className='badge badge-pill mr-1'
                      style={{
                        backgroundColor: TYPE_COLORS[type],
                        color: '#ffffff'
                      }}
                    >
                      {Utility.toCapitalize(type)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
              <div className='col-md-5'>
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
                <PokemonImage
                  className='card-img-top rounded mx-auto mt-2'
                  onLoad={() => this.setState({ imageLoading: false })}
                  alt={this.state.pokemonName}
                  src={this.state.pokemonImageUrl}
                  style={
                    this.state.imageLoading ? null : {
                      'display': 'block',
                      'backgroundColor': Utility.convertHex(TYPE_COLORS[this.state.types[0]], 0.5)
                    }
                  }
                />
              </div>
              <div className='col-md-7'>
                <h3 className='mx-auto'>
                  {Utility.toCapitalize(this.state.pokemonName)}
                </h3>
                <PokemonStats statistics={this.state.stats} />
              </div>
              <div className='row mt-1'>
                <div className='col'>
                  <p className='p-2'>{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <PokemonProfile profile={this.state} />
          <div className="card-footer text-muted">
            Data From{' '}
            <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="card-link">
              PokeAPI.co
            </a>
          </div>
        </div >
      </div >
    );
  }
}

export default PokemonInfo;