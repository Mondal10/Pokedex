import React, { Component } from 'react';

import Utility from '../../Utility';

import { Link } from 'react-router-dom';

const { toCapitalize, splitIdFromURL } = Utility

class RouteList extends Component {
  render() {
    const { name, url } = this.props.identifier;
    return (
      <li>
        <Link className='route-link' to={`pokemoninfo/${splitIdFromURL(url)}`}>
          <span className='pokemon'>{toCapitalize(name)}, {splitIdFromURL(url)}</span>
        </Link>
      </li>
    );
  }
}

export default RouteList;
