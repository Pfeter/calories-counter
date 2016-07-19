'use strict';

const mysql = require('mysql');

var meal = function (connection) {
  function getMeal(callback) {
    connection.query('SELECT * FROM meals;', function (err, result) {
      if (err) {
        return console.log(err.toString());
      }
      callback(result);   // res.json({ "meals": data });
    });
  }

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

  function delMeal(deleteMeal, callback) {
    let result = {};
    connection.query('UPDATE meals SET deleted = "true" WHERE id = ?', deleteMeal.id, function (err) {
      if (err) {
        result = { status: 'not exists' };
      } else {
        result = { status: 'ok' };
      }
      callback(result);
    });
  }

  return {
    addMeal: addMeal,
    getMeal: getMeal,
    delMeal: delMeal,
  };
};

module.exports = meal;
