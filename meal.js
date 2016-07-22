'use strict';

const mysql = require('mysql');

const meal = function (connection) {
  function getQuery(newQuery, table, callback) {
    const fullQuery = mysql.format(newQuery, table);
    connection.query(fullQuery, function (err, result) {
      if (err) {
        return console.log(err.toString());
      }
      callback(result);
    });
  }

  function getMeal(callback) {
    const newQuery = 'SELECT * FROM meals WHERE meals.deleted = "false";';
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
    const newQuery = 'SELECT * FROM meals WHERE meals.date LIKE (?) AND meals.deleted = "false";';
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
