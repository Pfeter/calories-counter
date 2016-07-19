'use strict';

const url = 'http://localhost:3000/meals';

function getNowDatetime() {
  var mealTimeField = document.querySelector('#meal-time');
  var filterTimeField = document.querySelector('#filter-time');
  var now = new Date();
  mealTimeField.valueAsNumber = now.getTime();
  filterTimeField.valueAsNumber = now.getTime();
}

getNowDatetime();

function delMealsTable() {
  var element = document.querySelector('#meals');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  document.querySelector('#sum-of-calories').textContent = 0;
}

function showMeal(newElement) {
  const newTr = document.createElement('tr');
  const newMeal = document.createElement('td');
  const newCalories = document.createElement('td');
  const newDate = document.createElement('td');
  document.querySelector('#meals').appendChild(newTr);
  newTr.id = 'meal' + newElement.id;
  newTr.appendChild(newMeal);
  newMeal.textContent = newElement.name;
  newTr.appendChild(newCalories);
  newCalories.textContent = newElement.calories;
  newTr.appendChild(newDate);
  newDate.textContent = newElement.date;
}

function getMeals() {
  const xhr = new XMLHttpRequest();
  let sumCalories = 0;
  xhr.onload = function () {
    delMealsTable();
    JSON.parse(xhr.response).forEach(function (e) {
      showMeal(e);
      sumCalories += e.calories;
    });
    document.querySelector('#sum-of-calories').textContent = sumCalories;
  };
  xhr.open('GET', url);
  xhr.send();
}

function addMeal() {
  const xhr = new XMLHttpRequest();
  const inputMeal = document.querySelector('#input-meal').value;
  const inputCalories = document.querySelector('#input-calories').value;
  const inputMealTime = document.querySelector('#meal-time').value;
  const inputValues = { name: inputMeal, calories: inputCalories, date: inputMealTime };
  xhr.open('POST', url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(inputValues));
  document.querySelector('#input-meal').value = '';
  document.querySelector('#input-calories').value = '';
  getMeals();
}

function filterMeal(filter) {
  const xhr = new XMLHttpRequest();
  let sumCalories = 0;
  xhr.onload = function () {
    delMealsTable();
    JSON.parse(xhr.response).forEach(function (e) {
      showMeal(e);
      sumCalories += e.calories;
    });
    document.querySelector('#sum-of-calories').textContent = sumCalories;
  };
  xhr.open('GET', url + '/' + filter);
  xhr.send();
}

document.querySelector('.add-button').addEventListener('click', function () {
  addMeal();
});

document.querySelector('.filter-button').addEventListener('click', function () {
  filterMeal(document.querySelector('#filter-time').value);
});

document.querySelector('.show-all-button').addEventListener('click', function () {
  getMeals();
});

getMeals();
