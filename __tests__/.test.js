const request = require('supertest');
const app = require('../app'); // Your Express app

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to the home page');
  });
});
