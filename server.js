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
  let newQuery = 'INSERT INTO meals (name, calorie, date) VALUES (?, ?, ?)';
  const table = [req.body.name, req.body.calorie, req.body.date];
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

app.listen(3000);
console.log('Server running');
