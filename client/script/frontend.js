'use strict';

const url = 'http://localhost:3000/meals';

function getNowDatetime() {
  var mealTimeField = document.getElementById('meal-time');
  var now = new Date();
  mealTimeField.valueAsNumber = now.getTime();
}

getNowDatetime();

function addMeal() {
  const xhr = new XMLHttpRequest();
  const inputMeal = document.querySelector('#input-meal').value;
  const inputCalories = document.querySelector('#input-calories').value;
  const inputMealTime = document.querySelector('#meal-time').value;
  const inputValues = { name: inputMeal, calories: inputCalories, date: inputMealTime };
  xhr.open('POST', url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(inputValues));
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
  xhr.onload = function () {
    JSON.parse(xhr.response).forEach(function (e) {
      showMeal(e);
    });
  };
  xhr.open('GET', url);
  xhr.send();
}

document.querySelector('.add-button').addEventListener('click', function () {
  addMeal();
});

getMeals();
