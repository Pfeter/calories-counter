'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

// const mysql = require('mysql');
const con = require('./CONFIG');
const connection = con.con;

connection.connect(function (err) {
  if (err) {
    return console.log('Error connecting to Db');
  }
  console.log('Connection established');
});

app.listen(3000);
console.log('Server running');
