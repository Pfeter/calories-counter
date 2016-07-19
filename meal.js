'use strict';

const mysql = require('mysql');

var meal = function (connection) {
  function getQuery(newQuery, callback) {
    connection.query(newQuery, function (err, result) {
      if (err) {
        return console.log(err.toString());
      }
      callback(result);
    });
  }

  function getMeal(callback) {
    getQuery('SELECT * FROM meals;', callback);
  }

  function addMeal(newMeal, callback) {
    let newQuery = 'INSERT INTO meals (name, calories, date) VALUES (?, ?, ?)';
    const table = [newMeal.name, newMeal.calories, newMeal.date];
    newQuery = mysql.format(newQuery, table);
    getQuery(newQuery, callback);
  }

  function delMeal(deleteMeal, callback) {
    let result = {};
    const newQuery = 'UPDATE meals SET deleted = "true" WHERE id = '.concat('"', deleteMeal.id, '"');
    connection.query(newQuery, function (err) {
      if (err) {
        result = { status: 'not exists' };
      } else {
        result = { status: 'ok' };
      }
      callback(result);
    });
  }

  function filterMeal(filterDate, callback) {
    const newQuery = 'SELECT * FROM meals WHERE meals.date LIKE '.concat('"', filterDate, '%', '"');
    getQuery(newQuery, callback);
  }

  return {
    addMeal: addMeal,
    getMeal: getMeal,
    delMeal: delMeal,
    filterMeal: filterMeal,
  };
};

module.exports = meal;
