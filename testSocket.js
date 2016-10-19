const axios = require('axios');
const io = require('socket.io-client');

var socket = io.connect('http://localhost:8000');
socket.on('stream', function(data) {
  console.log(data);
});

axios.get('http://localhost:8000/search/live');
