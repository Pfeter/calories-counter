'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

const mysql = require('mysql');
const con = require('./CONFIG');
const connection = con.con;

connection.connect(function (err) {
  if (err) {
    return console.log('Error connecting to Db');
  }
  console.log('Connection established');
});

app.post('/meals', function (req, res) {
  let newQuery = 'INSERT INTO meals (name, calories, date) VALUES (?, ?, ?)';
  const table = [req.body.name, req.body.calories, req.body.date];
  newQuery = mysql.format(newQuery, table);
  connection.query(newQuery, function (err) {
    if (err) {
      return console.log(err.toString());
    }
    res.json({
      status: 'ok',
    });
  });
});

app.get('/meals', function (req, res) {
  connection.query('SELECT * FROM meals;', function (err, data) {
    if (err) {
      return console.log(err.toString());
    }
    res.json(data);   // res.json({ "meals": data });
  });
});

app.listen(3000);
console.log('Server running');
