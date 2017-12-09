const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const app = express();
const port = 8888;
const data = require('./sample_data.js');

/* ----- Body parsing middleware ----- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* ----- Set up sessions with express-session library. Give all new users cookie with default 
user settings save all user settings to sessionID, do sessionID lookup with returning users ----- */
app.use(session({
  secret: 'bluemac',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', function(req, res, next) {
  if (!req.session.settings) {
    req.session.settings = {
      0: {
        yAxisLabel: 'Elapsed Time (sec)', 
        distance: 1
      },
      1: {
        yAxisLabel: 'Elapsed Time (sec)', 
        distance: 1}
      }
  };
  next();
});

app.post('/settings', function(req, res, next) {
  for (let i in req.body) {
    req.session.settings[i] = req.body[i];
  }
  res.end();
});

app.get('/settings', function(req, res, next) {
  res.status(200).send(JSON.stringify(req.session.settings));
});

/* ----- Basic webapp server functionality ----- */
app.use(express.static(__dirname + '/../client/dist'));

app.get('/data', (req, res) => {
  res.status(200).send(JSON.stringify(data));
});


let server = app.listen(port, () => {
  console.log('listening to port ', port);
});

module.exports = server;
