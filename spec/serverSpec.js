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

  describe('Should serve the correct client app', () => {
    it('Should serve presenter client on GET requests to /', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(/src="dist\/index_presenter\.js"/)
        .expect(200)
        .end(done);
    });

    it('Should serve player client on GET requests to /join', (done) => {
      request(server)
        .get('/join')
        .expect('Content-Type', /text\/html/)
        .expect(/src="dist\/index_player\.js"/)
        .expect(200)
        .end(done);
    });
  });

  describe('Should serve static files', () => {
    // not yet compiled in testing environment
    xit('Should serve presenter js file', (done) => {
      request(server)
        .get('/dist/index_presenter.js')
        .expect(200)
        .end(done);
    });

    // not yet compiled in testing environment
    xit('Should serve player js file', (done) => {
      request(server)
        .get('/dist/index_player.js')
        .expect(200)
        .end(done);
    });

    it('Should serve css file', (done) => {
      request(server)
        .get('/styles/style_player.css')
        .expect('Content-Type', /text\/css/)
        .expect(200)
        .end(done);
    });

    it('Should serve css file', (done) => {
      request(server)
        .get('/styles/style_presenter.css')
        .expect('Content-Type', /text\/css/)
        .expect(200)
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