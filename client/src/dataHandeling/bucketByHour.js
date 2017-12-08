/* ----- This file will receive raw data, process it by bucketing times by hour and return an array of data values ready to plot ----- */
const { convertTimeToHour } = require('./helperFunctions.js');

const bucketByHour = function(data) {

  let processedData = convertTimeToHour(data);

  let hourBuckets = [];
  let prevHour = processedData[0][0];
  let runningSum = processedData[0][1];
  let numItems = 1;

  for (let i = 1; i < processedData.length; i++) {
    if (JSON.stringify(processedData[i][0]) === JSON.stringify(prevHour)) {
      runningSum += processedData[i][1];
      numItems++;
    } else {
      while (JSON.stringify(processedData[i][0]) !== JSON.stringify(prevHour)) {
        if (numItems === 0) {
          hourBuckets.push([prevHour, 0]);
        } else {
          let average = Math.floor(runningSum / numItems);
          hourBuckets.push([prevHour, average]);
          runningSum = 0;
          numItems = 0;
        }
        prevHour = prevHour.setHours(prevHour.getHours() + 1);
        prevHour = new Date(prevHour);
      }
      runningSum += processedData[i][1];
      numItems++;
    }
  }

  // hourBuckets = hourBuckets.map((item) => {
  //   return [item[0].getHours(), item[1]];
  // })

  return hourBuckets;
}

module.exports = bucketByHour;