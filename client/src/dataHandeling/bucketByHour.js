const { convertTimeToHour } = require('./helperFunctions.js');

/* ----- This function will receive raw data, process it by bucketing times 
by hour and return an array of averaged data values ready to plot ----- */
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
          hourBuckets.push([new Date(prevHour), average]);
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
  if (numItems !== 0) {
    let average = Math.floor(runningSum / numItems);
    hourBuckets.push([new Date(prevHour), average]);
  }
  return hourBuckets;
};

/* ----- carsPerBucket function receives raw data input and buckets all items by
hour and returns a count of number of items in each bucket ----- */
const carsPerBucket = function(data) {
  let processedData = convertTimeToHour(data);

  let hourBuckets = [];
  let prevHour = processedData[0][0];
  let numItems = 1;

  for (let i = 1; i < processedData.length; i++) {
    if (JSON.stringify(processedData[i][0]) === JSON.stringify(prevHour)) {
      numItems++;
    } else {
      while (JSON.stringify(processedData[i][0]) !== JSON.stringify(prevHour)) {
        if (numItems === 0) {
          hourBuckets.push([prevHour, 0]);
        } else {
          hourBuckets.push([prevHour, numItems]);
          numItems = 0;
        }
        prevHour = prevHour.setHours(prevHour.getHours() + 1);
        prevHour = new Date(prevHour);
      }
      numItems++;
    }
  }
  if (numItems !== 0) {
    hourBuckets.push([prevHour, numItems]);
  }
  return hourBuckets;
};

module.exports = {
  bucketByHour,
  carsPerBucket
};