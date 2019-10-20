import React, { Component } from 'react';

class Navigate extends Component {
  render () {
    const { previousUrl, nextUrl, this: context } = this.props.pokemonListState;
    console.log(context);
    
    function previous() {
      console.log('Previous', previousUrl);
      context.setState({
        url: previousUrl
      });
      context.fetchUpdatedData();
    }
  
    function next() {
      console.log('Next', nextUrl);
      context.setState({
        url: nextUrl
      });
      context.fetchUpdatedData();
    }

    return (
      <div className='row justify-content-md-center'>
        <div className='col-md-auto'>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={ previous }
          >
            Previous
          </button>
        </div>
        <div className='col-md-auto'>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={ next }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Navigate;