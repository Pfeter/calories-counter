'use strict';

const url = 'http://localhost:3000/meals';

function getNowDatetime() {
  var now = new Date();
  document.querySelector('#meal-time').valueAsNumber = now.getTime();
  document.querySelector('#filter-time').valueAsNumber = now.getTime();
}

function sumCalories(xhrResponse) {
  return JSON.parse(xhrResponse).reduce(function (pv, cv) { return pv + cv.calories; }, 0);
}

function delMealsTable() {
  document.querySelector('#meals').innerHTML = '';
  document.querySelector('#sum-of-calories').textContent = 0;
}

function delInputFields() {
  document.querySelector('#input-meal').value = '';
  document.querySelector('#input-calories').value = '';
  getNowDatetime();
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

function xhrRequest(method, inputUrl, inputValue) {
  const xhr = new XMLHttpRequest();
  if (method === 'GET') {
    xhr.onload = function () {
      delMealsTable();
      JSON.parse(xhr.response).forEach(function (e) {
        showMeal(e);
      });
      document.querySelector('#sum-of-calories').textContent = sumCalories(xhr.response);
    };
  }
  xhr.open(method, inputUrl);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(inputValue));
}

function getMeals() {
  xhrRequest('GET', url);
}

function filterMeal(filter) {
  xhrRequest('GET', url + '/' + filter);
}

function addMeal() {
  const inputValues = {
    name: document.querySelector('#input-meal').value,
    calories: document.querySelector('#input-calories').value,
    date: document.querySelector('#meal-time').value,
  };
  xhrRequest('POST', url, inputValues);
  delInputFields();
  getMeals();
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

getNowDatetime();
getMeals();
