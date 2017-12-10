const { convertTimeToHour } = require('./helperFunctions.js');

/* ----- This function will receive raw data, process it by bucketing times 
by hour and return an array of averaged data values ready to plot ----- */
const bucketByHour = function(data) {
  let processedData = convertTimeToHour(data);
  let objBucket = {};
  let hourBuckets = [];

  //add each data point into a bucket using date/hour as object key
  for (let i = 0; i < processedData.length; i++) {
    if (objBucket[processedData[i][0]] !== undefined) {
      objBucket[processedData[i][0]].push(processedData[i]);
    } else {
      objBucket[processedData[i][0]] = [processedData[i]];
    }
  }

  //iterate through each bucket to determine average
  for (let j in objBucket) {
    let sum = 0;
    for (let k = 0; k < objBucket[j].length; k++) {
      sum += objBucket[j][k][1];
    }
    let average = Math.floor(sum / objBucket[j].length);
    hourBuckets.push([new Date(j), average]);
  }

  return hourBuckets;
};

/* ----- carsPerBucket function receives raw data input and buckets all items by
hour and returns a count of number of items in each bucket ----- */
const carsPerBucket = function(data) {
  let processedData = convertTimeToHour(data);
  let objBucket = {};
  let hourBuckets = [];

  //add each data point into a bucket using date/hour as object key
  for (let i = 0; i < processedData.length; i++) {
    if (objBucket[processedData[i][0]] !== undefined) {
      objBucket[processedData[i][0]].push(processedData[i]);
    } else {
      objBucket[processedData[i][0]] = [processedData[i]];
    }
  }

  //iterate through each bucket to determine count
  for (let j in objBucket) {
    hourBuckets.push([new Date(j), objBucket[j].length]);
  }

  return hourBuckets;
};

module.exports = {
  bucketByHour,
  carsPerBucket
};