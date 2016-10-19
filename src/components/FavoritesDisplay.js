import React, { Component } from 'react';
import uuid from 'uuid';
import { browserHistory } from 'react-router';

import YelpStore from '../stores/YelpStore';
import YelpActions from '../actions/YelpActions';

export default class FavoritesDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: YelpStore.getFavorites()
    };

    this._onChange = this._onChange.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentWillMount () {
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    YelpStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      favorites: YelpStore.getFavorites()
    });
  }

  deleteFavorite (id) {
    YelpActions.deleteFavorite(id);
  }

  render () {
    const {favorites} = this.state;

    return (
      <div>
        <div className='row'>
          <br />
          {favorites.length ?
            <div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <td>Favorites</td>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map((tweet, index) => (
                    <tr key={uuid()}>
                      <td>
                        <img className='other' src={tweet.user.profile_image_url_https} /><br/>
                        <b>@{tweet.user.screen_name}</b><br />
                        {tweet.user.name}
                      </td>
                      <td className='stats'><br/>
                        <b>Friends: </b>{tweet.user.friends_count}<br />
                        <b>Followers: </b>{tweet.user.followers_count}<br />
                        <b>Tweets: </b>{tweet.user.statuses_count}
                      </td>
                      <td className='tweet-text'>
                        {tweet.text}
                      </td>
                      <td>
                        <br />
                        <button onClick={() => this.deleteFavorite(tweet.id)} className='btn btn-info'>
                          <span className='glyphicon glyphicon-remove'></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          : 'No favorites to display...'}
        </div>
      </div>
    );
  }
}
