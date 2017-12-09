const expect = require('chai').expect;
const { convertTimeToHour, convertTime, convertSpeed } = require('../client/src/dataHandeling/helperFunctions.js');
const { bucketByHour, carsPerBucket } = require('../client/src/dataHandeling/bucketByHour.js');

/* ----- BlueMAC dates are calculated from number of seconds since 2010-01-01 00:00:00 ----- */
describe('Should convert BlueMAC raw time format to JavaScript Date format', () => {
  let BlueMACDate = [[248606620, 0]];
  
  it ('Should return correct JavaScript Date when BlueMAC date passed into convertTime function ', () => {
    let BlueMACConvert = convertTime(BlueMACDate)[0][0];
    let testDate = new Date(2010, 0, 1, 0, 0, 248606620, 0);
    let failDate = new Date(2011, 0, 1, 0, 0, 248606620, 0);

    expect(BlueMACConvert).to.eql(testDate);
    expect(BlueMACConvert).not.to.eql(failDate);
  });

  it ('Should return JavaScript Date rounded down to nearest hour when BlueMAC date passed into convertTimeToHour function ', () => {
    let BlueMACConvertHour = convertTimeToHour(BlueMACDate)[0][0];
    let testDate = new Date(2010, 0, 1, 0, 0, 248606620, 0);
    testDate = testDate.setMinutes(0, 0, 0);
    testDate = new Date(testDate);
    let failDate = new Date(2010, 0, 1, 0, 0, 248606620, 0);

    expect(BlueMACConvertHour).to.eql(testDate);
    expect(BlueMACConvertHour).not.to.eql(failDate);
  });
});

describe('Should convert elapsed time data to speed when passed into convertSpeed with distance variable', () => {
  it ('Should return speed (mph) after being passed time (sec) and distance (mi)', () => {
    let elapsedTime = 300;
    let distance = 3;
    //3 miles / 300 sec * 60 sec/min * 60 min/hr = 36 mph
    let speed = 3 / 300 * 60 * 60;

    let speedConvert = convertSpeed([[0, elapsedTime]], distance)[0][1];
    
    expect(speedConvert).to.equal(speed);
  });
});

describe('Should bucket data points occurring in the same hour into the same buckets', () => {
  let dataSet = [[248586701,59],[248589425,85],[248589580,88],[248590685,56],[248590981,94],[248591016,81],[248592065,86]];
  //3 buckets with average of 59, 76
  it ('Should return new array of buckets with elapsed time (second value) averaged', () => {
    let bucketResults = bucketByHour(dataSet);
    let firstBucketTime = convertTimeToHour(dataSet)[0][0];
    let average1 = 59;
    let average2 = Math.floor((85 + 88 + 56) / 3);
    let average3 = Math.floor((94 + 81 + 86) / 3);

    expect(bucketResults).to.have.lengthOf(3);
    expect(bucketResults[0][0]).to.eql(firstBucketTime);
    expect(bucketResults[0][1]).to.equal(average1);
    expect(bucketResults[1][1]).to.equal(average2);
    expect(bucketResults[2][1]).to.equal(average3);
  });

  it ('Should return array with a count of items in each bucket', () => {
    let countBucket = carsPerBucket(dataSet);
    let count1 = 1;
    let count2 = 3;
    let count3 = 3;

    expect(countBucket).to.have.lengthOf(3);
    expect(countBucket[0][1]).to.equal(count1);
    expect(countBucket[1][1]).to.equal(count2);
    expect(countBucket[2][1]).to.equal(count3);

  });
});