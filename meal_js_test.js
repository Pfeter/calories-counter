'use strict';

var tape = require('tape');
var sinon = require('sinon');

var meal = require('./meal');

tape('addmeal calls query', function (t) {
  var mockConnection = {
    query: sinon.spy(),
  };
  var testMealModule = meal(mockConnection);
  var cb = sinon.spy();
  testMealModule.addMeal ({ name: "alma" }, cb);
  t.ok(mockConnection.query.called);
  t.ok(cb.calledWith);
  t.end();
});

tape('addmeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: 'alma',
    calories: '2',
    date: '2016-07-20T07:42:52.181'
  };

  var expectedSQL = 'INSERT INTO meals ' +
    '(name, calories, date)' +
    ' VALUES (\'alma\', \'2\', \'2016-07-20T07:42:52.181\');';

  testMealModule.addMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});

tape('getMeal calls query', function (t) {
  var mockConnection = {
    query: sinon.spy()
  };
  var testMealModule = meal(mockConnection);
  testMealModule.getMeal({name: 'alma'});
  t.ok(mockConnection.query.called);
  t.end();
});
