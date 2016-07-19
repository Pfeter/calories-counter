'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const mysql = require('mysql');
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

app.post('/meals', function (req, res) {
  var newMeal = {
    name: req.body.name,
    calories: req.body.calories,
    date: req.body.date,
  };
  var callback = function (result) {
    res.json({ 'status': 'ok' });
  };
  myMeal.addMeal(newMeal, callback);
});

app.get('/meals', function (req, res) {
  var callback = function (result) {
    res.json(result);
  };
  myMeal.getMeal(callback);
});

app.listen(3000);
console.log('Server running');
