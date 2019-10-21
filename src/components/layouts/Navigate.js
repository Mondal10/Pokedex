import React, { Component } from 'react';

class Navigate extends Component {
  render() {
    const { previousUrl, nextUrl, this: context } = this.props.pokemonListState;

    async function previous() {
      await context.setState({
        url: previousUrl
      });
      await context.fetchUpdatedData();
    }

    async function next() {
      await context.setState({
        url: nextUrl
      });
      await context.fetchUpdatedData();
    }

    return (
      <div className='row justify-content-md-center'>
        <div className='col-md-auto'>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={previous}
            disabled={!previousUrl}
          >
            Previous
          </button>
        </div>
        <div className='col-md-auto'>
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={next}
            disabled={!nextUrl}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Navigate;