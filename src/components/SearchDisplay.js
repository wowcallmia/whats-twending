import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import uuid from 'uuid';

import YelpStore from '../stores/YelpStore';
import YelpActions from '../actions/YelpActions';

export default class SearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: YelpStore.getBusinesses(),
      favorites: YelpStore.getFavorites()
    };

    this._onChange = this._onChange.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
  }

  componentWillMount () {
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    YelpStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      results: YelpStore.getBusinesses(),
      favorites: YelpStore.getFavorites()
    });
  }

  addFavorite (business) {
    YelpActions.addFavorite(business);
  }


  render () {
    const {results, favorites} = this.state;
    console.log(results);
    const isFavorite = results.map((tweet) => {
      let found = false;

      favorites.forEach((favorite) => {
        if (favorite.id === tweet.id) {
          found = true;
        }
      });

      return found;
    });

    return (
      <div>
        <div className='row'>
          <hr />
          {results.length ?
            <div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <td>Search Results</td>
                  </tr>
                </thead>
                <tbody>
                  {results.map((tweet, index) => (
                    <tr className={isFavorite[index] ? 'info' : null} key={uuid()}>
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
                        <button onClick={() => this.addFavorite(tweet)} disabled={isFavorite[index]} className='btn btn-info'>
                          <span className='glyphicon glyphicon-heart'></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          : 'Search above for results...'}
        </div>
      </div>
    );
  }
}
