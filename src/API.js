import ServerActions from './actions/ServerActions';
import axios from 'axios';
const io = require('socket.io-client');

const API = {
  initializeFavorites () {
    axios.get('http://localhost:8000/managefavorites')
      .then((res) => {
        console.log('API INITIALIZE:', res.data);
        ServerActions.updateFavorites(res.data);
      })
      .catch((err) => {
        console.error('INITIALIZE FAVORITES:', err);
      });
  },

  search (term) {
    axios.get(`http://localhost:8000/search?term=${encodeURI(term)}`)
      .then((res) => {
        console.log('API SEARCH:', res.data);
        ServerActions.recieveSearch(res.data);
      })
      .catch((err) => {
        console.error('SEARCH:', err);
      });
  },

  postFavorite (business) {
    axios.post('http://localhost:8000/managefavorites', business)
      .then((res) => {
        console.log('API POST:', res.data);
        ServerActions.updateFavorites(res.data);
      })
      .catch((err) => {
        console.error('POST FAVORITE:', err);
      });
  },

  deleteFavorite (id) {
    axios.delete(`http://localhost:8000/managefavorites?id=${encodeURI(id)}`)
      .then((res) => {
        console.log('API DELETE:', res.data);
        ServerActions.updateFavorites(res.data);
      })
      .catch((err) => {
        console.error('DELETE FAVORITE:', err);
      });
  },

  getBusiness (id) {
    axios.get(`http://localhost:8000/business?id=${id}`)
      .then((res) => {
        console.log('API BUSINESS:', res.data);
        ServerActions.recieveBusiness(res.data);
      })
      .catch((err) => {
        console.error('GET BUSINESS:', err);
      });
  },

  startStream (term, count, radius) {
    var socket = io.connect('http://localhost:8000');
    socket.on('stream', function(data) {
      // console.log(data);
      ServerActions.recieveStream(data);
    });
    socket.on('watson', function(data) {
       console.log(data);
       ServerActions.receiveEntities(data);
    });

    axios.get(`http://localhost:8000/search/live?term=${encodeURI(term)}&count=${count}&radius=${radius}`);
  }
};

export default API;
