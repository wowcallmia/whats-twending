import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  recieveSearch (tweets) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_TWEETS',
      payload: {tweets}
    });
  },

  updateFavorites (favorites) {
    AppDispatcher.dispatch({
      type: 'UPDATE_FAVORITES',
      payload: {favorites}
    });
  },

  recieveBusiness (business) {
    AppDispatcher.dispatch({
      type: 'RECIEVE_BUSINESS',
      payload: {business}
    });
  },

  recieveStream (data) {
    AppDispatcher.dispatch({
      type: 'RECIEVE_STREAM',
      payload: {data}
    });
  },
  receiveEntities (data) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ENTITIES',
      payload: {data}
    });
  }
};

export default ServerActions;
