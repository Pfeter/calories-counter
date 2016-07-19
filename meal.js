'use strict';

const mysql = require('mysql');

var meal = function (connection) {
  function addMeal(newMeal, callback) {
    let newQuery = 'INSERT INTO meals (name, calories, date) VALUES (?, ?, ?)';
    const table = [newMeal.name, newMeal.calories, newMeal.date];
    newQuery = mysql.format(newQuery, table);
    connection.query(newQuery, function (err, result) {
      if (err) {
        return console.log(err.toString());
      }
      callback(result);
    });
  }

  function getMeal(callback) {
    connection.query('SELECT * FROM meals;', function (err, result) {
      if (err) {
        return console.log(err.toString());
      }
      callback(result);   // res.json({ "meals": data });
    });
  }

  return {
    addMeal: addMeal,
    getMeal: getMeal,
  };
};

module.exports = meal;
