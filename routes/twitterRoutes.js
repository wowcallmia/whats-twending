const express = require('express');
const router = express.Router();

const search = require('../models/search');

router.get('/', (req, res) => {
  search.getSearch(res.hasError, req.query);
});

router.get('/live', (req, res) => {
  search.getLocationStream(res.hasError, req.query, res);
});

router.get('/geocode', (req, res) => {
  search.getLocationStream(res.hasError, req.query);
});

router.get('/watson', (req, res) => {
  search.getLocationStream(res.hasError);
})

module.exports = router;
