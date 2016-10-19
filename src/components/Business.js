import React, { Component } from 'react';
// import { browserHistory } from 'react-router';
import uuid from 'uuid';

import YelpStore from '../stores/YelpStore';
import YelpActions from '../actions/YelpActions';

export default class Business extends Component {
  constructor(props) {
    super(props);

    YelpActions.getBusiness(this.props.params.id);

    this.state = {
      business: YelpStore.getBusiness()
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
      business: YelpStore.getBusiness()
    });
  }

  render () {
    const {business} = this.state;

    return (
      <div>
        {business ?
          <div className='text-center'>
            <h1>{business.name}</h1>
            <h5>{business.location.city}, {business.location.state_code}</h5>
            <img src={business.rating_img_url} /><br /><br />
            <img src={business.image_url} /><br /><br />
            <h5>{business.display_phone}</h5>
            {business.categories.map((category) => (
              <span key={uuid()}>- {category[0]}<br /></span>
            ))}
            <br /><h5>Address:</h5>
            {business.location.display_address.map((addr) => (
              <span key={uuid()}>{addr}<br /></span>
            ))}
          </div>
        : 'Loading business...'}
      </div>
    );
  }
}
