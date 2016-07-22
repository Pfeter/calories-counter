'use strict';

window.onload = function () {
  const url = 'http://localhost:3000/meals';
  var now = new Date();

  function setFilterDate() {
    document.querySelector('#filter-time').valueAsNumber = now.getTime();
  }

  function setAddMealDatetime() {
    document.querySelector('#meal-time').valueAsNumber = now.getTime();
  }

  function changeCalories(difference) {
    const currentCalories = parseInt(document.querySelector('#sum-of-calories').textContent, 10);
    const diffCalories = parseInt(difference, 10);
    return currentCalories + diffCalories;
  }

  function calculateCalories(elements) {
    return JSON.parse(elements).reduce(function (pv, cv) { return pv + cv.calories; }, 0);
  }

  function showCalories(newSumCalories) {
    document.querySelector('#sum-of-calories').textContent = newSumCalories;
  }

  function clearMealsTable() {
    document.querySelector('#meals').innerHTML = '';
    document.querySelector('#sum-of-calories').textContent = 0;
  }

  function clearInputFields() {
    document.querySelector('#input-meal').value = '';
    document.querySelector('#input-calories').value = '';
    setAddMealDatetime();
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

  function processMeals(elements) {
    JSON.parse(elements).forEach(function (newElement) {
      showMeal(newElement);
    });
  }

  function xhrRequest(method, inputUrl, callback, inputValue) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.open(method, inputUrl);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(inputValue));    // xhr.send(data) valószínű a paraméterek elküldhetőek objektumként
  }   // req.query object formában megy az adat szerver oldalra key:value key2:value2

  function getMeals(callback) {
    xhrRequest('GET', url, callback);
  }

  function filterMeal(filter, callback) {
    xhrRequest('GET', url + '/' + filter, callback);
  }

  function addMeal(inputValues, callback) {
    xhrRequest('POST', url, callback, inputValues);
  }

  document.querySelector('.add-button').addEventListener('click', function () {
    const inputValues = {
      name: document.querySelector('#input-meal').value,
      calories: document.querySelector('#input-calories').value,
      date: document.querySelector('#meal-time').value,
    };
    var callback = function () {
      clearInputFields();
      showMeal(inputValues);
      showCalories(changeCalories(inputValues.calories));
    };
    addMeal(inputValues, callback);
  });

  document.querySelector('.filter-button').addEventListener('click', function () {
    var callback = function (xhrResponse) {
      clearMealsTable();
      processMeals(xhrResponse);
      showCalories(calculateCalories(xhrResponse));
    };
    filterMeal(document.querySelector('#filter-time').value, callback);
  });

  document.querySelector('.show-all-button').addEventListener('click', function () {
    var callback = function (xhrResponse) {
      clearMealsTable();
      processMeals(xhrResponse);
      showCalories(calculateCalories(xhrResponse));
    };
    getMeals(callback);
  });

  function pageOnLoad() {
    var callback = function (xhrResponse) {
      processMeals(xhrResponse);
      showCalories(calculateCalories(xhrResponse));
    };
    setAddMealDatetime(callback);
    setFilterDate(callback);
    getMeals(callback);
  }

  pageOnLoad();

  return {
    calculateCalories: calculateCalories,
  };
};
