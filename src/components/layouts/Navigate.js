import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigate extends Component {
  render() {
    const { previousUrl, nextUrl, this: context } = this.props.pokemonListState;
    const { pageNumber } = context.props.setPageNumber;

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
          <Link className='route-link' to={`/page=${pageNumber - 1}`}>
            <button
              type="button"
              className="btn btn-success btn-lg mr-2"
              onClick={previous}
              disabled={!previousUrl}
            >
              Previous
          </button>
          </Link>
          <Link className='route-link' to={`/page=${pageNumber + 1}`}>
            <button
              type="button"
              className="btn btn-success btn-lg mr-2"
              onClick={next}
              disabled={!nextUrl}
            >
              Next
          </button>
          </Link>
        </div>
      </div >
    );
  }
}

export default Navigate;