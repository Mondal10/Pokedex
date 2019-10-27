import React, { Component } from 'react';

class PokemonStats extends Component {

  /**
 * Decamelizes a string
 * 
 * @param {String} str 
 * @returns {String} String in camelCase
 */
  deCamelize(str) {
    if (str === 'hp') return 'HP';
    return str
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) { return str.toUpperCase(); })
  }

  /**
   * Convert value to percentage W.R.T 200
   * 
   * @param {Number} value
   * 
   * @returns {Number} converted percentage
   */
  convertToPercentage(value) {
    return Math.floor((value / 200) * 100);
  }

  render() {
    const { statistics } = this.props;

    return (
      <div className='stats-container'>
        {
          Object.keys(statistics).map((stat, i) => {
            return (
              <div className='row align-item-center' key={stat}>
                <div className='col-12 col-md-5'>{this.deCamelize(stat, ' ')}</div>
                <div className='col-12 col-md-7'>
                  <div className='progress'>
                    <div
                      className='progress-bar progress-bar-striped progress-bar-animated'
                      role='progressbar'
                      style={{
                        width: `${this.convertToPercentage(statistics[stat])}%`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    >
                      <small>{this.convertToPercentage(statistics[stat])} %</small>
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