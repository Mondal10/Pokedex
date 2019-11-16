import React, { Component } from 'react';

import RouteList from './RouteList';

import Utility from '../../Utility';

let searchInput;
const { splitIdFromURL } = Utility;

class Search extends Component {
  state = {
    listURL: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=807',
    pokemons: null,
    searchMatches: null,
    hash: null,
  };

  fetchPokemonList() {
    this.setState({
      hash: window.location.hash.includes('pokemoninfo')
    });
    if (localStorage.getItem('pokemons')) {
      this.setState({
        pokemons: JSON.parse(localStorage.getItem('pokemons'))
      });
    } else {
      fetch(this.state.listURL)
        .then(blob => blob.json())
        .then(data => this.setState({
          pokemons: [...data.results]
        }))
        .then(() => {
          localStorage.setItem('pokemons', JSON.stringify(this.state.pokemons))
        })
    }
  }

  findMatches(word, pokemons) {
    return pokemons.filter(pokemon => {
      const regex = new RegExp(word, 'gi');

      return pokemon.name.match(regex) || splitIdFromURL(pokemon.url).match(regex)
    });
  }

  displayMatches() {
    const matchArray = this.findMatches(searchInput.value, this.state.pokemons);

    this.setState({
      searchMatches: matchArray
    });
  }

  componentDidMount() {
    searchInput = document.getElementById('search');
  }

  render() {
    return (
      <div
        className='navbar-nav ml-auto'
      >
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#searchModal"
          onClick={this.fetchPokemonList.bind(this)}
        >
          Search
        </button>

        {/* Modal */}
        <div className="modal fade" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="searchModalLabel">Search Pokemon</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <small><i>Search Pokemons either by Id or by Name</i></small>
              </div>
              <input
                type="text"
                className="form-control"
                id="search"
                autoComplete="off"
                placeholder="Pokemon Name or ID"
                onKeyUp={this.displayMatches.bind(this)}
              />
              <div
                className="list-group mb-4"
                id="search-result"
              >
                <React.Fragment>
                  {
                    (this.state.searchMatches) ? (
                      this.state.searchMatches.map(pokemon => <RouteList key={pokemon.name} identifier={pokemon} windowURLHash={this.state.hash} />)
                    ) : (<h6 className='loading-text'>Searching Pokemons...</h6>)
                  }
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
