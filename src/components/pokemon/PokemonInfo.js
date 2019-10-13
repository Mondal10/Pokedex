import React, { Component } from 'react';

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
          return info.ability.name
            .toLowerCase()
            .split('-')
            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
            .join(' ');
        });

        const evs = resObj.stats
          .filter(info => info.effort > 0)
          .map(info => `${info.effort} ${info.stat.name}`
            .toLowerCase()
            .split('-')
            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
            .join(' ')
          )
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
            console.log(info.flavor_text);
            description = info.flavor_text;
          }
          return description;
        });

        const femaleRate = resObj.gender_rate;
        const genderRatioFemale = 12.5 * femaleRate;
        const genderRatioMale = 12.5 * (8 - femaleRate);

        const catchRate = Math.round((100 / 225) * resObj.capture_rate);

        const eggGroups = resObj.egg_groups
          .map(group => group.name
            .toLowerCase()
            .split('-')
            .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
            .join(' ')
          )
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
      <div>
        <h1>{this.state.pokemonName}</h1>
        <img
          alt={this.state.pokemonName}
          src={this.state.pokemonImageUrl}
        />
      </div>
    );
  }
}

export default PokemonInfo;