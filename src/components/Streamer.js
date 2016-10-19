import React, { Component } from 'react';
import ReactSlider from 'react-slider';
import uuid from 'uuid';

import YelpStore from '../stores/YelpStore';
import YelpActions from '../actions/YelpActions';

export default class SearchDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: YelpStore.getStream(),
      entities: YelpStore.getEntities(),
      location: 20,
      count: 50
    };
    this.search = this.search.bind(this);
    this._onChange = this._onChange.bind(this);
    this.location = this.location.bind(this);
    this.count = this.count.bind(this);
  }

  componentWillMount () {
    YelpStore.startListening(this._onChange);
  }

  componentWillUnmount () {
    YelpStore.stopListening(this._onChange);
  }

  _onChange () {
    this.setState({
      entities: YelpStore.getEntities(),
      stream: YelpStore.getStream()
    });
  }
  search(){
    let {term, count, radius} = this.refs;
    YelpActions.startStream(term.value, count.getValue(), radius.getValue()/70);
    term.value = '';
  }

  location (value) {
    this.setState({
      location: value
    });
  }

  count (value) {
    this.setState({
      count: value
    });
  }

  render () {
    const {stream, entities, location, count} = this.state;
    console.log(entities);

    return (
      <div id='stream-container'>
        <br />
        <div className="row">
          <div className='col-md-12'>
            <div className='input-group'>
              <span className='input-group-addon' id='basic-addon1'>Location</span>
              <input type='text' ref='term' className='form-control' placeholder='Enter zip or city...' />
              <span className='input-group-btn'>
                <button className='btn btn-info' onClick={this.search} type='button'>
                  <span className='glyphicon glyphicon-search'></span>
                </button>
              </span>
            </div>
          </div>
          <br /><br /><br />
          <div className="row">
            <div className='col-md-6'>
              <span className='slider-label'>Location Radius: {location} miles</span>
              <ReactSlider onChange={this.location} id='radius' ref='radius' defaultValue={[20]} min={10} max={250} withBars>
                <div className='btn btn-primary'>
                  <span className="glyphicon glyphicon-globe"></span>
                </div>
              </ReactSlider>
            </div>
            <div className="col-md-6">
              <span className='slider-label'>Analysis Refresh Rate: {count} tweets</span>
              <ReactSlider onChange={this.count} id='count' ref='count' defaultValue={[50]} min={10} max={500} withBars>
                <div className='btn btn-primary'>
                  <span className="glyphicon glyphicon-resize-horizontal"></span>
                </div>
              </ReactSlider>
            </div>
          </div>
        </div>
        <br /><br /><hr />
        <div id='left'>
          {
            stream.map((tweet) => {
              return (
                <a key={uuid()} className='stream-body' href={`http://twitter.com/${tweet.user.screen_name}`} target='_blank'>
                  <div key={uuid()} className='panel panel-info'>
                    <div key={uuid()} className='panel-heading'>
                      <img id ="streamImage" src={tweet.user.profile_image_url_https} /><b className='stream-name'>{tweet.user.screen_name}</b>
                    </div>
                    <div key={uuid()} className='panel-body stream-tweet'>
                      <span>{tweet.text}</span>
                    </div>
                  </div>
                </a>
              );
            })
          }
        </div>
        <div id='right'>
          {
            entities.map((entity) =>
              <div  key={uuid()} className='panel panel-info'>
                <div  key={uuid()} className='panel-heading'>
                  {entity.timestamp}
                </div>
                <div  key={uuid()} className='panel-body'>
                  {entity.relevant.map((element, index) =>
                    <a key={uuid()} href={`http://lmgtfy.com/?q=${encodeURIComponent(element.text)}`}
                      target='_blank'
                      className='btn btn-info'>
                      {element.text}
                    </a>
                  )}
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
