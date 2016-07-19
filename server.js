'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const con = require('./CONFIG');
const connection = con.con;

const meal = require('./meal');
const myMeal = meal(connection);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

connection.connect(function (err) {
  if (err) {
    return console.log('Error connecting to Db');
  }
  console.log('Connection established');
});

app.get('/meals', function (req, res) {
  var callback = function (result) {
    res.json(result);
  };
  myMeal.getMeal(callback);
});

app.get('/meals/:filter', function (req, res) {
  var filterDate = req.params.filter;
  var callback = function (result) {
    res.json(result);
  };
  myMeal.filterMeal(filterDate, callback);
});

app.post('/meals', function (req, res) {
  var newMeal = {
    name: req.body.name,
    calories: req.body.calories,
    date: req.body.date,
  };
  var callback = function () {
    res.json({ 'status': 'ok' });
  };
  myMeal.addMeal(newMeal, callback);
});

app.delete('/meals/:id', function (req, res) {
  var deleteMeal = { id: req.params.id };
  var callback = function (result) {
    res.json(result);
  };
  myMeal.delMeal(deleteMeal, callback);
});

app.listen(3000);
console.log('Server running');
