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
      <div className='row d-flex justify-content-center'>
        <div className='col-md-6 text-center'>
          <button
            type="button"
            className="btn btn-success btn-lg mr-2"
            onClick={previous}
            disabled={!previousUrl}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-success btn-lg mr-2"
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