import React, { Component } from 'react';

import Utility from '../../Utility';

class PokemonStats extends Component {

  render() {
    const { statistics } = this.props;

    return (
      <div className='stats-container'>
        {
          Object.keys(statistics).map((stat, i) => {
            return (
              <div className='row align-item-center' key={stat}>
                <div className='col-12 col-md-5'>{Utility.deCamelize(stat, ' ')}</div>
                <div className='col-12 col-md-7'>
                  <div className='progress'>
                    <div
                      className='progress-bar progress-bar-striped progress-bar-animated'
                      role='progressbar'
                      style={{
                        width: `${Utility.convertToPercentage(statistics[stat])}%`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='100'
                    >
                      <small>{Utility.convertToPercentage(statistics[stat])} %</small>
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