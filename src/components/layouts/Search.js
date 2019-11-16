import React, { Component } from 'react';

let searchInput, searchResults;
class Search extends Component {
  state = {
    listURL: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=807',
    pokemons: null,
  };

  fetchPokemonList() {
    console.log('fetchPokemonList');
    console.log(this);
    fetch(this.state.listURL)
      .then(blob => blob.json())
      .then(data => this.setState({
        pokemons: [...data.results]
      }))
  }

  findMatches(word, pokemons) {
    return pokemons.filter(pokemon => {
      const regex = new RegExp(word, 'gi');

      return pokemon.name.match(regex) || pokemon.url.split('/').slice(-2, -1)[0].match(regex)
    });
  }

  displayMatches() {
    const matchArray = this.findMatches(searchInput.value, this.state.pokemons);
    const list = matchArray.map(pokemon => {
      return `
        <li>
          <span class="pokemon">${pokemon.name}, ${pokemon.url}</span>
        </li>
      `;
    }).join('');

    searchResults.innerHTML = list;
  }

  componentDidMount() {
    searchInput = document.getElementById('search');
    searchResults = document.getElementById('search-result');
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
              <ul id="search-result"></ul>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
