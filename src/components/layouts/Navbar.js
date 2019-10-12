import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav
          className='navbar navbar-expand-md navbar-dark fixed-top'
          style={{
            backgroundColor: '#ef5350',
            color: '#ffffff',
          }}
        >
          <a className='navbar-brand' href='https://github.com/mondal10'>
            <img
              alt='Pokedex logo'
              src={process.env.PUBLIC_URL + '/assets/logo-48.png'}
              style={{
                height: '40px',
                width: '40px'
              }}
            />
            Pokedex
          </a>
        </nav>
      </div >
    );
  }
}

export default Navbar;
