import React, { Component } from 'react';

class PokemonStats extends Component {

  /**
 * Decamelizes a string
 * 
 * @param str String in camelCase
 */
  decamelize(str) {
    if (str === 'hp') return 'HP';
    return str
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) { return str.toUpperCase(); })
  }

  render() {
    const { statistics } = this.props;

    return (
      <div className='stats-container'>
        {
          Object.keys(statistics).map((stat, i) => {
            return (
              <div className='row align-item-center' key={stat}>
                <div className='col-12 col-md-5'>{this.decamelize(stat, ' ')}</div>
                <div className='col-12 col-md-7'>
                  <div className='progress'>
                    <div
                      className='progress-bar progress-bar-striped progress-bar-animated'
                      role='progressbar'
                      style={{
                        width: `${statistics[stat]}%`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    >
                      {statistics[stat]}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default PokemonStats;