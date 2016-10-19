import {EventEmitter} from 'events';
import moment from 'moment';
import AppDispatcher from '../AppDispatcher';

import YelpActions from '../actions/YelpActions';
YelpActions.initializeFavorites();

let _tweets = [];
let _favorites = [];
let _business = null;
let _stream = [];
let _entities = [];

class YelpStore extends EventEmitter {
  constructor () {
    super();

    AppDispatcher.register((action) => {
      switch (action.type) {
        case 'RECEIVE_TWEETS':
          _tweets = action.payload.tweets;
          this.emit('CHANGE');
          break;
        case 'UPDATE_FAVORITES':
          _favorites = action.payload.favorites;
          this.emit('CHANGE');
          break;
        case 'RECIEVE_BUSINESS':
          _business = action.payload.business;
          this.emit('CHANGE');
          break;
        case 'RECIEVE_STREAM':
          if (_stream.length > 100) {
            _stream.pop();
          }
          _stream.unshift(action.payload.data);
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ENTITIES':
          const relevant = action.payload.data.filter((entity) =>
            entity.count > 1 || parseFloat(entity.relevance) >= 0.5
          );

          if (relevant.length > 0) {
            _entities.unshift({
              relevant,
              timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
            });
          }
          this.emit('CHANGE');
          break;
        default:
          console.log('INVALID_ACTION_TYPE');
          break;
      }
    });
  }

  startListening (callback) {
    this.on('CHANGE', callback);
  }

  stopListening (callback) {
    this.removeListener('CHANGE', callback);
  }

  getBusinesses () {
    return _tweets;
  }

  getBusiness () {
    return _business;
  }

  getFavorites () {
    return _favorites;
  }

  getStream () {
    return _stream;
  }
  getEntities () {
    return _entities;
  }
}

export default new YelpStore();
