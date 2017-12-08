const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8888;
const data = require('./sample_data.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/../client/dist'));

app.get('/data', (req, res) => {
  res.status(200).send(JSON.stringify(data));
})


app.listen(port, () => {
  console.log('listening to port ', port);
});

module.exports.app = app;
