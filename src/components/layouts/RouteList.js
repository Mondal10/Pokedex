import React, { Component } from 'react';

import $ from 'jquery';

import Utility from '../../Utility';

import { Link } from 'react-router-dom';

const { toCapitalize, splitIdFromURL } = Utility

class RouteList extends Component {
  render() {
    const { name, url } = this.props.identifier;
    const isPokemonInfo = this.props.windowURLHash;

    function routeLink() {
      $('#searchModal').modal('hide');

      // Temporary solution try to figure it out later
      if (isPokemonInfo) setTimeout(() => {
        window.location.reload();
      }, 1);
    }

    return (
      <Link
        className='route-link list-group-item list-group-item-action'
        to={(isPokemonInfo) ? `${splitIdFromURL(url)}` : `pokemoninfo/${splitIdFromURL(url)}`}
        onClick={routeLink}
      >
        <span className='pokemon'>{toCapitalize(name)}, {splitIdFromURL(url)}</span>
      </Link>
    );
  }
}

export default RouteList;
