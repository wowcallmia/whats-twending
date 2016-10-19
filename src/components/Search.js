import React, { Component } from 'react';

import SearchDisplay from './SearchDisplay';
import YelpActions from '../actions/YelpActions';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search () {
    let {term} = this.refs;

    YelpActions.search(term.value, null);

    term.value = '';
    location.value = '';
  }

  render () {
    return (
      <div>
        <div className='row'>
          <br />
          <div className='col-md-12'>
            <div className='input-group'>
              <span className='input-group-addon' id='basic-addon1'>Search Recent Tweets</span>
              <input type='text' ref='term' className='form-control' placeholder='tweets...' />
              <span className='input-group-btn'>
                <button className='btn btn-info' onClick={this.search} type='button'>
                  <span className='glyphicon glyphicon-search'></span>
                </button>
              </span>
            </div>
          </div>
        </div>
        <SearchDisplay />
      </div>
    );
  }
}
