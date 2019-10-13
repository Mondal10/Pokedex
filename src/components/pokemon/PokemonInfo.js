import React, { Component } from 'react';

const TYPE_COLORS = {
  bug: '#B1C12E',
  dark: '#4F3A2D',
  dragon: '#755EDF',
  electric: '#FCBC17',
  fairy: '#F4B1F4',
  fighting: '#823551D',
  fire: '#E73B0C',
  flying: '#A3B3F7',
  ghost: '#6060B2',
  grass: '#74C236',
  ground: '#D3B357',
  ice: '#A3E7FD',
  normal: '#C8C4BC',
  poison: '#934594',
  psychic: '#ED4882',
  rock: '#B9A156',
  steel: '#B5B5C3',
  water: '#3295F6'
};

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
    hatchSteps: ''
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

  // To convert '-' and '_' separated words into camelCase
  toCamelCase(string) {
    return string.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('-', '')
        .replace('_', '');
    });
  };

  // To convert '-', '_' and ' ' separated words into camelCase
  toCapitalize(string) {
    return string
      .toLowerCase()
      .split(/-| |_/)
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }

  componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    // Pokemon information URL
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    fetch(pokemonUrl)
      .then(res => res.json())
      .then((resObj) => {
        console.log(resObj);
        // CORS for more information visit https://web.dev/samesite-cookies-explained
        // document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
        this.setState({
          pokemonIndex,
          pokemonUrl,
          pokemonName: resObj.name,
          pokemonImageUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${this.getPokemonNumber(pokemonIndex)}.png`
        });

        // Can be optimized
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
          return this.toCapitalize(info.ability.name);
        });

        const evs = resObj.stats
          .filter(info => info.effort > 0)
          .map(info => this.toCapitalize(`${info.effort} ${info.stat.name}`))
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
      })

    // Get Pokemon Description,, Catch Rate, Egg Groups, Gender Ratio, Hatch Steps
    fetch(pokemonSpeciesUrl)
      .then(res => res.json())
      .then((resObj) => {
        console.log(resObj);

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
          .map(group => this.toCapitalize(group.name))
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
      })
  }

  render() {
    return (
      <div className='col'>
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5>#{this.getPokemonNumber(this.state.pokemonIndex)}</h5>
              </div>
              {/* 12 - 7 = 7  'col' value*/}
              <div className='col-7'>
                <div className='float-right'>
                  {this.state.types.map(type => (
                    <span
                      key={type}
                      className='badge badge-pill mr-1'
                      style={{
                        backgroundColor: TYPE_COLORS[type],
                        color: '#ffffff'
                      }}
                    >
                      {this.toCapitalize(type)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
              <div className='col-md-5'>
                <img
                  alt={this.state.pokemonName}
                  src={this.state.pokemonImageUrl}
                  className='card-img-top rounded mx-auto mt-2'
                />
              </div>
              <div className='col-md-7'>
                <h3 className='mx-auto'>
                  {this.toCapitalize(this.state.pokemonName)}
                </h3>
                <div className='row align-item-center'>
                  <div className='col-12 col-md-3'>HP</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar progress-bar-striped progress-bar-animated'
                        role='progressbar'
                        style={{
                          width: `${this.state.stats.hp}%`
                        }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        {this.state.stats.hp}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonInfo;