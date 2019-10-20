import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div>
        <footer 
          className="page-footer font-small"
          style={{
            backgroundColor: '#ef5350',
            color: '#ffffff',
          }}
        >
          <div className="footer-copyright text-center py-3">
            <a className="normal-link" target="_blank" rel="noopener noreferrer" href="https://github.com/Mondal10/Pokedex">Github</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;