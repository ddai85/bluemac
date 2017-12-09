const $ = require('jquery');

/* ----- HOSTNAME can be pointed at whichever API is serving the data ----- */
const HOSTNAME = 'http://127.0.0.1:8888';

function getData(callback) {
  /* ----- GET request can be modified with parameters to select more specific data from API ----- */
  $.get({
    url: HOSTNAME + '/data',
    success: (data) => {
      callback(JSON.parse(data));
    }
  })
}

function getSettings(callback) {
  $.get({
    url: HOSTNAME + '/settings',
    success: (data) => {
      callback(JSON.parse(data));
    }
  })
}

function saveSettings(settings) {
  $.post({
    url: HOSTNAME + '/settings',
    data: settings,
    dataType: 'json',
    success: (data) => {
      console.log('settings were saved');
    }
  })
}

module.exports = {
  getData,
  getSettings,
  saveSettings
}