/* ----- Helper functions used to process data ----- */

/* ----- Take raw data time (seconds since 2010-01-01) and convert to JS Date format floored to hour ----- */
const convertTimeToHour = function(rawData) {
  let convertedData = rawData.map((item) => {
    let newTime = new Date(2010, 0, 1, 0, 0, item[0], 0);
    newTime.setMinutes(0, 0, 0);
    return [newTime, item[1]];
  })
  
  return convertedData;
}

/* ----- Basic time convert from BlueMAC time data to standard JavaScript format ----- */
const convertTime = function(rawData) {
  let convertedData = rawData.map((item) => {
    let newTime = new Date(2010, 0, 1, 0, 0, item[0], 0);
    return [newTime, item[1]];
  })
  
  return convertedData;
}

/* ----- Takes elapsed time (sec) and distance (miles) and converts to speed ----- */
const convertSpeed = function(rawData, distance) {
  let convertedData = rawData.map((item) => {
    let speed = Math.floor(distance / item[1] * 3600);
    return [item[0], speed];
  })
  
  return convertedData;
}

module.exports = {
  convertTimeToHour,
  convertTime,
  convertSpeed
}