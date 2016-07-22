'use strict';

const httpRequest = (function () {
  const url = 'http://localhost:3000/meals';

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

  function deleteMeal(id, callback) {
    xhrRequest('DELETE', url + '/' + id, callback);
  }

  return {
    getMeals: getMeals,
    filterMeal: filterMeal,
    addMeal: addMeal,
    deleteMeal: deleteMeal,
  };
})();
