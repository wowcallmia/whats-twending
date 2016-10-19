import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './components/Layout';
import Search from './components/Search';
import FavoritesDisplay from './components/FavoritesDisplay';
import Streamer from './components/Streamer';

import './stores/YelpStore';

render(
  <div>
    <div id='background'></div>
    <div id='content'>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Search} />
          <Route path='/favorites' component={FavoritesDisplay} />
          <Route path='/streamer' component={Streamer} />
        </Route>
      </Router>
    </div>
  </div>,
  document.getElementById('root')
);
