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

module.exports = {
  convertTimeToHour
}

const convertTime = function(rawData) {
  let convertedData = rawData.map((item) => {
    let newTime = new Date(2010, 0, 1, 0, 0, item[0], 0);
    return [newTime, item[1]];
  })
  
  return convertedData;
}

module.exports = {
  convertTimeToHour,
  convertTime
}