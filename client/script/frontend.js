'use strict';

window.onload = function () {

  document.querySelector('.add-button').addEventListener('click', function () {
    const inputValues = {
      name: document.querySelector('#input-meal').value,
      calories: document.querySelector('#input-calories').value,
      date: document.querySelector('#meal-time').value,
    };
    var callback = function () {
      domModify.clearInputFields();
      domModify.showMeal(inputValues);
      domModify.showCalories(domModify.changeCalories(inputValues.calories));
    };
    httpRequest.addMeal(inputValues, callback);
  });

  document.querySelector('.filter-button').addEventListener('click', function () {
    var callback = function (xhrResponse) {
      domModify.clearMealsTable();
      domModify.processMeals(xhrResponse);
      domModify.showCalories(domModify.calculateCalories(xhrResponse));
    };
    httpRequest.filterMeal(document.querySelector('#filter-time').value, callback);
  });

  document.querySelector('.show-all-button').addEventListener('click', function () {
    var callback = function (xhrResponse) {
      domModify.clearMealsTable();
      domModify.processMeals(xhrResponse);
      domModify.showCalories(domModify.calculateCalories(xhrResponse));
    };
    httpRequest.getMeals(callback);
  });

  document.querySelector('#meals').addEventListener('click', function () {
    if (event.target.id.slice(0, 5) === 'trash') {
      var callback = function (trashId, calDiff) {
        domModify.removeMeal(trashId.slice(5));
        domModify.showCalories(domModify.changeCalories(calDiff)); // minusz kalória kell
      };
      const trashId = event.target.id;
      const calDiff = '-' + document.querySelector('#' + 'calor' + trashId.slice(5)).textContent;
      httpRequest.deleteMeal(trashId.slice(5), function () {
        callback(trashId, calDiff);
      });
    }
  });

  function pageOnLoad() {
    var callback = function (xhrResponse) {
      domModify.processMeals(xhrResponse);
      domModify.showCalories(domModify.calculateCalories(xhrResponse));
    };
    domModify.setAddMealDatetime(callback);
    domModify.setFilterDate(callback);
    httpRequest.getMeals(callback);
  }

  pageOnLoad();
};
