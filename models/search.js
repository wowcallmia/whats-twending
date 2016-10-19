var NodeGeocoder = require('node-geocoder');
var watson = require('watson-developer-cloud');
const Twitter = require('twitter');
require('dotenv').config();

let endStreaming = null;
let currentQuery = null;
let counter = 0;
let words = '';

var alchemy_language = watson.alchemy_language({
  api_key: process.env.WATSON
});

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.getSearch = function (callback, query) {
  client.get(`https://api.twitter.com/1.1/search/tweets.json?q=${query.term}&count=100`, (err, tweets, res) => {
    if (err) return callback(err);
    callback(null, tweets.statuses);
  });
};

exports.getStream = function(callback, query, res) {
  client.stream('statuses/filter', {track: 'beach'}, function(stream) {

    endStreaming = () => stream.destroy('data');

    stream.on('data', event => {
      console.log('RECEVEING TWEETS');
      res.socketEmitter('stream', event);
    });

    stream.on('error', (error) => {
      console.log('ERROR TWEETS: ', error);
      stream.destroy('data');
    });
  });
  callback(null, 'TWITTER STREAM ENABLED');
};

exports.getLocationStream = function (callback, query, response) {
  if(endStreaming){
    endStreaming();
  }

  currentQuery = query;

  var options = {
    provider: 'google',
    httpAdapter: 'https',
    formatter: null
  };

  var geocoder = NodeGeocoder(options);
// `${res[0].longitude-1},${res[0].latitude-1},${res[0].longitude+1},${res[0].latitude+1}`

  geocoder.geocode(query.term)
    .then(function (res) {
      //  console.log('res', res);
      //  console.log('locString', `${res[0].longitude-1},${res[0].latitude-1},${res[0].longitude+1},${res[0].latitude+1}`);
      // console.log('query', query.term);
      console.log(currentQuery);
      const r = parseFloat(currentQuery.radius);
      console.log('RADIUS:', r);
      const boundingBox = `${res[0].longitude-r},${res[0].latitude-r},${res[0].longitude+r},${res[0].latitude+r}`;
      console.log(boundingBox);

      client.stream('statuses/filter', {locations: boundingBox}, function (stream) {
        endStreaming = () => stream.destroy('data');

        stream.on('data', (event) => {
          if (counter > parseInt(currentQuery.count)) {
            var parameters = {
              text: words.replace(/RT/, '')
            };

            alchemy_language.entities(parameters, function (err, analysis) {
              if (err) {
                console.log('error:', err);
                response.socketEmitter('watson', []);
              } else {
                console.log(JSON.stringify(analysis, null, 2));

                response.socketEmitter('watson', analysis.entities);
              }
            });

            counter = 0;
            words = '';
          }
          counter++;
          console.log('counter', counter);
          words += event.text;
          response.socketEmitter('stream', event);
        });

        stream.on('error', (error) => {
          console.log('ERROR TWEETS: ', error);
          stream.destroy('data');
        });
      });
      callback(null, 'LISTENING TO SOCKET');
    })
    .catch(function (err) {
      callback(err);
    });
};
