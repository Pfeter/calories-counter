'use strict';

const domModify = (function () {
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
    const newTrash = document.createElement('img');
    document.querySelector('#meals').appendChild(newTr);
    newTr.id = 'meal' + newElement.id;
    newTr.appendChild(newMeal);
    newMeal.textContent = newElement.name;
    newTr.appendChild(newCalories);
    newCalories.id = 'calor' + newElement.id;
    newCalories.textContent = newElement.calories;
    newTr.appendChild(newDate);
    newDate.textContent = newElement.date;
    newTr.appendChild(newTrash);
    newTrash.id = 'trash' + newElement.id;
    newTrash.src = 'image/trash.png';
    newTrash.classList.add('trash');
  }

  function processMeals(elements) {
    JSON.parse(elements).forEach(function (newElement) {
      showMeal(newElement);
    });
  }

  function removeMeal(removeElementId) {
    document.querySelector('#meals').removeChild(document.querySelector('#' + 'meal' + removeElementId));
  }

  return {
    setFilterDate: setFilterDate,
    setAddMealDatetime: setAddMealDatetime,
    changeCalories: changeCalories,
    calculateCalories: calculateCalories,
    showCalories: showCalories,
    clearMealsTable: clearMealsTable,
    clearInputFields: clearInputFields,
    showMeal: showMeal,
    processMeals: processMeals,
    removeMeal: removeMeal,
  };
})();
