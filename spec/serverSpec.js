const request = require('supertest');
const app = require('../server/index.js');

const PORT = 8888;

describe('Server', () => {
  let server;

  beforeEach(() => {
    server = app.listen(PORT);
  });

  afterEach(() => {
    server.close();
  });

  describe('Should serve the app', () => {
    it('Should serve main webpack bundle on GET requests to /', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(/src='main.bundle\.js'/)
        .expect(200)
        .end(done);
    });
  });

  describe('Should serve sample data from /data route', () => {
    it('Should serve array with length 2022 (number of data points in served set)', (done) => {
      request(server)
        .get('/data')
        .expect((res) => {
          let arrLength = JSON.parse(res.text).length;
          res.body.arrLength = arrLength;
        })
        .expect(200, {
           arrLength: 2022
        })
        .end(done);
    });
  });

  describe('Should serve user settings from /settings route', () => {
    it('Should serve settings object for 2 plots containing yAxisLabel and distance', (done) => {
      request(server)
        .get('/settings')
        .expect((res) => {
          let data = JSON.parse(res.text);
          res.body.settings = data;
        })
        .expect(200, {
          settings: {
            0: {
              yAxisLabel: 'Elapsed Time (sec)',
              distance: 1
            },
            1: {
              yAxisLabel: 'Elapsed Time (sec)',
              distance: 1
            }
          }
        })
        .end(done);
    });
  });

  describe('Should return 404 for non-existent routes', () => {
    it('Should return 404 for non-existent routes', (done) => {
      request(server)
        .get('/foo/bar')
        .expect(404)
        .end(done);
    });
  });
});