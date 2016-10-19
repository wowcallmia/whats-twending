const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, '../data/favorites.json');

exports.get = function (callback) {
  fs.readFile(filename, (err, buffer) => {
    if (err) return callback(err);

    let data;
    try {
      data = JSON.parse(buffer);
    } catch (err) {
      data = [];
    }

    callback(null, data);
  });
};

exports.write = function (callback, newData) {
  let json = JSON.stringify(newData);
  fs.writeFile(filename, json, (err) => {
    if (err) return callback(err);
    callback(null, json);
  });
};

exports.post = function (callback, newFavorite) {
  exports.get((err, favorites) => {
    if (err) return callback(err);
    favorites.push(newFavorite);
    exports.write(callback, favorites);
  });
};

exports.delete = function (callback, id) {
  exports.get((err, favorites) => {
    if (err) return callback(err);

    const editFavorites = favorites.filter((favorite) => favorite.id !== parseInt(id));

    if (editFavorites.length < favorites.length) {
      exports.write(callback, editFavorites);
    } else {
      return callback('DELETE: INVALID FAVORITE ID SPECIFIED');
    }
  });
};
