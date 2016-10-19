const express = require('express');
const favoriteRoutes = express.Router();

const favorites = require('../models/favorites');

favoriteRoutes.post('/', (req, res) => {
  favorites.post(res.hasError, req.body);
});

favoriteRoutes.delete('/', (req, res) => {
  favorites.delete(res.hasError, req.query.id);
});

favoriteRoutes.get('/', (req, res) => {
  favorites.get(res.hasError);
});

module.exports = favoriteRoutes;
