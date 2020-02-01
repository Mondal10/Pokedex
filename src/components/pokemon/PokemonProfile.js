import React, { Component } from 'react';

class PokemonProfile extends Component {

  render() {
    const { profile } = this.props;

    return (
      <div className='profile-container'>
        <div className='card-body'>
          <h5 className="card-title text-center">Profile</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
                  <h6 className="float-right">Height:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.height} ft.</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-right">Weight:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.weight} kg.</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-right">Catch Rate:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.catchRate}%</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-right">Gender Ratio:</h6>
                </div>
                <div className="col-6">
                  {
                    (profile.isGenderless) ? (
                      <h6 className="float-left">Genderless</h6>
                    ) : (
                        <div className="progress" style={{ display: profile.isGenderless ? 'none' : null }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${profile.genderRatioFemale}%`,
                              backgroundColor: '#c2185b'
                            }}
                            aria-valuenow={profile.genderRatioFemale}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{profile.genderRatioFemale} %</small>
                          </div>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${profile.genderRatioMale}%`,
                              backgroundColor: '#1976d2'
                            }}
                            aria-valuenow={profile.genderRatioMale}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{profile.genderRatioMale} %</small>
                          </div>
                        </div>
                      )
                  }
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-6">
                  <h6 className="float-right">Egg Groups:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.eggGroups} </h6>
                </div>
                <div className="col-6">
                  <h6 className="float-right">Hatch Steps:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.hatchSteps}</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-right">Abilities:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.abilities}</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-right">EVs:</h6>
                </div>
                <div className="col-6">
                  <h6 className="float-left">{profile.evs}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonProfile;