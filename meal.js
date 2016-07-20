'use strict';

const mysql = require('mysql');

var meal = function (connection) {
  function getQuery(newQuery, table, callback) {
    newQuery = mysql.format(newQuery, table);
    connection.query(newQuery, function (err, result) {
      if (err) {
        return console.log(err.toString());
      }
      callback(result);
    });
  }

  function getMeal(callback) {
    const newQuery = 'SELECT * FROM meals;';
    getQuery(newQuery, [], callback);
  }

  function addMeal(newMeal, callback) {
    const newQuery = 'INSERT INTO meals (name, calories, date) VALUES (?, ?, ?);';
    const table = [newMeal.name, newMeal.calories, newMeal.date];
    getQuery(newQuery, table, callback);
  }

  function delMeal(deleteMeal, callback) {
    const newQuery = 'UPDATE meals SET deleted = "true" WHERE id = (?);';
    const table = [deleteMeal.id];
    getQuery(newQuery, table, callback);
  }

  function filterMeal(filterDate, callback) {
    const newQuery = 'SELECT * FROM meals WHERE meals.date LIKE (?);';
    const table = [filterDate + '%'];
    getQuery(newQuery, table, callback);
  }

  return {
    addMeal: addMeal,
    getMeal: getMeal,
    delMeal: delMeal,
    filterMeal: filterMeal,
  };
};

module.exports = meal;
