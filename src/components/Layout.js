import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Layout extends Component {
  render () {
    return (
      <div className='container'>
        <div id='page-title'>What's Twending?&nbsp;&nbsp;<img className='birdie' src='http://i.imgur.com/n75rtGn.png'/></div>
        <div className='row'>
          <ul className='nav nav-tabs'>
            <li role='presentation'>
              <Link to='/' className={this.props.location.pathname === '/' ? 'btn btn-info' : null}>Search</Link>
            </li>
            <li role='presentation'>
              <Link to='/favorites' activeClassName='btn btn-info'>Favorites</Link>
            </li>
            <li role='presentation'>
              <Link to='/streamer' activeClassName='btn btn-info'>Live Streaming</Link>
            </li>
          </ul>
        </div>
        <div id='main'>{this.props.children}</div>
      </div>
    );
  }
}
