import React, { Component } from 'react';

import YelpStore from '../stores/YelpStore';

export default class Favorites extends Component {
  constructor () {
    super();

    this.state = {
      favorites: YelpStore.getCards()
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount () {
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    YelpStore.stopListening(this._onChange);
  }


  _onChange () {
    this.setState({
      favorites: YelpStore.getCards()
    });
  }

  render () {
    return (
      <div>
        @FAVORITES
      </div>
    );
  }
}
