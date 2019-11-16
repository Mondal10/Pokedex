import React, { Component } from 'react';

import $ from 'jquery';

import Utility from '../../Utility';

import { Link } from 'react-router-dom';

const { toCapitalize, splitIdFromURL } = Utility

class RouteList extends Component {
  render() {
    const { name, url } = this.props.identifier;
    return (
      <Link
        className='route-link list-group-item list-group-item-action'
        to={`pokemoninfo/${splitIdFromURL(url)}`}
        onClick={() => $('#searchModal').modal('hide')}
      >
        <span className='pokemon'>{toCapitalize(name)}, {splitIdFromURL(url)}</span>
      </Link>
    );
  }
}

export default RouteList;
