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
  const inputCalorie = document.querySelector('#input-calorie').value;
  const inputMealTime = document.querySelector('#meal-time').value;
  const inputValues = { name: inputMeal, calorie: inputCalorie, date: inputMealTime };
  xhr.open('POST', url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(inputValues));
}

document.querySelector('.add-button').addEventListener('click', function () {
  addMeal();
});
